import { CategoryEntity } from "src/modules/category/models/category.entity";
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

    @Column()
    rating: string;

    @OneToMany(type => CategoryEntity, categories => categories.carwash, { cascade: ['insert', 'update'] })
    service_categories: CategoryEntity[];


}