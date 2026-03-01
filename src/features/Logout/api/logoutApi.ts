import { rtkApi } from "@/shared/api/rtkApi";
import { LogoutResponse } from "../model/types/logoutSchema";

const logoutApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        logout: build.query<LogoutResponse, void>({
            query: () => ({
                url: '/users/logout',
                method: 'GET'
            })
        })
    })
})

export const logoutQuery = logoutApi.endpoints.logout.initiate