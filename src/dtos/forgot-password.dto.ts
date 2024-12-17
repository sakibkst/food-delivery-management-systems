import { IsEmail } from 'class-validator';

export class ForgotPasswordDto {
    @IsEmail()
    email: string;  // Use 'email' instead of 'u_email'
}
