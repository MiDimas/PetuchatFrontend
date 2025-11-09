import { User } from "@/entities/User";

export interface LoginSchema {
    isLoading: boolean;
    error?: string;
}

export interface LoginResponse {
    access_token: {
        token: string;
        expired: string;
        issued: string;
    }
    user: User;
}