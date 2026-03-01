import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { userActions } from '@/entities/User';
import { authStorage } from '@/shared/lib/auth/authStorage';
import { logoutQuery } from '../../api/logoutApi';

export const logoutUser = createAsyncThunk<void, void, ThunkConfig<string>>(
    'user/logout',
    async (_, thunkAPI) => {
        const { dispatch } = thunkAPI;

        try {
            // Очистка access токена
            authStorage.clear();

            // Запрос на удаление рефреш токена
            const response = await dispatch(logoutQuery()).unwrap()
            if (response.message) {
                console.log('Успешный выход из аккаунта')
            }
            // Очистка пользователя в сторе
            dispatch(userActions.logout());
        } catch {
            // Even if something fails, ensure local cleanup
            authStorage.clear();
            dispatch(userActions.logout());
            return thunkAPI.rejectWithValue('Logout failed');
        }
    },
);
