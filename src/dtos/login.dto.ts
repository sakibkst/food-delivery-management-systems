import { IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

export class LoginDTO {
    @IsNotEmpty()
    @IsString()
    @Matches(/^[a-zA-Z0-9.]+@[a-zA-Z]+\.[a-zA-Z]+(\.[a-zA-Z]+)*$/, {
        message: 'email must be a valid email address.',
    })
    u_email: string;

    @IsNotEmpty()
    @IsString()
    // @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    //     message: 'Password must be at least 8 characters long, contain at least one special character, one uppercase letter, one lowercase letter, and one number',
    // })
    u_password: string;
}