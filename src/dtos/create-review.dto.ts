// create-review.dto.ts
import { IsInt, Min, Max, IsString, IsNotEmpty } from 'class-validator';

export class CreateReviewDto {
    @IsInt()
    @Min(1)
    @Max(5)
    rating: number; // Rating from 1 to 5

    @IsString()
    @IsNotEmpty()
    comment: string; // Review comment

    @IsInt()
    customerId: number; // Customer who gave the review

    @IsInt()
    restaurantId: number; // Restaurant that is being reviewed
}
