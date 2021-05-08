import { ApiProperty } from "@nestjs/swagger";
import { ActOfDebitingEntity } from "src/modules/act-of-debiting/models/act-of-debiting.entity";
import { CategoryEntity } from "src/modules/category/models/category.entity";
import { InternalDisplacementEntity } from "src/modules/internal-displacement/models/internal-displacement.entity";
import { ProductEntity } from "src/modules/product/models/product.entity";
import { ReceiptInvoiceEntity } from "src/modules/receipt-invoice/models/receipt-invoice.entity";

import { BeforeInsert, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class WarehouseEntity {
    @ApiProperty({required: false})
    @PrimaryGeneratedColumn()
    id?: number;
    
    @Column()
    name?: string;

    @ManyToOne(() => CategoryEntity, category => category.warehouses)
    service_category?: CategoryEntity;

    @OneToMany(()=> ProductEntity, product => product.warehouse, {cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'})
    products?: ProductEntity[];

    @OneToMany(() => ReceiptInvoiceEntity, receipt => receipt.warehouse_entry, {cascade: true,
        onDelete: 'CASCADE'})
    receipt_invoices?: ReceiptInvoiceEntity[];
    
    @OneToMany(() => ActOfDebitingEntity, debiting => debiting.warehouse_deleted, {cascade: true,
        onDelete: 'CASCADE'})
    acts_of_debiting?: ActOfDebitingEntity[];

    @OneToMany(() => InternalDisplacementEntity, internal => internal.warehouse_added, {cascade: true,
        onDelete: 'CASCADE'})
    internal_displacements?: InternalDisplacementEntity[];
}