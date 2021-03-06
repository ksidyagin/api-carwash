import { WarehouseEntity } from "src/modules/warehouse/models/warehouse.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;

    @ManyToOne(() => WarehouseEntity, warehouse => warehouse.products)
    warehouse: WarehouseEntity;

    @Column({type: 'int', default: 0})
    count: number;

    @Column()
    measurement: string;




}