// chat.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { Chat } from 'src/Entity/chat.entity'; // Your Chat Entity
import { Customer } from 'src/Entity/customer.entity';  // Customer Entity
import { DeliveryPerson } from 'src/Entity/delivery-person.entity';  // DeliveryPerson Entity

@Module({
    imports: [
        TypeOrmModule.forFeature([Chat, Customer, DeliveryPerson]),  // Register entities for use in services
    ],
    controllers: [ChatController],
    providers: [ChatService],
})
export class ChatModule { }
