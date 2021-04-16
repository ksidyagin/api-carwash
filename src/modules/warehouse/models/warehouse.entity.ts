import { ApiProperty } from "@nestjs/swagger";
import { CategoryEntity } from "src/modules/category/models/category.entity";
import { ProductEntity } from "src/modules/product/models/product.entity";
import { BeforeInsert, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class WarehouseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;

    @ManyToOne(() => CategoryEntity, category => category.warehouses)
    service_category: CategoryEntity;

    @OneToMany(()=> ProductEntity, product => product.warehouse)
    products: ProductEntity[];

}