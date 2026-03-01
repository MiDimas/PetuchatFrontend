import { memo, useCallback, useState, ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { registerUser } from '../../model/services/registerUser';
import cls from './RegistrationForm.module.scss';

interface RegistrationFormProps {
    className?: string;
    onSuccess?: () => void;
}

export const RegistrationForm = memo(({ className, onSuccess }: RegistrationFormProps) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const onChangeUsername = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    }, []);

    const onChangePassword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }, []);

    const onChangeConfirmPassword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    }, []);

    const onRegisterClick = useCallback(async () => {
        if (!username || !password) {
            setError(t('Заполните все поля'));
            return;
        }

        if (password !== confirmPassword) {
            setError(t('Пароли не совпадают'));
            return;
        }

        setIsLoading(true);
        setError(null);

        const result = await dispatch(registerUser({
            name: username,
            password,
        }));

        setIsLoading(false);

        if (result.meta.requestStatus === 'fulfilled') {
            onSuccess?.();
        } else {
            setError(t('Ошибка регистрации'));
        }
    }, [dispatch, username, password, confirmPassword, onSuccess, t]);

    return (
        <div className={classNames(cls.RegistrationForm, {}, [className])}>
            <span title={t('Форма регистрации')} />
            {error && (
                <span className={cls.error}>{error}</span>
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
            <input
                className={cls.input}
                type="password"
                placeholder={t('Подтвердите пароль')}
                onChange={onChangeConfirmPassword}
                value={confirmPassword}
            />
            <button onClick={onRegisterClick} disabled={isLoading} className={cls.btn}>
                {isLoading ? t('Загрузка...') : t('Зарегистрироваться')}
            </button>
        </div>
    );
});
