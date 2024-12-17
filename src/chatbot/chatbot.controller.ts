// src/chatbot/chatbot.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';  // Ensure correct path

@Controller('chatbot')
export class ChatbotController {
    constructor(private readonly chatbotService: ChatbotService) { }

    @Post('message')
    async getResponse(@Body() body: { message: string }) {
        const response = await this.chatbotService.sendMessage(body.message);
        return { response };
    }
}
