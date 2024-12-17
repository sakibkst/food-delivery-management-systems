// order-item.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { OrderItem } from 'src/Entity/order-item.entity';

@Controller('order-items')  // Base URL for the controller
export class OrderItemController {
    constructor(private readonly orderItemService: OrderItemService) { }

    // Create a new order item
    @Post('create')  // API name: /order-items/create
    async create(@Body() body: { orderId: number; menuItemId: number; quantity: number; price: number }): Promise<OrderItem> {
        return this.orderItemService.create(
            body.orderId,
            body.menuItemId,
            body.quantity,
            body.price
        );
    }

    // Get all order items
    @Get('list')  // API name: /order-items/list
    async findAll(): Promise<OrderItem[]> {
        return this.orderItemService.findAll();
    }

    // Get order item by ID
    @Get(':id')  // API name: /order-items/:id
    async findOne(@Param('id') id: number): Promise<OrderItem> {
        return this.orderItemService.findOne(id);
    }

    // Update an order item by ID
    @Put('update/:id')  // API name: /order-items/update/:id
    async update(
        @Param('id') id: number,
        @Body() body: { quantity: number; price: number }
    ): Promise<OrderItem> {
        return this.orderItemService.update(id, body.quantity, body.price);
    }

    // Delete an order item by ID
    @Delete('delete/:id')  // API name: /order-items/delete/:id
    async remove(@Param('id') id: number): Promise<void> {
        return this.orderItemService.remove(id);
    }
}
