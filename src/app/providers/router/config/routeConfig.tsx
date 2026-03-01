import { ForbiddenPage } from '@/pages/ForbiddenPage';
import { MainPage } from '@/pages/MainPage';
import { AuthPage } from '@/pages/AuthPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { RegistrationPage } from '@/pages/RegistrationPage';

import {
    AppRoutes,
    getRouteForbidden,
    getRouteMain,
    getAuthPage,
    getRouteStart,
    getRouteRegistration,
    getRouteLogout,
} from '@/shared/const/router';
import { AppRoutesProps } from '@/shared/types/router/router';
import { StartPage } from '@/pages/StartPage';
import { LogoutPage } from '@/pages/LogoutPage';

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
    [AppRoutes.REGISTRATION]: {
        path: getRouteRegistration(),
        element: <RegistrationPage />,

    },
    [AppRoutes.LOGOUT]: {
        path: getRouteLogout(),
        element: <LogoutPage />
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
