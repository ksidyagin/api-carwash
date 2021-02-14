
export interface User {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    phone?: string;
    city?: string; 
    role?: UserRole;
    visits?: number;
}

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
    EXECUTOR = 'executor',
    MANAGER = 'manager'
}