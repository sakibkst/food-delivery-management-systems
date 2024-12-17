import { IsOptional, IsString, IsInt } from 'class-validator';

export class CreateChatDto {
    @IsOptional()
    @IsInt()
    customerId?: number;

    @IsOptional()
    @IsInt()
    deliveryPersonId?: number;

    @IsString()
    content: string;

    @IsString()
    type: string;  // e.g., 'text', 'image', 'file'
}
