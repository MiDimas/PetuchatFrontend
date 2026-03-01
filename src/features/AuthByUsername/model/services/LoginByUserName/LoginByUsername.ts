import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { User, userActions } from '@/entities/User';
import { authStorage } from '@/shared/lib/auth/authStorage';
import { loginByUsernameMutation } from '../../../api/loginApi';

interface LoginByUsernameProps {
    username: string;
    password: string;
}

export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps, ThunkConfig<string>>(
    'common/loginByUserame',
    async (authData, thunkAPI) => {
        const { rejectWithValue, dispatch } = thunkAPI;
        try {
            const response = await dispatch(loginByUsernameMutation(
                { name: authData.username, password: authData.password },
            ));

            if (!response.data) {
                throw new Error();
            }
            if (!response.data.user) {
                throw new Error();
            }
            if (!response.data.access_token) {
                throw new Error();
            }

            const { user, access_token } = response.data;

            // Store token (expiration extracted from JWT automatically)
            authStorage.set(access_token);

            // Update Redux state with user data
            dispatch(userActions.setAuthData(user));

            return user;
        } catch {
            return rejectWithValue('Неправильный логин или пароль');
        }
    },
);
