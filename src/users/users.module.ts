import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/Entity/users.entity';
import { UserService } from './users.service';
import { UserController } from './users.controller';
import { Customer } from 'src/Entity/customer.entity';
import { Restaurant } from 'src/Entity/restaurant.entity';
import { DeliveryPerson } from 'src/Entity/delivery-person.entity';
import { Payment } from 'src/Entity/payment.entity';
import { RolesGuard } from 'src/auth/role.guard';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Customer, Restaurant, DeliveryPerson, Payment]),
    JwtModule.register({
      secret: 'your-ec92f9b831c8d83c1f63576e47836ac4259e2fd1e5b2f3f5c9e04d8b5d5f515-secret', // Replace with your actual secret
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [
    UserService,
    RolesGuard,
    JwtService, // Ensure JwtService is properly provided
  ],
  controllers: [UserController],
  exports: [UserService, TypeOrmModule.forFeature([Users]), JwtModule],
})
export class UsersModule { }
