const AUTH_STORAGE_KEY = 'petu_auth_data';

export interface AccessToken {
    token: string;
    expired: number;
    issued?: number;
}


export interface StoredAuthData {
    accessToken: string;
    accessTokenExpired: string;
}

export const authStorage = {
    get(): StoredAuthData | null {
        try {
            const data = localStorage.getItem(AUTH_STORAGE_KEY);
            return data ? JSON.parse(data) : null;
        } catch {
            return null;
        }
    },

    set(accessToken: AccessToken): void {
        const expDate = new Date(accessToken.expired)
        localStorage.setItem(
            AUTH_STORAGE_KEY,
            JSON.stringify({
                accessToken:accessToken.token,
                accessTokenExpired: expDate,
            }),
        );
    },

    clear(): void {
        localStorage.removeItem(AUTH_STORAGE_KEY);
    },

    getAccessToken(): string | null {
        return this.get()?.accessToken || null;
    },

    isAccessTokenExpired(): boolean {
        const data = this.get();
        if (!data) return true;
        return new Date(data.accessTokenExpired) < new Date();
    },
};
