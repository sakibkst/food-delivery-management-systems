import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeliveryPerson } from 'src/Entity/delivery-person.entity';
import { Users } from 'src/Entity/users.entity';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { CreateDeliveryPersonDto } from 'src/dtos/create-delivery-person.dto';
import * as bcrypt from 'bcryptjs'; // Import bcryptjs for hashing
import { Delivery } from 'src/Entity/delivery.entity';
import { Order } from 'src/Entity/order.entity';

@Injectable()
export class DeliveryPersonService {
    constructor(
        @InjectRepository(DeliveryPerson)
        private readonly deliveryPersonRepository: Repository<DeliveryPerson>,

        @InjectRepository(Delivery)
        private readonly deliveryRepository: Repository<Delivery>,

        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,

        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>,
    ) { }

    // Create a new delivery person along with user details
    async create(createDeliveryPersonDto: CreateDeliveryPersonDto): Promise<DeliveryPerson> {
        // Check if the email already exists in the users table
        const existingUser = await this.usersRepository.findOne({
            where: { u_email: createDeliveryPersonDto.u_email },
        });

        if (existingUser) {
            throw new Error('Email already exists');
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(createDeliveryPersonDto.u_password, 10);

        // Create the new user with the hashed password
        const user = this.usersRepository.create({
            u_name: createDeliveryPersonDto.u_name,
            u_email: createDeliveryPersonDto.u_email,
            u_password: hashedPassword, // Save hashed password
            u_role: 'DeliveryPerson',
        });

        // Save the user and link it to the DeliveryPerson
        const savedUser = await this.usersRepository.save(user);

        // Create and save the DeliveryPerson
        const deliveryPerson = this.deliveryPersonRepository.create({
            vehicleDetails: createDeliveryPersonDto.vehicleDetails,
            currentStatus: createDeliveryPersonDto.currentStatus,
            user: savedUser,
        });

        return this.deliveryPersonRepository.save(deliveryPerson);
    }

    // Get all delivery persons
    async findAll(): Promise<DeliveryPerson[]> {
        return this.deliveryPersonRepository.find({ relations: ['user'] });
    }

    // Get a delivery person by ID
    async findOne(id: number): Promise<DeliveryPerson> {
        return this.deliveryPersonRepository.findOne({
            where: { id },
            relations: ['user'],
        });
    }

    async update(id: number, updateDeliveryPersonDto: CreateDeliveryPersonDto): Promise<DeliveryPerson> {
        const deliveryPerson = await this.deliveryPersonRepository.findOne({
            where: { id },
            relations: ['user'], // Ensure the 'user' relation is loaded
        });

        if (!deliveryPerson) {
            throw new Error('DeliveryPerson not found');
        }

        // Check if user exists before accessing user properties
        if (!deliveryPerson.user) {
            throw new Error('Associated user not found');
        }

        // Check if the new email already exists
        if (updateDeliveryPersonDto.u_email !== deliveryPerson.user.u_email) {
            const existingUser = await this.usersRepository.findOne({
                where: { u_email: updateDeliveryPersonDto.u_email },
            });

            if (existingUser) {
                throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
            }
        }

        // If password is being updated, hash it
        if (updateDeliveryPersonDto.u_password) {
            const hashedPassword = await bcrypt.hash(updateDeliveryPersonDto.u_password, 10);
            deliveryPerson.user.u_password = hashedPassword;
        }

        // Update delivery person details
        deliveryPerson.vehicleDetails = updateDeliveryPersonDto.vehicleDetails;
        deliveryPerson.currentStatus = updateDeliveryPersonDto.currentStatus;

        // Update associated user details
        const user = deliveryPerson.user;
        user.u_name = updateDeliveryPersonDto.u_name;
        user.u_email = updateDeliveryPersonDto.u_email;

        await this.usersRepository.save(user);

        return this.deliveryPersonRepository.save(deliveryPerson);
    }

    async remove(id: number): Promise<{ message: string }> {
        const deliveryPerson = await this.deliveryPersonRepository.findOne({
            where: { id },
            relations: ['user'], // Ensure the associated 'user' is loaded
        });

        if (!deliveryPerson) {
            throw new HttpException(`DeliveryPerson with ID ${id} not found`, HttpStatus.NOT_FOUND);
        }

        try {
            // Delete the delivery person (CASCADE will delete the associated user)
            await this.deliveryPersonRepository.delete(id);

            // If successful, return a success message
            return { message: `DeliveryPerson with ID ${id} deleted successfully` };
        } catch (error) {
            console.error(`Failed to delete DeliveryPerson with ID ${id}:`, error);
            throw new HttpException('An error occurred while deleting the DeliveryPerson. Please try again later.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
