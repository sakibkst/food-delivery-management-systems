import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { Customer } from 'src/Entity/customer.entity';
import { Users } from 'src/Entity/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, Users])],
  providers: [CustomerService],
  controllers: [CustomerController],
  exports: [CustomerService],
})
export class CustomerModule { }
