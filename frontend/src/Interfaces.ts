export interface Category {
    id: string;
    name: string;
}

export interface Subscription {
    id: string;
    name: string;
    price: number;
    created?: Date;
    endsAt?: Date;
    categoryId?: string;
}

export interface SubscriptionDto {
    id: string;
    name: string;
    price: number;
    created: string;
    endsAt: string;
    categoryId?: string;
}

export interface SubscriptionForCreateDto {
    name: string;
    price: number;
    created?: Date;
    endsAt?: Date;
    categoryId?: string;
}

export interface SubscriptionForEditDto {
    name: string;
    price: number;
    created?: string;
    endsAt?: string;
    categoryId?: string;
}

export interface UserForLoginDto {
    username: string;
    password: string;
}

export interface UserForRegisterDto {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}