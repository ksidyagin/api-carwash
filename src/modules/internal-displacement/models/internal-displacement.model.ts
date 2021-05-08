import { ApiProperty } from "@nestjs/swagger";
import { Warehouse } from "src/modules/warehouse/models/warehouse.model";

export class InternalDisplacement {

    @ApiProperty({required: false})
    id?: number;
   
    @ApiProperty()
    comment?: string;

    @ApiProperty({ type: () => Warehouse})
    warehouse_deleted?: Warehouse;

    @ApiProperty({ type: () => Warehouse})
    warehouse_added?: Warehouse;

    @ApiProperty()
    name_product?: string;

    @ApiProperty()
    packaging?: string;

    @ApiProperty()
    count?: number;

    @ApiProperty()
    date?: Date;

    @ApiProperty()
    date_receipt?: Date;
}