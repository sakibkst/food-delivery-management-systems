import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from 'src/Entity/chat.entity';
import { CreateChatDto } from 'src/dtos/Create-Chat.dto';
import { Customer } from 'src/Entity/customer.entity';
import { DeliveryPerson } from 'src/Entity/delivery-person.entity';

@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(Chat)
        private chatRepository: Repository<Chat>,
        @InjectRepository(Customer)
        private customerRepository: Repository<Customer>,
        @InjectRepository(DeliveryPerson)
        private deliveryPersonRepository: Repository<DeliveryPerson>,
    ) { }

    // Send chat message (supporting both customer to delivery person and delivery person to customer)
    async sendChat(createChatDto: CreateChatDto): Promise<Chat> {
        const { customerId, deliveryPersonId, content, type } = createChatDto;

        // Determine whether it's from customer to delivery person or vice versa
        const customer = customerId ? await this.customerRepository.findOne({ where: { id: customerId } }) : null;
        const deliveryPerson = deliveryPersonId ? await this.deliveryPersonRepository.findOne({ where: { id: deliveryPersonId } }) : null;

        // Check if the customer exists (if the message is from customer)
        if (customerId && !customer) {
            throw new NotFoundException(`Customer with ID ${customerId} not found`);
        }

        // Check if the delivery person exists (if the message is from delivery person)
        if (deliveryPersonId && !deliveryPerson) {
            throw new NotFoundException(`Delivery person with ID ${deliveryPersonId} not found`);
        }

        // If no customer or delivery person are found, it's an invalid request
        if (!customer && !deliveryPerson) {
            throw new BadRequestException('Either customer or delivery person must be provided');
        }

        try {
            const chat = this.chatRepository.create({
                content,
                type,
                status: 'sent',  // Default status when message is sent
                customer: customer || undefined,  // Assign customer if available
                deliveryPerson: deliveryPerson || undefined,  // Assign delivery person if available
            });

            return await this.chatRepository.save(chat);
        } catch (error) {
            // Handle any internal server error
            throw new InternalServerErrorException('Error saving chat message');
        }
    }

    // Get chats for a customer
    async getChatsForCustomer(customerId: number): Promise<Chat[]> {
        try {
            const chats = await this.chatRepository.find({
                where: { customer: { id: customerId } },
                relations: ['customer', 'deliveryPerson'],
                order: { sentAt: 'ASC' },
            });

            if (!chats || chats.length === 0) {
                throw new NotFoundException(`No chats found for customer with ID ${customerId}`);
            }

            return chats;
        } catch (error) {
            throw new InternalServerErrorException('Error fetching chats for customer');
        }
    }

    // Get chats for a delivery person
    async getChatsForDeliveryPerson(deliveryPersonId: number): Promise<Chat[]> {
        try {
            const chats = await this.chatRepository.find({
                where: { deliveryPerson: { id: deliveryPersonId } },
                relations: ['customer', 'deliveryPerson'],
                order: { sentAt: 'ASC' },
            });

            if (!chats || chats.length === 0) {
                throw new NotFoundException(`No chats found for delivery person with ID ${deliveryPersonId}`);
            }

            return chats;
        } catch (error) {
            throw new InternalServerErrorException('Error fetching chats for delivery person');
        }
    }

    // Get chat between a customer and a delivery person
    async getChatBetween(customerId: number, deliveryPersonId: number): Promise<Chat[]> {
        try {
            const chats = await this.chatRepository
                .createQueryBuilder('chat')
                .where('chat.customerId = :customerId', { customerId })
                .andWhere('chat.deliveryPersonId = :deliveryPersonId', { deliveryPersonId })
                .leftJoinAndSelect('chat.customer', 'customer')
                .leftJoinAndSelect('chat.deliveryPerson', 'deliveryPerson')
                .orderBy('chat.sentAt', 'ASC')
                .getMany();

            if (!chats || chats.length === 0) {
                throw new NotFoundException(`No chats found between customer ID ${customerId} and delivery person ID ${deliveryPersonId}`);
            }

            return chats;
        } catch (error) {
            throw new InternalServerErrorException('Error fetching chat between customer and delivery person');
        }
    }
}
