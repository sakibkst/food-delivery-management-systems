import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Order } from "./order.entity";
import { MenuItem } from "./menu-item.entity";

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
    id: number;

    @ManyToOne(() => Order)
    @JoinColumn({ name: 'order_id', referencedColumnName: 'id' })  // Explicit foreign key for Order
    order: Order;

    @ManyToOne(() => MenuItem)
    @JoinColumn({ name: 'menu_item_id', referencedColumnName: 'id' })  // Optional: Explicit foreign key for MenuItem
    menuItem: MenuItem;

    @Column({ type: 'int' })
    quantity: number;

    @Column({ type: 'decimal' })
    price: number;
}
