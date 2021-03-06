import { ApiProperty } from "@nestjs/swagger";
import { Warehouse } from "src/modules/warehouse/models/warehouse.model";

export class Product 
{
    @ApiProperty({required: false})
    id?: number;

    @ApiProperty({required: false})
    name?: string;

    @ApiProperty({required: false})
    count?: number;

    @ApiProperty({required: false})
    measurement?: string;

    
    @ApiProperty({required: false, type: () => Warehouse})
    warehouse?: Warehouse;
}