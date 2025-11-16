import {Suspense, useCallback, useEffect} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { AppRouter } from './providers/router';
import './styles/index.scss';
// import {ToggleFeatures, toggleFeatures} from "@/shared/lib/features";
import {MainLayout} from "@/shared/layouts/MainLayout";

function App() {
    const { theme } = useTheme();


    // Навешивание темы на body
    const themeBody = useCallback((className:string = 'app') => {
        document.body.className = classNames(className, {}, [theme]);
    }, [theme]);
    useEffect(() => {
        themeBody();
    }, [themeBody]);


    return (
        <Suspense fallback="">
            <MainLayout
            content={<AppRouter />}
            footer={<div></div>}
            />
        </Suspense>
    );
}

export default App;
