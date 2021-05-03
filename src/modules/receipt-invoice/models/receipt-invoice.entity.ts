import { WarehouseEntity } from "src/modules/warehouse/models/warehouse.entity";
import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export class ReceiptInvoice {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    provider?: string;

    @Column()
    comment?: string;

    @Column()
    incoming_number?: string;   

    @ManyToOne(() => WarehouseEntity, warehouse => warehouse)
    warehouse_entry?: WarehouseEntity;

    @Column()
    date_receipt?: Date;

    @Column()
    name_product?: string;

    @Column()
    packaging?: string;

    @Column()
    count?: number;

    @Column()
    price?: number;

    @Column()
    sum?: number;
}