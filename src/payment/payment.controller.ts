import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }

  // Route to create a new payment
  @Post('create')
  async createPayment(
    @Body('amount') amount: number,
    @Body('paymentMethod') paymentMethod: string,
    @Body('userId') userId: number,
  ) {
    return this.paymentService.createPayment(amount, paymentMethod, userId);
  }

  // Route to get all payments by user ID
  @Get('show/:userId')
  async getPaymentsByUser(@Param('userId') userId: number) {
    return this.paymentService.getPaymentsByUser(userId);
  }

  // Route to update payment status
  @Put('update/:paymentId/status')
  async updatePaymentStatus(
    @Param('paymentId') paymentId: number,
    @Body('status') status: string,
  ) {
    return this.paymentService.updatePaymentStatus(paymentId, status);
  }
}
