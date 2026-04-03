import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
//import { JwtService } from "@nestjs/jwt";
import {Request} from'express'
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('🔥 AuthGuard ejecutado');

    const request = context.switchToHttp().getRequest()
    console.log('--- HEADERS RECIBIDOS ---');
    console.log(request.headers);
    console.log('-------------------------');

    // 1️⃣ Extraer token
    const token = this.extractToken(request);
    const soloToken =JSON.parse(token??"").access_token;
    console.log('111111111111',soloToken);
    
    console.log("el token esÑ -----",JSON.parse(token??""));
    
    if (!soloToken) {
      console.log('❌ No hay token');
      throw new UnauthorizedException('Token no proporcionado');
    }

    try {
      // 2️⃣ Verificar token
      const payload = await this.jwtService.verifyAsync(soloToken, {
        secret: process.env.SECRET,
      });

      console.log('✅ PAYLOAD JWT:', payload);

      // 3️⃣ Guardar usuario en request
      request.user = payload;
      console.log("tenemoss el recuest user:  ", request.user);
      
      return true;
    } catch (error) {
      console.log('❌ Token inválido o expirado', error);
      throw new UnauthorizedException('Token inválido');
    }
  }

  private extractToken(request: Request): string | undefined {
    const authHeader = request.headers.authorization;
    if (!authHeader) return undefined;

    const [type, token] = authHeader.split(' ');
    return type === 'Bearer' ? token: undefined;
  }
}