import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })  // Allowing all origins for simplicity
export class LiveChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer()
    server: Server;

    // When a client connects
    handleConnection(client: Socket) {
        console.log('Client connected: ', client.id);
    }

    // When a client disconnects
    handleDisconnect(client: Socket) {
        console.log('Client disconnected: ', client.id);
    }

    // Listen for incoming chat messages from clients
    @SubscribeMessage('send_message')
    handleMessage(@MessageBody() message: string, client: Socket) {
        console.log('Received message: ', message);
        // Broadcasting the message to all clients (or specific ones if needed)
        this.server.emit('receive_message', message);
    }
}
