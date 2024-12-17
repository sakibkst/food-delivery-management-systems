// src/chatbot/chatbot.module.ts
import { Module } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';  // Correct path to service
import { ChatbotController } from './chatbot.controller';  // Correct path to controller

@Module({
  providers: [ChatbotService],  // Register ChatbotService here
  controllers: [ChatbotController],  // Register ChatbotController here
})
export class ChatbotModule { }
