import { ApiProperty } from "@nestjs/swagger";
import { Client } from "src/modules/client/models/client.interface";
import { Order } from "src/modules/order/models/order.interface";

export class ClientAuto 
{
    @ApiProperty({required: false})
    id?: number;

    @ApiProperty()
    brand?: string;

    @ApiProperty()
    model?: string;

    @ApiProperty()
    category?: string;

    @ApiProperty()
    state_number?: string;

    @ApiProperty()
    region?: string;

    @ApiProperty({type: () => Client})
    owner?: Client;

    @ApiProperty({required: false, type: () => [Order]})
    order_entries?: Order[];
}