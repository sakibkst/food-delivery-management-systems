// order.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Order } from 'src/Entity/order.entity';
import { Customer } from 'src/Entity/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Customer])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule { }
