import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from 'src/Entity/customer.entity';
import { Users } from 'src/Entity/users.entity';
import { CreateCustomerDto } from 'src/dtos/create-customer.dto';
import { hash } from 'bcrypt';

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(Customer)
        private readonly customerRepository: Repository<Customer>,

        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>,
    ) { }

    // Create a new customer
    async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
        // Check if the email already exists
        const existingUser = await this.usersRepository.findOne({
            where: { u_email: createCustomerDto.u_email },
        });

        if (existingUser) {
            throw new ConflictException('Email already exists');
        }

        // Create the new user and hash the password
        const user = this.usersRepository.create({
            u_name: createCustomerDto.u_name,
            u_email: createCustomerDto.u_email,
            u_password: await hash(createCustomerDto.u_password, 10), // Hashing the password
            u_role: 'Customer',
        });

        const savedUser = await this.usersRepository.save(user);

        // Create the new customer and link the user
        const customer = this.customerRepository.create({
            address: createCustomerDto.address,
            user: savedUser,
        });

        return this.customerRepository.save(customer);
    }

    // Get all customers
    async findAll(): Promise<Customer[]> {
        return this.customerRepository.find({ relations: ['user'] });
    }

    // Get a customer by ID
    async findOne(id: number): Promise<Customer> {
        const customer = await this.customerRepository.findOne({
            where: { id },
            relations: ['user'],
        });

        if (!customer) {
            throw new NotFoundException(`Customer with ID ${id} not found`);
        }

        return customer;
    }

    async update(id: number, updateCustomerDto: CreateCustomerDto): Promise<Customer> {
        const customer = await this.findOne(id);
        const user = customer.user;

        // Check if the new email is already in use
        const existingUser = await this.usersRepository.findOne({ where: { u_email: updateCustomerDto.u_email } });
        if (existingUser && existingUser.u_id !== user.u_id) {  // Use u_id here instead of id
            throw new ConflictException('Email is already in use');
        }

        // Update user and customer details
        user.u_name = updateCustomerDto.u_name;
        user.u_email = updateCustomerDto.u_email;
        user.u_password = await hash(updateCustomerDto.u_password, 10); // Hash the new password
        await this.usersRepository.save(user);

        customer.address = updateCustomerDto.address;
        return this.customerRepository.save(customer);
    }

    // Delete a customer by ID
    async remove(id: number): Promise<void> {
        const customer = await this.findOne(id);
        await this.customerRepository.remove(customer);
    }
}
