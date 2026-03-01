export enum AppRoutes {
    MAIN = 'main',
    START = 'start',
    // ADMIN_PANEL = 'admin_panel',
    AUTH = 'auth',
    REGISTRATION = 'registration',
    LOGOUT = 'logout',
    FORBIDDEN = 'forbidden',
    NOT_FOUND = 'not_found',
}

export const getRouteMain = () => '/';
export const getRouteStart = () => "/start";
export const getAuthPage = () => '/auth';
export const getRouteRegistration = () => '/registration';
export const getRouteLogout = () => '/logout';
export const getRouteForbidden = () => '/forbidden';
