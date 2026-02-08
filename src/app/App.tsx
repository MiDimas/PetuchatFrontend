import {Suspense, useCallback, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { AppRouter } from './providers/router';
import './styles/index.scss';
// import {ToggleFeatures, toggleFeatures} from "@/shared/lib/features";
import {MainLayout} from "@/shared/layouts/MainLayout";
import { Footer } from '@/widgets/Footer';

function App() {
    const { theme } = useTheme();
    const location = useLocation();


    // Навешивание темы на body
    const themeBody = useCallback((className:string = 'app') => {
        document.body.className = classNames(className, {}, [theme]);
    }, [theme]);
    useEffect(() => {
        themeBody();
    }, [themeBody]);

    // Пути, на которых не показываем футер
    const noFooterPaths = ['/forbidden', '/auth', '/start'];
    const shouldShowFooter = !noFooterPaths.includes(location.pathname) && location.pathname !== '*';


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
