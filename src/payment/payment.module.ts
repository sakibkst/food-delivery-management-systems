import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from 'src/Entity/payment.entity';
import { Users } from 'src/Entity/users.entity'; // Import the User entity if needed
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Users])], // Import entities here
  providers: [PaymentService],
  controllers: [PaymentController],
})
export class PaymentModule {}
