import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { User, userActions } from '@/entities/User';
import { authStorage } from '@/shared/lib/auth/authStorage';
import { registerMutation } from '../../api/registrationApi';
import { RegistrationParams } from '../types/registrationSchema';

export const registerUser = createAsyncThunk<User, RegistrationParams, ThunkConfig<string>>(
    'common/registerUser',
    async (registrationData, thunkAPI) => {
        const { rejectWithValue, dispatch } = thunkAPI;

        try {
            const response = await dispatch(
                registerMutation(registrationData),
            ).unwrap();

            if (!response.user || !response.access_token) {
                throw new Error('Invalid response');
            }

            const { user, access_token } = response;

            // Store token (expiration extracted from JWT automatically)
            authStorage.set(access_token);

            // Update Redux state with user data
            dispatch(userActions.setAuthData(user));

            return user;
        } catch {
            return rejectWithValue('Ошибка регистрации');
        }
    },
);
