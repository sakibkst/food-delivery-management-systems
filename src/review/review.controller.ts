// review.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from 'src/dtos/create-review.dto';
import { Review } from 'src/Entity/review.entity';

@Controller('reviews')
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) { }

    // Create a new review
    @Post('create')
    async create(@Body() createReviewDto: CreateReviewDto): Promise<Review> {
        return this.reviewService.create(createReviewDto);
    }

    // Get all reviews
    @Get('shows')
    async findAll(): Promise<Review[]> {
        return this.reviewService.findAll();
    }

    // Get a review by ID
    @Get('show/:id')
    async findOne(@Param('id') id: number): Promise<Review> {
        return this.reviewService.findOne(id);
    }

    // Update review by ID
    @Put('update/:id')
    async update(
        @Param('id') id: number,
        @Body() updateReviewDto: CreateReviewDto,
    ): Promise<Review> {
        return this.reviewService.update(id, updateReviewDto);
    }

    // Delete review by ID
    @Delete('delete/:id')
    async remove(@Param('id') id: number): Promise<void> {
        return this.reviewService.remove(id);
    }
}
