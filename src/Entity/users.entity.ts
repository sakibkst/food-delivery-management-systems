import { BeforeUpdate, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "./customer.entity";
import { Restaurant } from "./restaurant.entity";
import { DeliveryPerson } from "./delivery-person.entity";
import { Payment } from "./payment.entity";

@Entity()
export class Users {
    @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
    u_id: number;

    @Column({ type: 'varchar', length: 50 })
    u_name: string;

    @Column({ type: 'varchar', length: 100, unique: true })
    u_email: string;

    @Column({ type: 'varchar', length: 200 })
    u_password: string;

    @Column({
        type: 'enum',
        enum: ['Admin', 'Customer', 'Restaurant', 'DeliveryPerson']
    })
    u_role: string;

    @Column({ nullable: true, type: 'varchar', unsigned: true })
    resetCode: string;

    @Column({ type: 'timestamp', nullable: true })
    resetTokenExpires: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'timestamp', nullable: true })
    updated_at: Date;
    resetCodeExpiration: Date;

    @BeforeUpdate()
    updateTimestamp() {
        this.updated_at = new Date();
    }

    @Column({ type: 'varchar', nullable: true, default: 'Not Approved' })
    status: string;

    @OneToOne(() => Customer, customer => customer.user)
    customer: Customer;

    @OneToOne(() => Restaurant, restaurant => restaurant.user)
    restaurant: Restaurant;

    @OneToOne(() => DeliveryPerson, deliveryPerson => deliveryPerson.user)
    deliveryPerson: DeliveryPerson;

    @OneToMany(() => Payment, payment => payment.user)
    payments: Payment[];

    // Add the missing fields for reset password functionality
    @Column({ nullable: true })
    resetPasswordToken: string;

    @Column({ nullable: true })
    resetPasswordExpires: Date;
}
