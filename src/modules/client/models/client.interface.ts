import { ApiProperty } from "@nestjs/swagger";
import { ClientAuto } from "src/modules/client-auto/models/client-auto.interface";
import { Order } from "src/modules/order/models/order.interface";
import { User } from "src/modules/user/models/user.interface";

export class Client 
{
    @ApiProperty({required: false})
    id?: number;

    @ApiProperty({required: false, type: () => User})
    user_entry?: User;

    @ApiProperty({required: false})
    description?: string;

    @ApiProperty({required: false})
    name?: string;

    @ApiProperty({required: false})
    visits?: number;

    @ApiProperty({required: false})
    first_visit?: Date;

    @ApiProperty({required: false})
    last_visit?: Date;

    @ApiProperty({required: false})
    total_amount?: number;

    @ApiProperty({required: false})
    average_check?: number;

    @ApiProperty({required: false, type: () => [ClientAuto]})
    cars?: ClientAuto[];

    @ApiProperty({required: false, type: () => [Order]})
    orders?: Order[];
}
