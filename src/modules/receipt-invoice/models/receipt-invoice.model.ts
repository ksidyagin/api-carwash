import { ApiProperty } from "@nestjs/swagger";
import { Warehouse } from "src/modules/warehouse/models/warehouse.model";

export class ReceiptInvoice {

    @ApiProperty({required: false})
    id?: number;

    @ApiProperty()
    provider?: string;

    @ApiProperty()
    comment?: string;

    @ApiProperty()
    incoming_number?: string;   

    @ApiProperty()
    warehouse_entry?: Warehouse;

    @ApiProperty()
    date_receipt?: Date;

    @ApiProperty()
    name_product?: string;

    @ApiProperty()
    packaging?: string;

    @ApiProperty()
    count?: number;

    @ApiProperty()
    price?: number;

    @ApiProperty()
    sum?: number;
}