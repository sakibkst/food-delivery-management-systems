import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateDeliveryPersonDto {
    @IsNotEmpty()
    u_name: string;

    @IsEmail()
    u_email: string;

    @IsNotEmpty()
    u_password: string;

    @IsNotEmpty()
    vehicleDetails: string;

    @IsNotEmpty()
    currentStatus: string;
}
