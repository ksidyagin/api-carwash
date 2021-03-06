import { ApiProperty } from "@nestjs/swagger";
import { Category } from "src/modules/category/models/category.interface";
import { Product } from "src/modules/product/models/product.model";

export class Warehouse 
{
    @ApiProperty({required: false})
    id?: number;

    @ApiProperty()
    name?: string;

    @ApiProperty({required: false, type: () => [Product]})
    products?: Product[];
    
    
    @ApiProperty({type: () => Category})
    service_category?: Category;
}