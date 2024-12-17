import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'src/Entity/users.entity';
import { CreateUserDto } from 'src/dtos/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users) private userRepo: Repository<Users>,
  ) { }

  // Create a new user
  async createUser(createUserDto: CreateUserDto): Promise<Users> {
    const user = new Users();
    user.u_name = createUserDto.u_name;
    user.u_email = createUserDto.u_email;
    user.u_password = createUserDto.u_password;  // Password should be hashed before saving
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
    if (updateUserDto.u_name) user.u_name = updateUserDto.u_name;
    if (updateUserDto.u_email) user.u_email = updateUserDto.u_email;
    if (updateUserDto.u_role) user.u_role = updateUserDto.u_role;
    if (updateUserDto.u_password) user.u_password = updateUserDto.u_password; // Password should be hashed
    return await this.userRepo.save(user);
  }

  // Delete a user by ID
  async deleteUser(id: number): Promise<void> {
    const user = await this.getUserById(id); // Check if the user exists first
    await this.userRepo.remove(user);
  }
}
