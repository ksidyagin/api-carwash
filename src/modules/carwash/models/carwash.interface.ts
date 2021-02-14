import { Category } from "src/modules/category/models/category.interface";

export interface Carwash 
{
    id?: number;
    name?: string;
    address?: string;
    phone?: string;
    workTime_weekday?: string;
    workTime_weekend?: string;
    rating?: string;
    service_categories?: Category[];
}
