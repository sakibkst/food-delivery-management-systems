// src/push-notification/push-notification.service.ts

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as path from 'path';

@Injectable()
export class PushNotificationService {
    constructor() {
        const serviceAccount = path.join(__dirname, '..', 'firebase', 'serviceAccountKey.json');

        try {
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
            });
            console.log('Firebase Admin SDK initialized successfully!');
        } catch (error) {
            console.error('Error initializing Firebase Admin SDK:', error);
        }
    }

    // Function to send push notification
    async sendPushNotification(token: string, message: string): Promise<any> {
        const messagePayload = {
            notification: {
                title: 'New Notification',
                body: message,
            },
            token: token, // Device token
        };

        try {
            const response = await admin.messaging().send(messagePayload);
            return {
                success: true,
                response,
            };
        } catch (error) {
            throw new HttpException('Error sending notification', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
