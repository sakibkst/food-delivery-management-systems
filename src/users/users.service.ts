import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Users } from 'src/Entity/users.entity';
import { CreateUserDto } from 'src/dtos/create-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(Users) private userRepo: Repository<Users>,
    ) { }

    // Get all users
    async findAll(): Promise<Users[]> {
        return this.userRepo.find();
    }

    // Create a new user
    async createUser(createUserDto: CreateUserDto): Promise<Users> {
        const existingUser = await this.userRepo.findOneBy({ u_email: createUserDto.u_email });
        if (existingUser) {
            throw new ConflictException('Email is already taken');
        }

        const user = new Users();
        user.u_name = createUserDto.u_name;
        user.u_email = createUserDto.u_email;

        // Hash the password before saving
        const salt = await bcrypt.genSalt();
        user.u_password = await bcrypt.hash(createUserDto.u_password, salt);

        user.u_role = createUserDto.u_role;
        return await this.userRepo.save(user);
    }

    // Get all users
    async getAllUsers(): Promise<Users[]> {
        return await this.userRepo.find();
    }

    // Get a user by ID
    async getUserById(id: number): Promise<Users> {
        const user = await this.userRepo.findOneBy({ u_id: id });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    // Update a user by ID
    async updateUser(id: number, updateUserDto: Partial<CreateUserDto>): Promise<Users> {
        const user = await this.getUserById(id); // Check if the user exists first

        // If email is being updated, check if the new email is already taken
        if (updateUserDto.u_email) {
            const existingUser = await this.userRepo.findOneBy({ u_email: updateUserDto.u_email });
            if (existingUser && existingUser.u_id !== id) {  // Check if the email belongs to another user
                throw new ConflictException('Email is already taken');
            }
            user.u_email = updateUserDto.u_email;
        }

        // Update other fields if provided
        if (updateUserDto.u_name) user.u_name = updateUserDto.u_name;
        if (updateUserDto.u_role) user.u_role = updateUserDto.u_role;

        // If password is provided, hash it before saving
        if (updateUserDto.u_password) {
            const salt = await bcrypt.genSalt();
            user.u_password = await bcrypt.hash(updateUserDto.u_password, salt);
        }

        return await this.userRepo.save(user);
    }

    // Delete a user by ID
    async deleteUser(id: number): Promise<void> {
        const user = await this.getUserById(id); // Check if the user exists first
        await this.userRepo.remove(user);
    }

    // Store the reset code and expiration time in the DB
    async storeResetCode(email: string, resetCode: string, expirationTime: Date): Promise<void> {
        const user = await this.userRepo.findOneBy({ u_email: email });
        if (user) {
            user.resetCode = resetCode;
            user.resetCodeExpiration = expirationTime;
            await this.userRepo.save(user);
        }
    }

    // Find a user by reset code
    async findUserByResetCode(resetCode: string): Promise<Users | undefined> {
        return await this.userRepo.findOneBy({ resetCode });
    }

    // Update user's password (after reset)
    async updatePassword(userId: number, newPassword: string): Promise<void> {
        const user = await this.userRepo.findOneBy({ u_id: userId });
        if (user) {
            // Hash the new password before updating
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.u_password = hashedPassword;
            await this.userRepo.save(user);
        }
    }
}
