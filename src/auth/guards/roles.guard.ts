import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1️⃣ Roles permitidos en el endpoint
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    // 2️⃣ Si el endpoint no define roles → acceso libre
    if (!requiredRoles) return true;

    // 3️⃣ Usuario autenticado (viene del JwtAuthGuard)
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user?.rol) {
      throw new ForbiddenException('No tienes rol asignado');
    }

    // 4️⃣ Validar rol
    if (!requiredRoles.includes(user.rol)) {//!si no existe, includes existe dentro de este 
      throw new ForbiddenException(
        `Acceso denegado. Rol requerido: ${requiredRoles.join(', ')}`,
      );
    }
//no lo probe 
    return true;
  }
}
