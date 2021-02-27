import { ApiProperty } from "@nestjs/swagger";
import { ClientEntity } from "src/modules/client/models/client.entity";
import { Client } from "src/modules/client/models/client.interface";
import { OrderEntity } from "src/modules/order/models/order.entity";
import { Order } from "src/modules/order/models/order.interface";
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ClientAutoEntity {
    @ApiProperty({required: false})
    @PrimaryGeneratedColumn()
    id: number;
    
    @ApiProperty()
    @Column()
    brand: string;

    @ApiProperty()
    @Column()
    model: string;

    @ApiProperty()
    @Column()
    category: string;

    @ApiProperty()
    @Column()
    state_number: string;

    @ApiProperty()
    @Column({type:'int'})
    region: number;

    @ApiProperty()
    @ManyToOne(type => ClientEntity, client => client.cars)
    owner: ClientEntity;

    @ApiProperty({required: false})
    @OneToMany(type => OrderEntity, order => order.auto)
    order_entries: OrderEntity[];

}