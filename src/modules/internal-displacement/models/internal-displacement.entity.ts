import { WarehouseEntity } from "src/modules/warehouse/models/warehouse.entity";
import { Warehouse } from "src/modules/warehouse/models/warehouse.model";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class InternalDisplacementEntity {

    @PrimaryGeneratedColumn()
    id?: number;
   
    @Column()
    comment?: string;

    @ManyToOne(() => WarehouseEntity, warehouse => warehouse.internal_displacements, {onDelete: 'CASCADE'})
    warehouse_deleted?: WarehouseEntity;

    @ManyToOne(() => WarehouseEntity, warehouse => warehouse.internal_displacements, {onDelete: 'CASCADE'})
    warehouse_added?: WarehouseEntity;

    @Column()
    name_product?: string;

    @Column()
    packaging?: string;

    @Column()
    count?: number;

    @Column({type: 'timestamp'})
    date?: Date;

    @Column({type: 'timestamp'})
    date_receipt?: Date;
   
}