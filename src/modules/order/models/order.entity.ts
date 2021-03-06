import { ApiProperty } from "@nestjs/swagger";
import { CarwashEntity } from "src/modules/carwash/models/carwash.entity";
import { ClientAutoEntity } from "src/modules/client-auto/models/client-auto.entity";
import { ClientEntity } from "src/modules/client/models/client.entity";
import { ServiceEntity } from "src/modules/service/models/service.entity";
import { BeforeInsert, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderStatus } from "./order.interface";

@Entity()
export class OrderEntity {
    @ApiProperty({required: false})
    @PrimaryGeneratedColumn()
    id?: number;
    
    @ApiProperty()
    @ManyToOne(() => CarwashEntity, carwash => carwash.orders_list)
    carwash_entry?: CarwashEntity;

    @ApiProperty()
    @ManyToOne(() => ClientEntity, client => client.orders)
    client_entry?: ClientEntity;

    @ApiProperty()
    @ManyToOne(() => ClientAutoEntity, auto => auto.order_entries, {cascade: true})
    auto?: ClientAutoEntity;

    @ApiProperty()
    @ManyToMany(() => ServiceEntity)
    @JoinTable()
    selected_services?: ServiceEntity[];

    @ApiProperty()
    @Column({type: 'timestamp'})
    selected_time?: Date;

    @ApiProperty()
    @Column({type: 'enum', enum: OrderStatus, default: OrderStatus.accepted })
    status?: string;

    @ApiProperty({required: false})
    @Column({type: 'int', default: 0})
    evaluation?: number;

    @ApiProperty({required: false})
    @Column({default:''})
    comment?: string;

    @ApiProperty()
    @Column({type: 'float'})
    total_price?: number;


}