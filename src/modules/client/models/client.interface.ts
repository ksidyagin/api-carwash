import { ClientAuto } from "src/modules/client-auto/models/client-auto.interface";
import { Order } from "src/modules/order/models/order.interface";
import { User } from "src/modules/user/models/user.interface";

export interface Client 
{
    id?: number;
    user_entry?: User;
    description?: string;
    visits?: number;
    first_visit?: Date;
    last_visit?: Date;
    total_amount?: number;
    average_check?: number;
    cars?: ClientAuto[];
    orders?: Order[];
}
