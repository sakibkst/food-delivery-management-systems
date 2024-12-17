// auth.controller.ts
import { Controller, Post, Body, UseGuards, Request, Res, Get, Param, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from 'src/dtos/login.dto';
import { SignupDto } from 'src/dtos/signup.dto';
import { ForgotPasswordDto } from 'src/dtos/forgot-password.dto';
import { ResetPasswordDto } from 'src/dtos/reset-password.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    // Login route
    @Post('login')
    async login(@Body() loginDTO: LoginDTO, @Res() res: any): Promise<any> {
        const { access_token, roles } = await this.authService.login(loginDTO);

        // Set the JWT token as a cookie
        res.cookie('jwt', access_token, {
            httpOnly: true,
            expires: new Date(Date.now() + 3600000), // 1 hour
            path: '/',
            sameSite: 'strict',
            secure: false,  // Set to true for HTTPS
        });

        return res.send({ roles, message: 'Login successful' });
    }

    // Signup route
    @Post('signup')
    async signUp(@Body() signUpDTO: SignupDto): Promise<any> {
        return this.authService.signUp(signUpDTO);
    }

    // Logout route
    @Get('logout')
    async logout(@Res() res: any): Promise<any> {
        res.clearCookie('jwt', {
            httpOnly: true,
            path: '/',
        });

        return res.send({ message: 'Logged out successfully' });
    }

    // Request password reset
    @Post('forgot-password')
    async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto): Promise<any> {
        // Pass only the email (not the entire DTO)
        return this.authService.forgotPassword(forgotPasswordDto.email); // Use only the email property
    }

    // Reset password
    @Put('reset-password/:resetCode')
    async resetPassword(
        @Param('resetCode') resetCode: string,
        @Body() resetPasswordDto: ResetPasswordDto
    ): Promise<any> {
        // Pass resetCode and new password (not the entire DTO)
        return this.authService.resetPassword(resetCode, resetPasswordDto.newPassword); // Use newPassword from the DTO
    }
}