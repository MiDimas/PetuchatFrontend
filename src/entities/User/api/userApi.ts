import { rtkApi } from "@/shared/api/rtkApi";
import {User} from "..";
import {JsonSettings} from '../model/types/jsonSettings';

interface SetJsonSettingsArg {
    userId: string;
    jsonSettings: JsonSettings;
}

const userApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        setJsonSettings: build.mutation<User, SetJsonSettingsArg>({
            query: ({userId, jsonSettings}) => ({
                url: `/users/${userId}`,
                method: 'PATCH',
                body: {
                    jsonSettings,
                }
            })
        }),
        uploadUserDataInStorage: build.query<User, string>({
            query: (userId) => ({
                url: `/users/${userId}`,
                method: 'GET',
            })
        }),
        // Get current user by token
        fetchCurrentUser: build.query<User, void>({
            query: () => ({
                url: '/users/me',
                method: 'GET',
            })
        })
    })
})

export const setJsonSettingsMutation = userApi.endpoints.setJsonSettings.initiate;
export const uploadUserDataQuery = userApi.endpoints.uploadUserDataInStorage.initiate;
export const fetchCurrentUserQuery = userApi.endpoints.fetchCurrentUser.initiate;