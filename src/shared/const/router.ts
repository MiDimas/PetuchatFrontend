export enum AppRoutes {
    MAIN = 'main',
    START = 'start',
    // ADMIN_PANEL = 'admin_panel',
    AUTH = 'auth',
    FORBIDDEN = 'forbidden',
    NOT_FOUND = 'not_found',
}

export const getRouteMain = () => '/';
export const getRouteStart = () => "/start";
export const getAuthPage = () => '/auth';
export const getRouteForbidden = () => '/forbidden';
