import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { PaymentModule } from './payment/payment.module';
import { AuthModule } from './auth/auth.module';
import { Customer } from 'src/Entity/customer.entity';
import { Users } from 'src/Entity/users.entity';
import { Review } from './Entity/review.entity';
import { Payment } from './Entity/payment.entity';
import { DeliveryPerson } from './Entity/delivery-person.entity';
import { Menu } from './Entity/menu.entity';
import { MenuItem } from './Entity/menu-item.entity';
import { Order } from './Entity/order.entity';
import { OrderItem } from './Entity/order-item.entity';
import { Restaurant } from './Entity/restaurant.entity';
import { Delivery } from './Entity/delivery.entity';
import { UserService } from 'src/users/users.service';
import { UsersModule } from './users/users.module';
import { DeliveryPersonModule } from './delivery-person/delivery-person.module';
import { CustomerModule } from './customer/customer.module';
import { MenuItemService } from './menu-item/menu-item.service';
import { MenuItemController } from './menu-item/menu-item.controller';
import { MenuItemModule } from './menu-item/menu-item.module';
import { MenuModule } from './menu/menu.module';
import { OrderItemModule } from './order-item/order-item.module';
import { OrderModule } from './order/order.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { ReviewModule } from './review/review.module';
import { DeliveryModule } from './delivery/delivery.module';
import { JwtModule } from '@nestjs/jwt';
import { Chat } from './Entity/chat.entity';
import { ChatService } from './chat/chat.service';
import { ChatController } from './chat/chat.controller';
import { ChatModule } from './chat/chat.module';
import { MailService } from 'src/mail/mail.service';
import { MailModule } from './mail/mail.module';
import { ChatbotService } from './chatbot/chatbot.service';
import { ChatbotModule } from './chatbot/chatbot.module';
import { PushNotificationService } from './push-notification/push-notification.service';
import { PushNotificationController } from './push-notification/push-notification.controller';
import { PushNotificationModule } from './push-notification/push-notification.module';
import { LiveChatModule } from './live-chat/live-chat.module';




@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'foodOrderingDB',
      autoLoadEntities: true,
      synchronize: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),

    // JWT Module configuration
    JwtModule.register({
      secret: 'ec92f9b831c8d83c1f63576e47836ac4259e2fd1e5b2f3f5c9e04d8b5d5f515', // Use process.env.JWT_SECRET in production
      signOptions: { expiresIn: '1h' }, // Adjust token expiration as needed
    }),

    AuthModule,
    UsersModule,
    DeliveryPersonModule,
    TypeOrmModule.forFeature([Users, Chat, Customer, Review, Payment, DeliveryPerson, Menu, MenuItem, Order, OrderItem, Restaurant, Delivery]),
    CustomerModule,
    MenuItemModule,
    MenuModule,
    OrderItemModule,
    OrderModule,
    RestaurantModule,
    ReviewModule,
    DeliveryModule,
    ChatModule,
    MailModule,
    ChatbotModule,
    PushNotificationModule,
    LiveChatModule,
    PaymentModule
  ],
  providers: [UserService, MenuItemService, ChatService, MailService, ChatbotService, PushNotificationService],
  controllers: [MenuItemController, ChatController, PushNotificationController],
})
export class AppModule { }
