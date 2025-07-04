import { rtkApi } from "@/shared/api/rtkApi";

interface LoginByUsernameProps {
    name: string;
    password: string;
}

const loginApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<any, LoginByUsernameProps>({
            query: (authData) => ({
                url: '/users/login',
                method: 'POST',
                body: authData,
            }),
        }),
    }),
});

export const loginByUsernameMutation = loginApi.endpoints.login.initiate;