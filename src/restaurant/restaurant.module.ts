import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { Restaurant } from 'src/Entity/restaurant.entity';
import { UsersModule } from 'src/users/users.module'; // Import UsersModule
import { Users } from 'src/Entity/users.entity';
import { JwtModule } from '@nestjs/jwt'; // Import JwtModule
import { Customer } from 'src/Entity/customer.entity';
import { DeliveryPerson } from 'src/Entity/delivery-person.entity';
import { Payment } from 'src/Entity/payment.entity';
import { RolesGuard } from 'src/auth/role.guard'; // Import RolesGuard
import { AuthModule } from 'src/auth/auth.module'; // If using a shared AuthModule for JWT
import { Review } from 'src/Entity/review.entity';
import { ReviewModule } from 'src/review/review.module';

@Module({
  imports: [
    // Import TypeOrmModule for the entities
    TypeOrmModule.forFeature([Users, Restaurant, Customer, DeliveryPerson, Payment, Review]),
    ReviewModule,

    // Import JwtModule and configure it here
    JwtModule.register({
      secret: 'ec92f9b831c8d83c1f63576e47836ac4259e2fd1e5b2f3f5c9e04d8b5d5f515',  // Replace with actual secret
      signOptions: { expiresIn: '60m' },  // Optional: Set expiration for the JWT
    }),

    // Import AuthModule for shared JWT functionality (if using a shared module)
    AuthModule,
  ],
  controllers: [RestaurantController],
  providers: [RestaurantService, RolesGuard], // Add RolesGuard in providers
})
export class RestaurantModule { }
