import { ApiProperty } from "@nestjs/swagger";
import { Warehouse } from "src/modules/warehouse/models/warehouse.model";

export class ActOfDebiting {

    @ApiProperty({required: false})
    id?: number;
   
    @ApiProperty()
    comment?: string;

    @ApiProperty()
    warehouse_deleted?: Warehouse;

    @ApiProperty()
    name_product?: string;

    @ApiProperty()
    packaging?: string;

    @ApiProperty()
    count?: number;

}