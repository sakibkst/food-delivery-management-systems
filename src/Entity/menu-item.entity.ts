import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Menu } from "./menu.entity";

@Entity()
export class MenuItem {
    @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
    id: number;

    @ManyToOne(() => Menu)
    @JoinColumn({ name: 'menu_id' })  // Explicit foreign key column name
    menu: Menu;

    @Column({ type: 'varchar', length: 50 })
    name: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })  // Define precision and scale for price
    price: number;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'boolean', default: true })
    availability: boolean;
}
