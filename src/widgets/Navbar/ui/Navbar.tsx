import { memo } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { getUserAuthData } from '@/entities/User';
import { LogoutButton } from '@/features/Logout';
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const authData = useSelector(getUserAuthData);

    return (
        <header className={classNames(cls.Navbar, {}, [className])}>
            {authData && (
                <LogoutButton className={cls.links} />
            )}
        </header>
    );
});
