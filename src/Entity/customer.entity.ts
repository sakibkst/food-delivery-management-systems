import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { Users } from "src/Entity/users.entity";
import { Chat } from "./chat.entity";
import { Review } from "./review.entity";

@Entity()
export class Customer {
    @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
    id: number;

    @Column({ type: 'varchar', length: 200 })
    address: string;

    @OneToOne(() => Users, user => user.customer)
    @JoinColumn()
    user: Users;

    @OneToMany(() => Chat, chat => chat.customer)
    chats: Chat[];
    @OneToMany(() => Review, review => review.customer)  // OneToMany relationship with Review
    reviews: Review[];

}
