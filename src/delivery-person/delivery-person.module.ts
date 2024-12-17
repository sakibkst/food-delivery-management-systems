// delivery-person.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryPerson } from 'src/Entity/delivery-person.entity';
import { Users } from 'src/Entity/users.entity';
import { DeliveryPersonController } from './delivery-person.controller';
import { DeliveryPersonService } from './delivery-person.service';
import { DeliveryService } from 'src/delivery/delivery.service';
import { Delivery } from 'src/Entity/delivery.entity';
import { Order } from 'src/Entity/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DeliveryPerson, Users, Delivery, Order])],
  controllers: [DeliveryPersonController],
  providers: [DeliveryPersonService, DeliveryService],
  exports: [DeliveryPersonService],
})
export class DeliveryPersonModule { }
