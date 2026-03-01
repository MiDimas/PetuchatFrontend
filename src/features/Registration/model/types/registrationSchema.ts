import { User } from "@/entities/User";
import { AccessToken } from "@/shared/lib/auth/authStorage";

export interface RegistrationSchema {
    isLoading: boolean;
    error?: string;
}

export interface RegistrationParams {
    name: string;
    password: string;
    email?: string;
}

export interface RegistrationResponse {
    access_token: AccessToken;
    user: User
}
