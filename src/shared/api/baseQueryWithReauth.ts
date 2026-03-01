import { fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { AccessToken, authStorage } from '@/shared/lib/auth/authStorage';
import { getRouteLogout } from '../const/router';

const baseQuery = fetchBaseQuery({
    baseUrl: __API__,
    prepareHeaders: (headers) => {
        const token = authStorage.getAccessToken();
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

export const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && (result.error as FetchBaseQueryError).status === 401) {
        // Try to refresh token (refresh token is in httpOnly cookie)
        const refreshResult = await baseQuery(
            {
                url: '/users/refresh',
                method: 'POST',
                credentials: 'include', // Send httpOnly cookie
            },
            api,
            extraOptions,
        );

        if (refreshResult.data) {
            // Refresh successful - save new access token
            const { access_token } = refreshResult.data as { access_token: AccessToken };
            authStorage.set(access_token);

            // Retry original request
            result = await baseQuery(args, api, extraOptions);
        } else {
            // Refresh failed - clear storage and redirect
            authStorage.clear();
            window.location.href = getRouteLogout();
        }
    }

    return result;
};
