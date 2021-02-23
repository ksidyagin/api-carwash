import { ClientAutoEntity } from "src/modules/client-auto/models/client-auto.entity";
import { ClientAuto } from "src/modules/client-auto/models/client-auto.interface";
import { OrderEntity } from "src/modules/order/models/order.entity";
import { Order } from "src/modules/order/models/order.interface";
import { UserEntity } from "src/modules/user/models/user.entity";
import { User } from "src/modules/user/models/user.interface";
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class ClientEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;

    @OneToMany(type => ClientAutoEntity, auto => auto.owner)
    cars: ClientAutoEntity[];

    @OneToOne(type => UserEntity, user => user.client_entry)
    user_entry: UserEntity;

    @OneToMany(type => OrderEntity, order => order.client_entry)
    orders: OrderEntity[];

    @Column({type:'int', default: 0})
    visits: number;

    @Column({default: ""})
    description: string;

    @Column({type: 'timestamp',  default: () => "CURRENT_TIMESTAMP"})
    first_visit: Date;

    @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    last_visit: Date;

    @Column({type:'float', default: 0})
    total_amount: number;

    @Column({type:'float', default: 0})
    average_check: number;
}