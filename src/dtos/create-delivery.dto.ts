import { Type } from 'class-transformer';
import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateDeliveryDto {
    @IsInt()
    orderId: number;

    @IsInt()
    deliveryPersonId: number;

    @IsString()
    deliveryStatus: string;

    @IsOptional()
    @IsDateString()
    @Type(() => Date)  // Transform string to Date instance
    deliveryTime: Date;  // Now it's a Date object, not just a string
}
