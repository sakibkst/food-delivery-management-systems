import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryController } from './delivery.controller';
import { DeliveryService } from './delivery.service';
import { Delivery } from 'src/Entity/delivery.entity';
import { DeliveryPersonService } from 'src/delivery-person/delivery-person.service';
import { Order } from 'src/Entity/order.entity';
import { DeliveryPerson } from 'src/Entity/delivery-person.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Delivery, Order, DeliveryPerson]),
    UsersModule,
  ],
  controllers: [DeliveryController],
  providers: [DeliveryService, DeliveryPersonService],
  exports: [DeliveryPersonService, DeliveryService],
})
export class DeliveryModule { }
