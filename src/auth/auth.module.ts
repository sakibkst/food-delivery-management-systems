import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/Entity/users.entity';
import { AuthService } from './auth.service';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { AuthController } from './auth.controller';
import { JwtAuthGuard } from './auth.guard';
import { MailModule } from '../mail/mail.module';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Users]),
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'ec92f9b831c8d83c1f63576e47836ac4259e2fd1e5b2f3f5c9e04d8b5d5f515', // Use an environment variable in production
            signOptions: { expiresIn: '1h' }, // Token expires in 1 hour
        }),
        MailModule,
        UsersModule
    ],
    providers: [AuthService, JwtStrategy, JwtAuthGuard],
    exports: [AuthService],
    controllers: [AuthController],
})
export class AuthModule { }
