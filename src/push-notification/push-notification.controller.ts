// src/push-notification/push-notification.controller.ts

import { Controller, Post, Body } from '@nestjs/common';
import { PushNotificationService } from './push-notification.service';

@Controller('notifications')
export class PushNotificationController {
    constructor(private readonly pushNotificationService: PushNotificationService) { }

    @Post('send')
    async sendNotification(@Body() body: { token: string; message: string }) {
        const { token, message } = body;
        const response = await this.pushNotificationService.sendPushNotification(token, message);
        return response;
    }
}
