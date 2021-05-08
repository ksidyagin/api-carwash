import { CategoryEntity } from "src/modules/category/models/category.entity";
import { Category } from "src/modules/category/models/category.interface";
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class ServiceEntity {
    @PrimaryGeneratedColumn()
    id?: number;
    
    @Column()
    description?: string;

    @Column({type: 'float'})
    price?: number;

    @ManyToOne(() => CategoryEntity, category => category.services)
    category?: CategoryEntity;

}