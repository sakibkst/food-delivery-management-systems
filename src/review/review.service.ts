// review.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from 'src/Entity/review.entity';
import { CreateReviewDto } from 'src/dtos/create-review.dto';
import { Customer } from 'src/Entity/customer.entity';  // Assuming Customer entity exists
import { Restaurant } from 'src/Entity/restaurant.entity';  // Assuming Restaurant entity exists

@Injectable()
export class ReviewService {
    constructor(
        @InjectRepository(Review)
        private readonly reviewRepository: Repository<Review>,

        @InjectRepository(Customer)
        private readonly customerRepository: Repository<Customer>,

        @InjectRepository(Restaurant)
        private readonly restaurantRepository: Repository<Restaurant>,
    ) { }

    // Create a new review with associated customer and restaurant
    async create(createReviewDto: CreateReviewDto): Promise<Review> {
        const { rating, comment, customerId, restaurantId } = createReviewDto;

        // Check if the customer and restaurant exist
        const customer = await this.customerRepository.findOne({ where: { id: customerId } });
        if (!customer) {
            throw new NotFoundException(`Customer with ID ${customerId} not found`);
        }

        const restaurant = await this.restaurantRepository.findOne({ where: { id: restaurantId } });
        if (!restaurant) {
            throw new NotFoundException(`Restaurant with ID ${restaurantId} not found`);
        }

        // Create the review entity and associate customer and restaurant
        const review = this.reviewRepository.create({
            rating,
            comment,
            customer,
            restaurant,
        });

        return this.reviewRepository.save(review);
    }

    // Get all reviews with customer and restaurant details
    async findAll(): Promise<Review[]> {
        return this.reviewRepository.find({
            relations: ['customer', 'restaurant'],  // Ensure customer and restaurant are included
        });
    }

    // Get a single review by ID with customer and restaurant details
    async findOne(id: number): Promise<Review> {
        const review = await this.reviewRepository.findOne({
            where: { id },
            relations: ['customer', 'restaurant'],  // Include related entities
        });

        if (!review) {
            throw new NotFoundException(`Review with ID ${id} not found`);
        }

        return review;
    }

    // Update an existing review
    async update(id: number, updateReviewDto: CreateReviewDto): Promise<Review> {
        const review = await this.findOne(id);

        // Update the review fields
        Object.assign(review, updateReviewDto);

        // Check and update customer and restaurant if necessary
        if (updateReviewDto.customerId) {
            const customer = await this.customerRepository.findOne({ where: { id: updateReviewDto.customerId } });
            if (!customer) {
                throw new NotFoundException(`Customer with ID ${updateReviewDto.customerId} not found`);
            }
            review.customer = customer;
        }

        if (updateReviewDto.restaurantId) {
            const restaurant = await this.restaurantRepository.findOne({ where: { id: updateReviewDto.restaurantId } });
            if (!restaurant) {
                throw new NotFoundException(`Restaurant with ID ${updateReviewDto.restaurantId} not found`);
            }
            review.restaurant = restaurant;
        }

        return this.reviewRepository.save(review);
    }

    // Delete a review
    async remove(id: number): Promise<void> {
        const review = await this.findOne(id);
        await this.reviewRepository.remove(review);
    }
}
