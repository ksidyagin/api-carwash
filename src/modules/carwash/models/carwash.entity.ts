import { ApiProperty } from "@nestjs/swagger";
import { CategoryEntity } from "src/modules/category/models/category.entity";
import { OrderEntity } from "src/modules/order/models/order.entity";
import { Order } from "src/modules/order/models/order.interface";
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class CarwashEntity 
{
    @ApiProperty({required: false})
    @PrimaryGeneratedColumn()
    id: number;
    
    @ApiProperty()
    @Column()
    name: string;

    @ApiProperty()
    @Column()
    address: string;

    @ApiProperty()
    @Column()
    phone: string;
    
    @ApiProperty()
    @Column()
    workTime_weekday: string;

    @ApiProperty()
    @Column()
    workTime_weekend: string;

    @ApiProperty()
    @Column({type:'float'})
    rating: number;

    @ApiProperty({required: false})
    @OneToMany(() => CategoryEntity, categories => categories.carwash)
    service_categories: CategoryEntity[];

    @ApiProperty({required: false})
    @OneToMany(() => OrderEntity, order => order.carwash_entry)
    orders_list: OrderEntity[];

}