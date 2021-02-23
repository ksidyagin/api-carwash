import { Category } from "src/modules/category/models/category.interface";
import { Order } from "src/modules/order/models/order.interface";

export interface Carwash 
{
    id?: number;
    name?: string;
    address?: string;
    phone?: string;
    workTime_weekday?: string;
    workTime_weekend?: string;
    rating?: number;
    service_categories?: Category[];
    orders_list?: Order[];
}
