import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { Users } from "src/Entity/users.entity";
import { Review } from "./review.entity";

@Entity()
export class Restaurant {
    [x: string]: any;
    @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
    id: number;

    @Column({ type: 'varchar', length: 200 })
    address: string;

    @Column({ type: 'varchar', length: 50 })
    cuisineType: string;

    @Column({ type: 'float', default: 0 })
    rating: number;

    @OneToOne(() => Users, user => user.restaurant)
    @JoinColumn()
    user: Users;
    @OneToMany(() => Review, review => review.restaurant)  // OneToMany relationship with Review
    reviews: Review[];
}
