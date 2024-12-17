// dto/update-user.dto.ts
import { IsString, IsEmail, IsEnum, IsOptional } from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    u_name?: string;

    @IsOptional()
    @IsEmail()
    u_email?: string;

    @IsOptional()
    @IsString()
    u_password?: string;

    @IsOptional()
    @IsEnum(['Admin', 'Customer', 'Restaurant', 'DeliveryPerson'])
    u_role?: string;

    @IsOptional()
    @IsString()
    resetCode?: string;

    @IsOptional()
    resetTokenExpires?: Date;

    @IsOptional()
    @IsString()
    status?: string;
}
