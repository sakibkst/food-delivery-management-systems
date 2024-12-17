import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { Users } from 'src/Entity/users.entity';
import { LoginDTO } from 'src/dtos/login.dto';
import { SignupDto } from 'src/dtos/signup.dto';
import * as crypto from 'crypto';
import { MailService } from 'src/mail/mail.service'; // Assuming you have a mail service for sending emails

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Users) private userRepo: Repository<Users>,
        private jwtService: JwtService,
        private mailService: MailService,  // Inject mail service
    ) { }

    // Login Method
    async login(Users: LoginDTO): Promise<{ access_token: string; roles: string }> {
        // Find user by email
        const user = await this.userRepo.findOneBy({ u_email: Users.u_email });

        // Validate user and password
        if (!user || !(await bcrypt.compare(Users.u_password, user.u_password))) {
            throw new BadRequestException('Invalid username or password');
        }

        // Create the JWT payload
        const payload = {
            sub: user.u_id, // This is typically the user ID
            username: user.u_email,
            roles: user.u_role, // Include roles in the payload
        };

        // Generate the JWT token asynchronously
        const accessToken = await this.jwtService.signAsync(payload, {
            secret: 'ec92f9b831c8d83c1f63576e47836ac4259e2fd1e5b2f3f5c9e04d8b5d5f515', // Same secret as in JwtModule config
            expiresIn: '1h', // Optional: Token expiration time
        });

        // Return the access token and roles
        return {
            access_token: accessToken,
            roles: user.u_role, // Return the user's role
        };
    }

    // Sign up Method
    async signUp(userData: SignupDto): Promise<Users> {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(userData.u_password, salt);

        const newUser = new Users();
        newUser.u_name = userData.u_name;
        newUser.u_email = userData.u_email;
        newUser.u_role = userData.u_role || 'Customer'; // Default to 'Customer'
        newUser.u_password = hashedPassword;

        return await this.userRepo.save(newUser);
    }

    // Forgot Password Method
    async forgotPassword(email: string): Promise<string> {
        // Check if user exists
        const user = await this.userRepo.findOneBy({ u_email: email });
        if (!user) {
            throw new NotFoundException('User not found');
        }

        // Generate a reset password token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiry = new Date();
        resetTokenExpiry.setHours(resetTokenExpiry.getHours() + 1); // Token expires in 1 hour

        // Save token and expiry to the user
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = resetTokenExpiry;
        await this.userRepo.save(user);

        // Send reset password email with token (you need to implement this in the MailService)
        const resetUrl = `http://localhost:3000/auth/reset-password/${resetToken}`;
        await this.mailService.sendPasswordResetMail(email, resetUrl);

        return 'Password reset link sent to your email';
    }

    // Reset Password Method
    async resetPassword(token: string, newPassword: string): Promise<string> {
        // Find user by reset token
        const user = await this.userRepo.findOneBy({ resetPasswordToken: token });

        // Check if user exists and token is valid
        if (!user || user.resetPasswordExpires < new Date()) {
            throw new BadRequestException('Invalid or expired token');
        }

        // Hash the new password before saving it
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Reset the password
        user.u_password = hashedPassword;
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;

        // Save the updated user
        await this.userRepo.save(user);

        return 'Password successfully reset';
    }
}