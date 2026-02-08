import { ForbiddenPage } from '@/pages/ForbiddenPage';
import { MainPage } from '@/pages/MainPage';
import { AuthPage } from '@/pages/AuthPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

import {
    AppRoutes,
    getRouteForbidden,
    getRouteMain,
    getAuthPage,
    getRouteStart,
} from '@/shared/const/router';
import { AppRoutesProps } from '@/shared/types/router/router';
import { StartPage } from '@/pages/StartPage';

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: getRouteMain(),
        element: <MainPage />,
        authOnly: true,

    },
    [AppRoutes.START]: {
        path: getRouteStart(),
        element: <StartPage />,

    },
    // [AppRoutes.ADMIN_PANEL]: {
    //     path: getRouteAdmin(),
    //     element: <AdminPanelPage />,
    //     authOnly: true,
    //     roles: [UserRole.ADMIN, UserRole.MANAGER],
    // },
    [AppRoutes.AUTH]: {
        path: getAuthPage(),
        element: <AuthPage />,

    },
    [AppRoutes.FORBIDDEN]: {
        path: getRouteForbidden(),
        element: <ForbiddenPage />,

    },
    [AppRoutes.NOT_FOUND]: {
        path: '*',
        element: <NotFoundPage />,

    },
};
