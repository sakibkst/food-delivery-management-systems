import { Controller, Get, Post, Body, Param, Put, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { DeliveryPersonService } from './delivery-person.service';
import { CreateDeliveryPersonDto } from 'src/dtos/create-delivery-person.dto';
import { DeliveryPerson } from 'src/Entity/delivery-person.entity';

@Controller('delivery-persons') // Base route for all delivery persons
export class DeliveryPersonController {
    constructor(private readonly deliveryPersonService: DeliveryPersonService) { }

    // Create a new delivery person
    @Post('create')
    async create(@Body() createDeliveryPersonDto: CreateDeliveryPersonDto): Promise<DeliveryPerson> {
        try {
            return await this.deliveryPersonService.create(createDeliveryPersonDto);
        } catch (error) {
            // Handle the errors as you've already done
            if (error.message === 'Email already exists') {
                throw new HttpException({
                    status: HttpStatus.BAD_REQUEST,
                    error: error.message,
                }, HttpStatus.BAD_REQUEST);
            }
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Something went wrong. Please try again later.',
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // Get all delivery persons
    @Get('shows')
    async findAll(): Promise<DeliveryPerson[]> {
        return this.deliveryPersonService.findAll();
    }

    // Get a delivery person by ID
    @Get('find/:id')
    async findOne(@Param('id') id: number): Promise<DeliveryPerson> {
        return this.deliveryPersonService.findOne(id);
    }

    // Update delivery person by ID
    @Put('update/:id')
    async update(
        @Param('id') id: number,
        @Body() updateDeliveryPersonDto: CreateDeliveryPersonDto,
    ): Promise<DeliveryPerson> {
        return this.deliveryPersonService.update(id, updateDeliveryPersonDto);
    }

    // Delete a delivery person by ID
    @Delete('delete/:id')
    async remove(@Param('id') id: number): Promise<{ message: string }> {
        return this.deliveryPersonService.remove(id);
    }
}
