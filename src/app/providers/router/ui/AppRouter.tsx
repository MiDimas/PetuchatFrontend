import { memo, Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppRoutesProps } from '@/shared/types/router/router';
// import { PageLoader } from '@/widgets/PageLoader';
import { routeConfig } from '../config/routeConfig';
import { RequireAuth } from './RequireAuth';
import { RequireUnAuth } from './RequireUnAuth';

const AppRouter = () => {
    const renderWithWrapper = useCallback((route: AppRoutesProps) => {
        const element = <Suspense fallback={<div>Loading...</div>}>{route.element}</Suspense>;

        return (
            <Route
                key={route.path}
                path={route.path}
                element={
                    route.authOnly || route.roles ? (
                        <RequireAuth roles={route.roles}>{element}</RequireAuth>
                    ) : (
                        route.unauthOnly 
                        ? (<RequireUnAuth>{element}</RequireUnAuth>)
                        : element
                    )
                }
            />
        );
    }, []);
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>{Object.values(routeConfig).map((route) => renderWithWrapper(route))}</Routes>
        </Suspense>
    );
};

export default memo(AppRouter);
