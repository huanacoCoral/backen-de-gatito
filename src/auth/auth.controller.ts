import { BadRequestException, Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';
//import { PrismaService } from 'src/prisma/prisma.service';
//import { AuthGuard } from './guards/auth.guard';

interface UserDTOEnviando {  // esto acepta que llegen datos desde post o algo asi 
    id_voluntario: number;
    email: string;
    password: string;
    id_modificacion: number
}
//@UseGuards(AuthGuard)//funciona
@Controller('auth')

export class AuthController {
    constructor(private readonly authService: AuthService) {}
    //@UseGuards(AuthGuard, RolesGuard)
   // @Roles('PERSONAL', 'LOGISTICA','OPERACIONES', 'JEFE_GUARDIA','COMANDANTE')
    @Get("entramos")
    entramos(){
        console.log("estamos probando-----");
        
         return { 
        message: "Acceso concedido",
        data: "this.authService.verificar() "
    };
    }
    @Get('listar')
    getUsers() {
            return this.authService.listarVoluntarios();
    }
    /// vborrar lo de arriba 
    
    @Post('sign-up') //para crear 
    signUp(@Body() user: UserDTOEnviando) {
        
        console.log('user+++', { user });
        
        //return this.authService.signUp(user.email, user.password);
        //
        return this.authService.signUp(
            user.id_voluntario,
            user.email,
            user.password,
            user.id_modificacion
        );
    }
    
    //@UseGuards(AuthGuard)
    //@UseGuards(AuthGuard, RolesGuard)
    //@Roles('ADMIN')
    @Post('log-in')
    logIn(@Body() user: UserDTOEnviando) {
        //console.log('user login +++', { user });
        return this.authService.logIn(user.email, user.password);
    }
   //@UseGuards(AuthGuard)//se supone que esto bloquea pero no funciona --funcion pero verificar 
    @Get('sign-up')
    pruebaBloqueo(){
        return 'Me encuentras con --->http://localhost:3000/auth/sign-up ';
    }
    
    //mostrara informacion del usuario que ingreso 

   /* @Get('me')
    @UseGuards(AuthGuard)
    me(@Req() req) {
    return { id: req.user.sub, email: req.user.email, role: req.user.role };
    }*/

    @Post('actualizar-usuario')
    actualizarUsuario(@Body() user: UserDTOEnviando) {
        console.log('user login +++', { user });
        return this.authService.actualizarUsuario(user);
    }
    @Post('quitar-usuario')
    quitarUsuario(@Body() user: any) {
        console.log('user login +++', { user });
        return this.authService.quitarUsuario(user);
    }
    

}
