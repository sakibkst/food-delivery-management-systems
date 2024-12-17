import { IsString, IsEmail, IsNumber, Min, Max, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateRestaurantDto {
    @IsString()
    address: string;

    @IsString()
    cuisineType: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(5)
    rating: number;

    @IsString()
    @IsNotEmpty()
    name: string;  // Name of the user (restaurant owner)

    @IsEmail()
    @IsNotEmpty()
    email: string;  // Email of the user (restaurant owner)

    @IsString()
    @IsNotEmpty()
    password: string;  // Password for the user (restaurant owner)
}
