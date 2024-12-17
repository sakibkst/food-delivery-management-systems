import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Delivery } from 'src/Entity/delivery.entity';
import { CreateDeliveryDto } from 'src/dtos/create-delivery.dto';
import { UpdateDeliveryDto } from 'src/dtos/update-delivery.dto';
import { Order } from 'src/Entity/order.entity';
import { DeliveryPerson } from 'src/Entity/delivery-person.entity';

@Injectable()
export class DeliveryService {
    constructor(
        @InjectRepository(Delivery)
        private readonly deliveryRepository: Repository<Delivery>,

        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,

        @InjectRepository(DeliveryPerson)
        private readonly deliveryPersonRepository: Repository<DeliveryPerson>,
    ) { }

    // Create a new delivery
    async create(createDeliveryDto: CreateDeliveryDto): Promise<Delivery> {
        const order = await this.orderRepository.findOne({ where: { id: createDeliveryDto.orderId } });
        const deliveryPerson = await this.deliveryPersonRepository.findOne({ where: { id: createDeliveryDto.deliveryPersonId } });

        if (!order) {
            throw new NotFoundException('Order not found');
        }

        if (!deliveryPerson) {
            throw new NotFoundException('Delivery person not found');
        }

        // Check if the same delivery already exists (i.e., orderId and deliveryPersonId)
        const existingDelivery = await this.deliveryRepository.findOne({
            where: { order: { id: createDeliveryDto.orderId }, deliveryPerson: { id: createDeliveryDto.deliveryPersonId } }
        });

        if (existingDelivery) {
            throw new ConflictException('This delivery already exists for the given order and delivery person');
        }

        const delivery = this.deliveryRepository.create({
            order,
            deliveryPerson,
            deliveryStatus: createDeliveryDto.deliveryStatus,
            deliveryTime: createDeliveryDto.deliveryTime,
        });

        return await this.deliveryRepository.save(delivery);
    }

    // Get all deliveries
    async findAll(): Promise<Delivery[]> {
        return this.deliveryRepository.find({ relations: ['order', 'deliveryPerson'] });
    }

    // Get a single delivery by ID
    async findOne(id: number): Promise<Delivery> {
        const delivery = await this.deliveryRepository.findOne({
            where: { id },
            relations: ['order', 'deliveryPerson'],
        });

        if (!delivery) {
            throw new NotFoundException(`Delivery with ID ${id} not found`);
        }

        return delivery;
    }

    // Update a delivery
    async update(id: number, updateDeliveryDto: UpdateDeliveryDto): Promise<Delivery> {
        const delivery = await this.deliveryRepository.findOne({
            where: { id },
            relations: ['order', 'deliveryPerson'],
        });

        if (!delivery) {
            throw new NotFoundException(`Delivery with ID ${id} not found`);
        }

        if (updateDeliveryDto.deliveryStatus) {
            delivery.deliveryStatus = updateDeliveryDto.deliveryStatus;
        }

        if (updateDeliveryDto.deliveryTime) {
            delivery.deliveryTime = updateDeliveryDto.deliveryTime;
        }

        return this.deliveryRepository.save(delivery);
    }

    // Delete a delivery
    async remove(id: number): Promise<void> {
        const delivery = await this.deliveryRepository.findOne({ where: { id } });

        if (!delivery) {
            throw new NotFoundException(`Delivery with ID ${id} not found`);
        }

        await this.deliveryRepository.remove(delivery);
    }
}
