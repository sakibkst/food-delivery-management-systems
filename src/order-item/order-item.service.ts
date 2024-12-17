// order-item.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItem } from 'src/Entity/order-item.entity';
import { Order } from 'src/Entity/order.entity';
import { MenuItem } from 'src/Entity/menu-item.entity';

@Injectable()
export class OrderItemService {
    constructor(
        @InjectRepository(OrderItem)
        private readonly orderItemRepository: Repository<OrderItem>,
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        @InjectRepository(MenuItem)
        private readonly menuItemRepository: Repository<MenuItem>,
    ) { }

    // Create a new order item
    async create(orderId: number, menuItemId: number, quantity: number, price: number): Promise<OrderItem> {
        const order = await this.orderRepository.findOne({ where: { id: orderId } });
        if (!order) {
            throw new Error('Order not found');
        }

        const menuItem = await this.menuItemRepository.findOne({ where: { id: menuItemId } });
        if (!menuItem) {
            throw new Error('Menu item not found');
        }

        const orderItem = new OrderItem();
        orderItem.order = order;
        orderItem.menuItem = menuItem;
        orderItem.quantity = quantity;
        orderItem.price = price;

        return this.orderItemRepository.save(orderItem);
    }

    // Get all order items
    async findAll(): Promise<OrderItem[]> {
        return this.orderItemRepository.find({ relations: ['order', 'menuItem'] });
    }

    // Get order item by ID
    async findOne(id: number): Promise<OrderItem> {
        return this.orderItemRepository.findOne({
            where: { id },
            relations: ['order', 'menuItem'],
        });
    }

    // Update order item by ID
    async update(id: number, quantity: number, price: number): Promise<OrderItem> {
        const orderItem = await this.orderItemRepository.findOne({ where: { id } });
        if (!orderItem) {
            throw new Error('OrderItem not found');
        }

        orderItem.quantity = quantity;
        orderItem.price = price;

        return this.orderItemRepository.save(orderItem);
    }

    // Delete order item by ID
    async remove(id: number): Promise<void> {
        const orderItem = await this.orderItemRepository.findOne({ where: { id } });
        if (!orderItem) {
            throw new Error('OrderItem not found');
        }

        await this.orderItemRepository.remove(orderItem);
    }
}
