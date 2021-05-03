import { WarehouseEntity } from "src/modules/warehouse/models/warehouse.entity";
import { Warehouse } from "src/modules/warehouse/models/warehouse.model";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ActOfDebitingEntity {

    @PrimaryGeneratedColumn()
    id?: number;
   
    @Column()
    comment?: string;

    @ManyToOne(() => WarehouseEntity, warehouse => warehouse.products)
    warehouse_deleted?: Warehouse;

    @Column()
    name_product?: string;

    @Column()
    packaging?: string;

    @Column()
    count?: number;

}