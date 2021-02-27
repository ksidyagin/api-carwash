import { ApiProperty } from "@nestjs/swagger";
import { Category } from "src/modules/category/models/category.interface";

export class Service {
    @ApiProperty({required: false})
    id?:  number;

    @ApiProperty()
    description?:  string;

    @ApiProperty()
    price?: number;

    @ApiProperty({type: () => Category})
    category?: Category;

}