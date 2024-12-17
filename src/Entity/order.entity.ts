import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Customer } from "./customer.entity";
import { OrderItem } from "src/Entity/order-item.entity";

@Entity()
export class Order {
    @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
    id: number;

    @ManyToOne(() => Customer)  // Each order can belong to only one customer
    @JoinColumn()
    customer: Customer;  // No array, as each order belongs to one customer

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    orderDate: Date;

    @Column({ type: 'decimal' })
    totalAmount: number;

    @Column({
        type: 'enum',
        enum: ['Pending', 'Preparing', 'Delivered', 'Canceled']
    })
    status: string;

    @Column({ type: 'varchar', length: 200 })
    deliveryAddress: string;

    @OneToMany(() => OrderItem, orderItem => orderItem.order)  // One Order can have multiple OrderItems
    items: OrderItem[];
}
