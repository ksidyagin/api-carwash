import { Client } from "src/modules/client/models/client.interface";
import { Order } from "src/modules/order/models/order.interface";

export interface ClientAuto 
{
    id?: number;
    brand?: string;
    model?: string;
    category?: string;
    state_number?: string;
    region?: number;
    owner?: Client;
    order_entries?: Order[];
}