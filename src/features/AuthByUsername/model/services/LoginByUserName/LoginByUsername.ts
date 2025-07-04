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
            if (!response.data.id){
                throw new Error();
            }

            localStorage.setItem(USER_LOCALSTORAGE_KEY, response.data.id);

            dispatch(userActions.setAuthData(response.data));
            return response.data;
        } catch {
            return rejectWithValue('error');
        }
    },
);
