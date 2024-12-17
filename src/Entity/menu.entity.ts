import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Restaurant } from "./restaurant.entity";

@Entity()
export class Menu {
    @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
    id: number;

    @ManyToOne(() => Restaurant)
    @JoinColumn({ name: 'restaurant_id' })  // Explicit foreign key column name
    restaurant: Restaurant;

    @Column({ type: 'varchar', length: 50 })
    category: string;

    @Column({ type: 'text' })
    description: string;
}
