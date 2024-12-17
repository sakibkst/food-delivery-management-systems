import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { UserService } from 'src/users/users.service';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { Users } from 'src/Entity/users.entity';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('users')

export class UserController {
    constructor(private readonly userService: UserService) { }

    // Create a new user
    @Post('create')
    async createUser(@Body() createUserDto: CreateUserDto): Promise<Users> {
        return this.userService.createUser(createUserDto);
    }

    // Get all users
    // @Roles('Admin')
    // @UseGuards(JwtAuthGuard, RolesGuard)

    @Get('shows')
    async getAllUsers(): Promise<Users[]> {
        return this.userService.getAllUsers();
    }

    // Get a user by ID
    @Get('show/:id')
    async getUserById(@Param('id') id: number): Promise<Users> {
        return this.userService.getUserById(id);
    }

    // Update user details
    @Put('update/:id')
    async updateUser(
        @Param('id') id: number,
        @Body() updateUserDto: Partial<CreateUserDto>,
    ): Promise<{ message: string; user: Users }> {
        const updatedUser = await this.userService.updateUser(id, updateUserDto);
        return { message: 'User updated successfully', user: updatedUser };
    }


    // Delete a user
    @Delete('delete/:id')
    async deleteUser(@Param('id') id: number): Promise<{ message: string }> {
        await this.userService.deleteUser(id);  // Delete the user
        return { message: 'User deleted successfully' };  // Return success message
    }

}
