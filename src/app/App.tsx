import {Suspense, useCallback, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { AppRouter } from './providers/router';
import './styles/index.scss';
import {MainLayout} from "@/shared/layouts/MainLayout";
import { Footer } from '@/widgets/Footer';
import { getUserInitial, loadUserData } from '@/entities/User';

function App() {
    const { theme } = useTheme();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const isInitial = useSelector(getUserInitial);

    // Initialize user data on app load
    useEffect(() => {
        dispatch(loadUserData());
    }, [dispatch]);

    
    // Навешивание темы на body
    const themeBody = useCallback((className:string = 'app') => {
        document.body.className = classNames(className, {}, [theme]);
    }, [theme]);
    useEffect(() => {
        themeBody();
    }, [themeBody]);
    
    // если авторизация еще не проверена
    if (!isInitial) {
        return <div>Loading...</div>;
    }

    // Пути, на которых не показываем футер
    const noFooterPaths = ['/forbidden', '/auth', '/start'];
    const shouldShowFooter = isInitial && !noFooterPaths.includes(location.pathname) && location.pathname !== '*';


    return (
        <Suspense fallback="">
            <MainLayout
                content={<AppRouter />}
                footer={shouldShowFooter ? <Footer/> : undefined}
            />
        </Suspense>
    );
}

export default App;
