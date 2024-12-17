// order.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from 'src/Entity/order.entity';

@Controller('orders')  // Base URL for the controller
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  // Create a new order
  @Post('create')  // API name: /orders/create
  async create(@Body() body: { customerId: number; deliveryAddress: string; totalAmount: number }): Promise<Order> {
    return this.orderService.create(
      body.customerId,
      body.deliveryAddress,
      body.totalAmount
    );
  }

  // Get all orders
  @Get('shows')  // API name: /orders/list
  async findAll(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  // Get a specific order by ID
  @Get('show/:id')  // API name: /orders/:id
  async findOne(@Param('id') id: number): Promise<Order> {
    return this.orderService.findOne(id);
  }

  // Update an order by ID
  @Put('update/:id')  // API name: /orders/update/:id
  async update(
    @Param('id') id: number,
    @Body() body: { status: string; deliveryAddress: string; totalAmount: number }
  ): Promise<Order> {
    return this.orderService.update(id, body.status, body.deliveryAddress, body.totalAmount);
  }

  // Delete an order by ID
  @Delete('delete/:id')  // API name: /orders/delete/:id
  async remove(@Param('id') id: number): Promise<void> {
    return this.orderService.remove(id);
  }
}
