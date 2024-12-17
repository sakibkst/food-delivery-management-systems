// order.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from 'src/Entity/order.entity';
import { Customer } from 'src/Entity/customer.entity';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        @InjectRepository(Customer)
        private readonly customerRepository: Repository<Customer>,
    ) { }

    // Create a new order
    async create(customerId: number, deliveryAddress: string, totalAmount: number): Promise<Order> {
        const customer = await this.customerRepository.findOne({
            where: { id: customerId },  // Use "where" for the correct query structure
        });

        if (!customer) {
            throw new NotFoundException('Customer not found');
        }

        const order = new Order();
        order.customer = customer;
        order.deliveryAddress = deliveryAddress;
        order.totalAmount = totalAmount;
        order.status = 'Pending';  // Default status

        return this.orderRepository.save(order);
    }

    // Get all orders
    async findAll(): Promise<Order[]> {
        return this.orderRepository.find({
            relations: ['customer', 'items'],  // Load related customer and items
        });
    }

    // Get a specific order by ID
    async findOne(id: number): Promise<Order> {
        const order = await this.orderRepository.findOne({
            where: { id },
            relations: ['customer', 'items'],
        });

        if (!order) {
            throw new NotFoundException(`Order with ID ${id} not found`);
        }

        return order;
    }

    // Update an order by ID
    async update(
        id: number,
        status: string,
        deliveryAddress: string,
        totalAmount: number
    ): Promise<Order> {
        const order = await this.findOne(id);  // Ensure the order exists
        order.status = status;
        order.deliveryAddress = deliveryAddress;
        order.totalAmount = totalAmount;

        return this.orderRepository.save(order);
    }

    // Delete an order by ID
    async remove(id: number): Promise<void> {
        const order = await this.findOne(id);  // Ensure the order exists
        await this.orderRepository.remove(order);
    }
}
