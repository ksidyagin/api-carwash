import { ClientEntity } from "src/modules/client/models/client.entity";
import { Client } from "src/modules/client/models/client.interface";
import { OrderEntity } from "src/modules/order/models/order.entity";
import { Order } from "src/modules/order/models/order.interface";
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ClientAutoEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    brand: string;

    @Column()
    model: string;

    @Column()
    category: string;

    @Column()
    state_number: string;

    @Column({type:'int'})
    region: number;

    @ManyToOne(type => ClientEntity, client => client.cars)
    owner: ClientEntity;

    @OneToMany(type => OrderEntity, order => order.auto)
    order_entries: OrderEntity[];

}