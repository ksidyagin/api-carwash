import { ApiProperty } from "@nestjs/swagger";
import { Carwash } from "src/modules/carwash/models/carwash.interface";
import { Service } from "src/modules/service/models/service.interface";
import { Warehouse } from "src/modules/warehouse/models/warehouse.model";

export class Category {
    @ApiProperty({required: false})
    id?: number;

    @ApiProperty()
    name?: string;

    @ApiProperty({required: false, type: () => [Service]})
    services?: Service[];

    @ApiProperty({required: false, type: () => [Warehouse]})
    warehouses?: Warehouse[];

    @ApiProperty({type: () => Carwash})
    carwash?: Carwash;
}