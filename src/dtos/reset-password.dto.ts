// reset-password.dto.ts
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class ResetPasswordDto {

    // @IsEmail()
    // @IsNotEmpty()
    // email: sztring;

    @IsNotEmpty()
    @MinLength(6)
    newPassword: string;

    // @IsNotEmpty()
    // resetCode: string;

}
