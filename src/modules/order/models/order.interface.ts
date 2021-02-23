import { Carwash } from "src/modules/carwash/models/carwash.interface";
import { ClientAuto } from "src/modules/client-auto/models/client-auto.interface";
import { Client } from "src/modules/client/models/client.interface";
import { Service } from "src/modules/service/models/service.interface";

export interface Order 
{
    id?: number;
    carwash_entry?: Carwash;
    client_entry?: Client;
    auto?: ClientAuto;
    selected_services?: Service[];
    selected_time?: Date;
    status?: string;
    evaluation?: number;
    comment?: string;
    total_price?: number;
}
