import { IsEnum, IsInt, IsOptional, IsDate } from 'class-validator';

export class UpdateDeliveryDto {
    @IsEnum(['Out for Delivery', 'Delivered', 'Canceled'])
    @IsOptional()
    deliveryStatus?: string;

    @IsOptional()
    @IsDate()
    deliveryTime?: Date;
}
