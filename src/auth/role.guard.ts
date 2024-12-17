import { Injectable } from '@nestjs/common';
import { CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator'; // Role-specific metadata

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly jwtService: JwtService, // Inject JwtService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        // Get the required roles from route metadata
        const requiredRoles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());
        if (!requiredRoles) {
            return true; // If no roles are defined, allow access
        }

        // Validate the JWT token
        const request = context.switchToHttp().getRequest();
        const token = request.headers['authorization']?.split(' ')[1]; // Get JWT token from Authorization header

        if (!token) {
            throw new ForbiddenException('Token not provided');
        }

        try {
            const payload = await this.jwtService.verifyAsync(token); // Verify the token with JwtService
            request['user'] = payload; // Attach user info to request

            // Check if the user has any of the required roles
            const user = request['user'];
            const hasRole = requiredRoles.some(role => user.roles?.includes(role));
            if (!hasRole) {
                throw new ForbiddenException('You do not have permission to access this resource');
            }

            return true;
        } catch (error) {
            throw new ForbiddenException('Invalid or expired token');
        }
    }
}
