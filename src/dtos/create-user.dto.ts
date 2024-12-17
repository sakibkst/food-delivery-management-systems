// dto/create-user.dto.ts
import { IsString, IsEmail, IsEnum, IsOptional } from 'class-validator';

export class CreateUserDto {
    @IsString()
    u_name: string;

    @IsEmail()
    u_email: string;

    @IsString()
    u_password: string;

    @IsEnum(['Admin', 'Customer', 'Restaurant', 'DeliveryPerson'])
    u_role: string;

    @IsOptional()
    @IsString()
    resetCode?: string;

    @IsOptional()
    resetTokenExpires?: Date;

    @IsOptional()
    @IsString()
    status?: string;
}
