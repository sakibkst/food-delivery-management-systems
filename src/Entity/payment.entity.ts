import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from 'src/Entity/users.entity'; // Assuming you have a User entity for the payment to be linked to

@Entity()
export class Payment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    amount: number;

    @Column()
    paymentDate: Date;

    @Column()
    paymentMethod: string; // E.g., 'Credit Card', 'PayPal', etc.

    @Column({ default: 'Pending' })
    status: string; // E.g., 'Pending', 'Completed', 'Failed'

    @ManyToOne(() => Users, user => user.payments)
    @JoinColumn({ name: 'userId' })
    user: Users; // Link to the User entity

    @Column()
    userId: number; // Foreign key for the User
}
