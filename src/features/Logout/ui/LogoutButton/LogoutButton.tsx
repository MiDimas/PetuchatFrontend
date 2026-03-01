import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button } from '@/shared/ui/Button';
import { logoutUser } from '../../model/services/logoutUser';
import { getRouteStart } from '@/shared/const/router';

interface LogoutButtonProps {
    className?: string;
}

export const LogoutButton = memo(({ className }: LogoutButtonProps) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = useCallback(async () => {
        await dispatch(logoutUser());
        navigate(getRouteStart());
    }, [dispatch, navigate]);

    return (
        <Button onClick={handleLogout} className={className}>
            {t('Выйти')}
        </Button>
    );
});
