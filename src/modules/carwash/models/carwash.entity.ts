import { CategoryEntity } from "src/modules/category/models/category.entity";
import { OrderEntity } from "src/modules/order/models/order.entity";
import { Order } from "src/modules/order/models/order.interface";
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class CarwashEntity 
{
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;

    @Column()
    address: string;

    @Column()
    phone: string;
    
    @Column()
    workTime_weekday: string;

    @Column()
    workTime_weekend: string;

    @Column({type:'float'})
    rating: number;

    @OneToMany(type => CategoryEntity, categories => categories.carwash)
    service_categories: CategoryEntity[];

    @OneToMany(type => OrderEntity, order => order.carwash_entry)
    orders_list: OrderEntity[];

}