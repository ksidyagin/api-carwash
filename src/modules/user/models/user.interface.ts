import { Client } from "src/modules/client/models/client.interface";

export interface User {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    phone?: string;
    city?: string; 
    role?: UserRole;
    client_entry?: Client;
}

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
    EXECUTOR = 'executor',
    MANAGER = 'manager'
}