// review.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { Review } from 'src/Entity/review.entity';
import { Restaurant } from 'src/Entity/restaurant.entity';
import { Customer } from 'src/Entity/customer.entity';
import { CustomerModule } from 'src/customer/customer.module';

@Module({
  imports: [TypeOrmModule.forFeature([Review, Restaurant, Customer]), CustomerModule,],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule { }
