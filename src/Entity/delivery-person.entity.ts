import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { Users } from './users.entity';
import { Chat } from "./chat.entity";

@Entity()
export class DeliveryPerson {
    @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
    id: number;

    @Column({ type: 'varchar', length: 50 })
    vehicleDetails: string;

    @Column({ type: 'varchar', default: 'Available' })
    currentStatus: string;

    @OneToOne(() => Users, user => user.deliveryPerson, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userUId' })
    user: Users;

    @OneToMany(() => Chat, chat => chat.deliveryPerson)
    chats: Chat[];
}
