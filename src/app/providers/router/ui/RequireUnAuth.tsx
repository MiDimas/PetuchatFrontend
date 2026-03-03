import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { getUserAuthData } from '@/entities/User';
import { getRouteMain} from '@/shared/const/router';

interface RequireUnAuthProps {
    children: React.JSX.Element;
}

export function RequireUnAuth({ children}: RequireUnAuthProps) {
    const auth = useSelector(getUserAuthData);
    const location = useLocation();

    if (auth) {
        const from = location.state?.from?.pathname || getRouteMain();
        return <Navigate to={from} state={{ from: location }} replace />;
    }

    return children;
}
