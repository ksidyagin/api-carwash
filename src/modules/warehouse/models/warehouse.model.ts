import { ApiProperty } from "@nestjs/swagger";
import { ActOfDebiting } from "src/modules/act-of-debiting/models/act-of-debiting.model";
import { Category } from "src/modules/category/models/category.interface";
import { InternalDisplacement } from "src/modules/internal-displacement/models/internal-displacement.model";
import { Product } from "src/modules/product/models/product.model";
import { ReceiptInvoice } from "src/modules/receipt-invoice/models/receipt-invoice.model";

export class Warehouse 
{
    @ApiProperty({required: false})
    id?: number;

    @ApiProperty()
    name?: string;

    @ApiProperty({required: false, type: () => [Product]})
    products?: Product[];
    
    @ApiProperty({required: false, type: () => [ReceiptInvoice]})
    receipt_invoices?: ReceiptInvoice[];
    
    @ApiProperty({required: false, type: () => [ActOfDebiting]})
    acts_of_debiting?: ActOfDebiting[];

    @ApiProperty({required: false, type: () => [InternalDisplacement]})
    internal_displacements?: InternalDisplacement[];

    @ApiProperty({type: () => Category})
    service_category?: Category;
}