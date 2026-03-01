import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { User } from '../types/User';
import { fetchCurrentUserQuery } from '../../api/userApi';
import { authStorage } from '@/shared/lib/auth/authStorage';

export const loadUserData = createAsyncThunk<User | null, undefined, ThunkConfig<string>>(
    'user/loadUserData',
    async (_, thunkAPI) => {
        const { rejectWithValue, dispatch } = thunkAPI;

        // Check if token exists
        const token = authStorage.getAccessToken();
        console.log(token)
        if (!token) {
            return null;
        }

        // Check if token is expired
        if (authStorage.isAccessTokenExpired()) {
            console.log('Tokenexpirred')
            authStorage.clear();
            return null;
        }

        try {
            console.log('Send requeset fetchcurrent user')
            const response = await dispatch(fetchCurrentUserQuery()).unwrap();
            console.log(response)
            return response;
        } catch (e) {
            console.log('error', e)
            // Token might be invalid on server
            authStorage.clear();
            return rejectWithValue('Не удалось загрузить данные пользователя');
        }
    },
);
