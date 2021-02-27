import { ApiProperty } from "@nestjs/swagger";
import { ClientAutoEntity } from "src/modules/client-auto/models/client-auto.entity";
import { ClientAuto } from "src/modules/client-auto/models/client-auto.interface";
import { OrderEntity } from "src/modules/order/models/order.entity";
import { Order } from "src/modules/order/models/order.interface";
import { UserEntity } from "src/modules/user/models/user.entity";
import { User } from "src/modules/user/models/user.interface";
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class ClientEntity {
    @ApiProperty({required: false})
    @PrimaryGeneratedColumn()
    id: number;
    
    @ApiProperty({required: false})
    @Column()
    name: string;

    @ApiProperty({required: false})
    @OneToMany(type => ClientAutoEntity, auto => auto.owner)
    cars: ClientAutoEntity[];

    @ApiProperty({required: false})
    @OneToOne(type => UserEntity, user => user.client_entry)
    user_entry: UserEntity;

    @ApiProperty({required: false})
    @OneToMany(type => OrderEntity, order => order.client_entry)
    orders: OrderEntity[];

    @ApiProperty({required: false})
    @Column({type:'int', default: 0})
    visits: number;

    @ApiProperty({required: false})
    @Column({default: ""})
    description: string;

    @ApiProperty({required: false})
    @Column({type: 'timestamp',  default: () => "CURRENT_TIMESTAMP"})
    first_visit: Date;

    @ApiProperty({required: false})
    @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    last_visit: Date;

    @ApiProperty({required: false})
    @Column({type:'float', default: 0})
    total_amount: number;

    @ApiProperty({required: false})
    @Column({type:'float', default: 0})
    average_check: number;
}