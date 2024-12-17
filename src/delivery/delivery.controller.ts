import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { CreateDeliveryDto } from 'src/dtos/create-delivery.dto';
import { UpdateDeliveryDto } from 'src/dtos/update-delivery.dto';
import { Delivery } from 'src/Entity/delivery.entity';

@Controller('deliveries')
export class DeliveryController {
    constructor(private readonly deliveryService: DeliveryService) { }

    // Create a new delivery
    @Post('create')
    async create(@Body() createDeliveryDto: CreateDeliveryDto): Promise<Delivery> {
        return this.deliveryService.create(createDeliveryDto);
    }

    // Get all deliveries
    @Get('shows')
    async findAll(): Promise<Delivery[]> {
        return this.deliveryService.findAll();
    }

    // Get a delivery by ID
    @Get('show/:id')
    async findOne(@Param('id') id: number): Promise<Delivery> {
        return this.deliveryService.findOne(id);
    }

    // Update a delivery
    @Put('update/:id')
    async update(
        @Param('id') id: number,
        @Body() updateDeliveryDto: UpdateDeliveryDto,
    ): Promise<Delivery> {
        return this.deliveryService.update(id, updateDeliveryDto);
    }

    // Delete a delivery
    @Delete('delete/:id')
    async remove(@Param('id') id: number): Promise<void> {
        return this.deliveryService.remove(id);
    }
}
