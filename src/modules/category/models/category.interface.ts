import { Carwash } from "src/modules/carwash/models/carwash.interface";
import { Service } from "src/modules/service/models/service.interface";

export interface Category {
    id: number;
    name: string;
    services: Service[];
    carwash: Carwash;
}