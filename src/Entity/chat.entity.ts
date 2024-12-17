// chat.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Customer } from './customer.entity';
import { DeliveryPerson } from './delivery-person.entity';

@Entity()
export class Chat {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @Column()
    type: string; // text, image, file, etc.

    @Column()
    status: string; // sent, delivered, read

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    sentAt: Date;

    @ManyToOne(() => Customer, customer => customer.chats)
    @JoinColumn({ name: 'customerId' })
    customer: Customer;

    @ManyToOne(() => DeliveryPerson, deliveryPerson => deliveryPerson.chats)
    @JoinColumn({ name: 'deliveryPersonId' })
    deliveryPerson: DeliveryPerson;
}
