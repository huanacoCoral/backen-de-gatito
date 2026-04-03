import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { encrypt } from 'src/lib/bcrypt';
import { compare } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
//logica necesaria para conectrnos
@Injectable()
export class AuthService {
    constructor(
        private prismaService: PrismaService, 
        private jwtService: JwtService
    ) { }
    async verficar(){
        console.log("entramos aqqui");
        
        return await "logramos entrar "
    }
    async getListar() {
        console.log("intentandolistar");
        
        return await this.prismaService.usuario.findMany();//muestra
    }
    
    async listarVoluntarios(){
        
        return await this.prismaService.voluntario.findMany();//muestra;
    }
    /// recien de aquiabajo
    // flujo  ya creamos un voluntario(en personal),toca crear un usuario, y darle rol 
    async signUp(id_voluntario: number,email: string, password: string) {
        try {
            // Verificar que el voluntario exista
            const voluntario = await this.prismaService.voluntario.findUnique({
            where: { id_voluntario },
            });
            if (!voluntario) {
            throw new BadRequestException('El voluntario no existe');
            }
            //roles por defecto ya creados al inicio sera voluntario
             const rolVoluntario = await this.prismaService.rol.findFirst({
                where: { nombre: 'VOLUNTARIO' },
            });
            const userFound = await this.prismaService.usuario.findUnique({ //Ya hay alguien en la lista con este email?”
                where: {
                    email,
                }
            });//sql
            if (userFound) throw new BadGatewayException('El usuario ya existe o revisar Auth Service '); //true
            const hashedPassword = await encrypt(password);//encripta

            const usuario = await this.prismaService.usuario.create({ //creamos al usuario
            data: {
                id_voluntario,
                email,
                password: hashedPassword
            },
            });
            
            // Registrar rol inicial
            await this.prismaService.rolTrayecto.create({ //creamos tryectoria del rol
            data: {
                fecha: new Date(),
                id_rol: rolVoluntario!.id_rol,
                d_voluntario: id_voluntario,
            },
            });
            
            const { password: _, ...userWithoutPassword } = usuario; //averiguar que hace:mantiene la informacion de la creacion sin el password ++++lo extrae y lo descarta
            const payload = { ...userWithoutPassword }
            const access_token = await this.jwtService.signAsync(payload);
           
           return { access_token };
           
        } catch (error) {
            console.error("error al crear")
            if (error instanceof BadGatewayException) { throw error; }
            throw new Error(error)
        }

    }
    async logIn(email: string, password: string) {
        console.log("entramos a login");
        try {
            // buscar si esque existe
            const usuario = await this.prismaService.usuario.findUnique({
                where: {
                    email,
                },
            });
            if (!usuario) {
                throw new BadRequestException('Email invalido.');
            }

            const isPasswordMatch = await compare(password, usuario.password);//Compara una contraseña en texto plano con una contraseña encriptada (hash)
            if (!isPasswordMatch) {
                throw new BadGatewayException("malllll pass")
            }
            
            const rolActual = await this.prismaService.rolTrayecto.findFirst({
            where: { d_voluntario: usuario.id_voluntario },
            orderBy: { fecha: 'desc' },
            include: { rol: true },// Realiza un join automático con la tabla o modelo rol
            });

            if (!rolActual) {
                throw new BadRequestException('creo q no tiene rol');
            }
            const payload = {
            id_voluntario: usuario.id_voluntario,
            email: usuario.email,
            rol: rolActual.rol.nombre,
            };

            return {
            rol: rolActual.rol.nombre,
            access_token: this.jwtService.sign(payload),
            };

        } catch (error) {
            console.error("que hiciste!!!!! control Z",error)
        }
    }
   
}
