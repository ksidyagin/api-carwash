import { ApiProperty } from "@nestjs/swagger";
import { Category } from "src/modules/category/models/category.interface";
import { Order } from "src/modules/order/models/order.interface";
import { User } from "src/modules/user/models/user.interface";
import { UserToCarwash } from "src/modules/user-to-carwash/models/userToCarwash.model";

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

    // @ApiProperty({required: false, type: () => [UserToCarwash]})
    // userToCarwash?: UserToCarwash[];
}
