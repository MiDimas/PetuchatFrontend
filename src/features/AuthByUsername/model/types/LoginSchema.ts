import { User } from "@/entities/User";
import { AccessToken } from "@/shared/lib/auth/authStorage";

export interface LoginSchema {
    isLoading: boolean;
    error?: string;
}

export interface LoginResponse {
    access_token: AccessToken;
    user: User;
}