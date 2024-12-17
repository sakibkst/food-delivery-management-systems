import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from 'src/Entity/restaurant.entity';
import { Users } from 'src/Entity/users.entity';
import { Review } from 'src/Entity/review.entity';  // Import Review entity
import { CreateRestaurantDto } from 'src/dtos/create-restaurant.dto';
import { UpdateRestaurantDto } from 'src/dtos/update-restaurant.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RestaurantService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
        @InjectRepository(Restaurant)
        private restaurantRepository: Repository<Restaurant>,
        @InjectRepository(Review)  // Inject the Review repository
        private reviewRepository: Repository<Review>,
    ) { }

    async createRestaurant(createRestaurantDto: CreateRestaurantDto): Promise<Users> {
        const { name, email, password, address, cuisineType } = createRestaurantDto;

        // Check if the email already exists
        const existingUser = await this.usersRepository.findOne({ where: { u_email: email } });
        if (existingUser) {
            throw new ConflictException('Email already exists');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const user = this.usersRepository.create({
            u_name: name,
            u_email: email,
            u_password: hashedPassword,
            u_role: 'Restaurant',
            status: 'Not Approved'
        });

        const savedUser = await this.usersRepository.save(user);

        // Create the restaurant linked to the user
        const restaurant = this.restaurantRepository.create({
            address,
            cuisineType,
            user: savedUser
        });

        await this.restaurantRepository.save(restaurant);
        return savedUser;
    }

    async updateRestaurant(id: number, updateRestaurantDto: UpdateRestaurantDto): Promise<Restaurant> {
        const restaurant = await this.restaurantRepository.findOne({ where: { id }, relations: ['user'] });
        if (!restaurant) {
            throw new NotFoundException('Restaurant not found');
        }

        Object.assign(restaurant, updateRestaurantDto);
        return this.restaurantRepository.save(restaurant);
    }

    async deleteRestaurant(id: number): Promise<void> {
        const restaurant = await this.restaurantRepository.findOne({ where: { id } });
        if (!restaurant) {
            throw new NotFoundException('Restaurant not found');
        }

        await this.restaurantRepository.remove(restaurant);
    }

    // Modified method to include reviews
    async getRestaurantById(id: number): Promise<Restaurant> {
        const restaurant = await this.restaurantRepository.findOne({
            where: { id },
            relations: ['user', 'reviews'],  // Include reviews relation
        });

        if (!restaurant) {
            throw new NotFoundException('Restaurant not found');
        }

        // Fetch reviews using the correct relation
        const reviews = await this.reviewRepository.find({
            where: { restaurant: { id: id } },  // Correct query based on restaurant relation
        });

        // Add the reviews to the restaurant object
        restaurant.reviews = reviews;

        return restaurant;
    }

}
