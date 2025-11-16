import { memo, useCallback, ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { loginByUsername } from '../../model/services/LoginByUserName/LoginByUsername';
import { loginReducer } from '../../model/slice/loginSlice';
import cls from './LoginForm.module.scss';

export interface LoginFormProps {
    className?: string;
    onSuccess?: () => void;
}

const initialReducers: ReducersList = {
    loginForm: loginReducer,
};

const LoginForm = memo((props: LoginFormProps) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getLoginIsLoading);
    const error = useSelector(getLoginError);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { className, onSuccess } = props;

    const onChangeUsername = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value
            setUsername(value);
        },
        [setUsername],
    );
    const onChangePassword = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value
            setPassword(value);
        },
        [setPassword],
    );
    const onLoginClick = useCallback(async () => {
        const result = await dispatch(
            loginByUsername({
                username,
                password,
            }),
        );
        if (result.meta.requestStatus === 'fulfilled') {
            onSuccess?.();
        }
    }, [onSuccess, dispatch, username, password]);

    return (
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
            <div className={classNames(cls.LoginForm, {}, [className])}>
                <span title={t('Форма авторизации')} />
                {error && (
                    <span>{t('Неправильный логин или пароль')}</span>
                )}
                <input
                    className={cls.input}
                    type="text"
                    placeholder={t('Логин')}
                    autoFocus
                    onChange={onChangeUsername}
                    value={username}
                />
                <input
                    className={cls.input}
                    type="password"
                    placeholder={t('Пароль')}
                    onChange={onChangePassword}
                    value={password}
                />
                <button onClick={onLoginClick} disabled={isLoading} className={cls.btn}>
                    {t('Войти')}
                </button>
            </div>
        </DynamicModuleLoader>
    );
});

export default LoginForm;
