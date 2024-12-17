// order-item.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from 'src/Entity/order-item.entity';
import { Order } from 'src/Entity/order.entity';
import { MenuItem } from 'src/Entity/menu-item.entity';
import { OrderItemService } from './order-item.service';
import { OrderItemController } from './order-item.controller';

@Module({
  imports: [TypeOrmModule.forFeature([OrderItem, Order, MenuItem])], // Import entities
  providers: [OrderItemService],
  controllers: [OrderItemController],
})
export class OrderItemModule { }
