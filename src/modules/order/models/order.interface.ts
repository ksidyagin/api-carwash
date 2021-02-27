import { ApiProperty } from "@nestjs/swagger";
import { Carwash } from "src/modules/carwash/models/carwash.interface";
import { ClientAuto } from "src/modules/client-auto/models/client-auto.interface";
import { Client } from "src/modules/client/models/client.interface";
import { Service } from "src/modules/service/models/service.interface";

export class Order 
{
    @ApiProperty({required: false})
    id?: number;

    @ApiProperty()
    carwash_entry?: Carwash;

    @ApiProperty({type: () => Client})
    client_entry?: Client;

    @ApiProperty({type: () => ClientAuto})
    auto?: ClientAuto;

    @ApiProperty({type: () => [Service]})
    selected_services?: Service[];

    @ApiProperty()
    selected_time?: Date;

    @ApiProperty()
    status?: string;

    @ApiProperty({required: false})
    evaluation?: number;

    @ApiProperty({required: false})
    comment?: string;

    @ApiProperty()
    total_price?: number;
}
