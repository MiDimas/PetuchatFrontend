import { rtkApi } from '@/shared/api/rtkApi';
import { RegistrationParams, RegistrationResponse } from '../model/types/registrationSchema';

const registrationApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        register: build.mutation<RegistrationResponse, RegistrationParams>({
            query: (data) => ({
                url: '/users/registration',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const registerMutation = registrationApi.endpoints.register.initiate;
