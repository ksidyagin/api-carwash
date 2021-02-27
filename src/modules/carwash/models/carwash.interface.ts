import { ApiProperty } from "@nestjs/swagger";
import { Category } from "src/modules/category/models/category.interface";
import { Order } from "src/modules/order/models/order.interface";

export class Carwash 
{
    @ApiProperty({required: false})
    id?: number;

    @ApiProperty()
    name?: string;

    @ApiProperty()
    address?: string;

    @ApiProperty()
    phone?: string;

    @ApiProperty()
    workTime_weekday?: string;

    @ApiProperty()
    workTime_weekend?: string;

    @ApiProperty()
    rating?: number;

    @ApiProperty({required: false, type: () => [Category]})
    service_categories?: Category[];

    @ApiProperty({required: false, type: () => [Order]})
    orders_list?: Order[];
}
