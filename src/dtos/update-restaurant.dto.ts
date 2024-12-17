import { IsString, IsOptional, IsNumber, Min, Max } from 'class-validator';

export class UpdateRestaurantDto {
    @IsOptional()
    @IsString()
    address?: string;

    @IsOptional()
    @IsString()
    cuisineType?: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(5)
    rating?: number;
}
