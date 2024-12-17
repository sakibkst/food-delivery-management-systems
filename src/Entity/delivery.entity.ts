import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import { Order } from "./order.entity";
import { DeliveryPerson } from "./delivery-person.entity";

@Entity()
export class Delivery {
    @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
    id: number;

    @OneToOne(() => Order)
    @JoinColumn()  // Foreign key for the Order entity, named 'order_id' by default
    order: Order;

    @ManyToOne(() => DeliveryPerson)
    @JoinColumn({ name: 'delivery_person_id' })  // Custom foreign key column name for DeliveryPerson
    deliveryPerson: DeliveryPerson;

    @Column({
        type: 'enum',
        enum: ['Out for Delivery', 'Delivered', 'Canceled'],
        default: 'Out for Delivery'
    })
    deliveryStatus: string;

    @Column({ type: 'timestamp', nullable: true })
    deliveryTime: Date;
}
