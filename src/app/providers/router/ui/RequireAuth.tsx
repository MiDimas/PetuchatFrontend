import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { getUserAuthData, getUserRoles, UserRole } from '@/entities/User';
import { getRouteForbidden, getRouteStart } from '@/shared/const/router';

interface RequireAuthProps {
    children: React.JSX.Element;
    roles?: UserRole[];
}

export function RequireAuth({ children, roles }: RequireAuthProps) {
    const auth = useSelector(getUserAuthData);
    const location = useLocation();
    const userRoles = useSelector(getUserRoles);
    const hasRequireRoles = useMemo(() => {
        if (!roles) {
            return true;
        }
        return roles.some((value) => userRoles?.includes(value));
    }, [roles, userRoles]);

    if (!auth) {
        return <Navigate to={getRouteStart()} state={{ from: location }} replace />;
    }

    if (!hasRequireRoles) {
        return <Navigate to={getRouteForbidden()} state={{ from: location }} replace />;
    }

    return children;
}
