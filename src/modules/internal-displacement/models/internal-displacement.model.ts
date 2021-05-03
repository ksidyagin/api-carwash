import { ApiProperty } from "@nestjs/swagger";
import { Warehouse } from "src/modules/warehouse/models/warehouse.model";

export class InternalDisplacement {

    @ApiProperty({required: false})
    id?: number;
   
    @ApiProperty()
    comment?: string;

    @ApiProperty()
    warehouse_deleted?: Warehouse;

    @ApiProperty()
    warehouse_added?: Warehouse;

    @ApiProperty()
    name_product?: string;

    @ApiProperty()
    packaging?: string;

    @ApiProperty()
    count?: number;

   
}