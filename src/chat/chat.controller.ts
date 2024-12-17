import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from 'src/dtos/Create-Chat.dto';
import { Chat } from 'src/Entity/chat.entity';

@Controller('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) { }

    // Send a chat message (from customer to delivery person or vice versa)
    @Post('send')
    async sendChat(@Body() createChatDto: CreateChatDto): Promise<Chat> {
        return this.chatService.sendChat(createChatDto);
    }

    // Get all chats for a customer
    @Get('customer/:customerId')
    async getChatsForCustomer(@Param('customerId') customerId: number): Promise<Chat[]> {
        return this.chatService.getChatsForCustomer(customerId);
    }

    // Get all chats for a delivery person
    @Get('delivery-person/:deliveryPersonId')
    async getChatsForDeliveryPerson(@Param('deliveryPersonId') deliveryPersonId: number): Promise<Chat[]> {
        return this.chatService.getChatsForDeliveryPerson(deliveryPersonId);
    }

    // Get chat between a specific customer and delivery person
    @Get('between')
    async getChatBetween(
        @Query('customerId') customerId: number,
        @Query('deliveryPersonId') deliveryPersonId: number,
    ): Promise<Chat[]> {
        return this.chatService.getChatBetween(customerId, deliveryPersonId);
    }
}
