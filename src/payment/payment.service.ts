import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from 'src/Entity/payment.entity';
import { Users } from 'src/Entity/users.entity'; // Import User entity for relationship

@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(Payment)
        private paymentRepository: Repository<Payment>,
        @InjectRepository(Users)
        private userRepository: Repository<Users>, // Ensure userRepository is injected
    ) { }

    // Method to create a new payment
    async createPayment(amount: number, paymentMethod: string, userId: number): Promise<Payment> {
        // Use findOne with correct syntax
        const user = await this.userRepository.findOne({
            where: { u_id: userId },  // Correct usage with 'id' field
        });

        if (!user) {
            throw new Error('User not found');
        }

        const payment = this.paymentRepository.create({
            amount,
            paymentMethod,
            paymentDate: new Date(),
            status: 'Pending',
            user,  // Link the user to the payment
            userId,
        });

        return this.paymentRepository.save(payment);
    }

    // Method to get payments for a user
    async getPaymentsByUser(userId: number): Promise<Payment[]> {
        return this.paymentRepository.find({
            where: { userId },
            relations: ['user'],
        });
    }

    // Method to update payment status
    async updatePaymentStatus(paymentId: number, status: string): Promise<Payment> {
        const payment = await this.paymentRepository.findOne({
            where: { id: paymentId },
        });
        if (!payment) {
            throw new Error('Payment not found');
        }

        payment.status = status;
        return this.paymentRepository.save(payment);
    }
}
