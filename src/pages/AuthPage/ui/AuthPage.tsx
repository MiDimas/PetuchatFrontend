import { LoginForm } from "@/features/AuthByUsername";
import { Page } from "@/widgets/Page"
import { memo, useCallback } from "react"
import cls from './AuthPage.module.scss'
import { useNavigate, useLocation } from "react-router-dom";
import { getRouteMain } from "@/shared/const/router";
const AuthPage = memo(() => {
    const navigate = useNavigate();
    const location = useLocation();

    const onSuccess = useCallback(() => {
        const from = location.state?.from?.pathname || getRouteMain();
        navigate(from, {replace: true})
    }, [navigate, location])

    return (<Page className={cls.page}>
        <div> Страница Авторизации</div>
        <LoginForm onSuccess={onSuccess}/>
    </Page>)
})

export default AuthPage;