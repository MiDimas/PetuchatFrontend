import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { User, userActions } from '@/entities/User';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
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
                {name: authData.username, password: authData.password}
            ));
            console.log(response);
            if (!response.data) {
                throw new Error();
            }
            if (!response.data.user){
                throw new Error();
            }
            if (!response.data.access_token){
                throw new Error();
            }

            const user = response.data.user;
            const access_token = response.data.access_token;

            // localStorage.setItem(USER_LOCALSTORAGE_KEY, user.id);
            // Пока оставлен токен в качестве пользователя
            localStorage.setItem(USER_LOCALSTORAGE_KEY, access_token.token);
            
            dispatch(userActions.setAuthData(user));
            return user;
        } catch {
            return rejectWithValue('error');
        }
    },
);
