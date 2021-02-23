import { CarwashEntity } from "src/modules/carwash/models/carwash.entity";
import { ClientAutoEntity } from "src/modules/client-auto/models/client-auto.entity";
import { ClientEntity } from "src/modules/client/models/client.entity";
import { ServiceEntity } from "src/modules/service/models/service.entity";
import { BeforeInsert, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class OrderEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(type => CarwashEntity, carwash => carwash.orders_list)
    carwash_entry: CarwashEntity;

    @ManyToOne(type => ClientEntity, client => client.orders)
    client_entry: ClientEntity;

    @ManyToOne(type => ClientAutoEntity, auto => auto.order_entries)
    auto: ClientAutoEntity;

    @ManyToMany(() => ServiceEntity)
    @JoinTable()
    selected_services: ServiceEntity[];

    @Column({type: 'timestamp'})
    selected_time: Date;

    @Column()
    status: string;

    @Column({type: 'int', default: 0})
    evaluation: number;

    @Column({default:''})
    comment: string;

    @Column({type: 'float'})
    total_price: number;


}