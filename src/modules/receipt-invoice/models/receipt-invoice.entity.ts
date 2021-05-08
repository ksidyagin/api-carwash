import { WarehouseEntity } from "src/modules/warehouse/models/warehouse.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ReceiptInvoiceEntity {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    provider?: string;

    @Column()
    comment?: string;

    @Column()
    incoming_number?: string;   

    @ManyToOne(() => WarehouseEntity, warehouse => warehouse.receipt_invoices, { onDelete: 'CASCADE'})
    warehouse_entry?: WarehouseEntity;

    @Column({type: 'timestamp'})
    date?: Date;

    @Column({type: 'timestamp'})
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