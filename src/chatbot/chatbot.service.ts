// src/chatbot/chatbot.service.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { SessionsClient } from 'dialogflow';
import * as path from 'path';

@Injectable()
export class ChatbotService {
    private sessionClient: SessionsClient;
    private projectId: string;
    private sessionId: string;

    constructor() {
        const credentialsPath = path.join(__dirname, 'path_to_your_service_account_file.json');
        process.env.GOOGLE_APPLICATION_CREDENTIALS = credentialsPath;

        this.sessionClient = new SessionsClient();
        this.projectId = 'your-dialogflow-project-id'; // Replace with your project ID
        this.sessionId = 'your-session-id'; // Can be dynamically generated
    }

    // Ensure sendMessage is properly defined
    async sendMessage(message: string): Promise<any> {
        const sessionPath = this.sessionClient.projectAgentSessionPath(this.projectId, this.sessionId);

        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: message,
                    languageCode: 'en', // Adjust language code if needed
                },
            },
        };

        try {
            const responses = await this.sessionClient.detectIntent(request);
            const result = responses[0].queryResult;
            return result.fulfillmentText; // The response from Dialogflow
        } catch (error) {
            throw new HttpException('Error in Dialogflow interaction', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
