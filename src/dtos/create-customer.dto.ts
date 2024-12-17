import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateCustomerDto {
    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    u_email: string;

    @IsString()
    @IsNotEmpty()
    u_name: string;

    @IsString()
    @IsNotEmpty()
    u_password: string;
}
