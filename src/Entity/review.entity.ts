import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Customer } from './customer.entity';  // assuming Customer entity is defined
import { Restaurant } from './restaurant.entity';  // assuming Restaurant entity is defined

@Entity()
export class Review {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    rating: number;

    @Column({ type: 'text', nullable: true })
    comment: string;

    @ManyToOne(() => Customer, customer => customer.reviews)
    @JoinColumn({ name: 'customerId' })
    customer: Customer;

    @ManyToOne(() => Restaurant, restaurant => restaurant.reviews)
    @JoinColumn({ name: 'restaurantId' })
    restaurant: Restaurant;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    reviewDate: Date;
}

