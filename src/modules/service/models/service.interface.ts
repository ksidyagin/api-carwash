import { Category } from "src/modules/category/models/category.interface";

export interface Service {
    id?:  number;
    description?:  string;
    price?: number;
    category?: Category;

}