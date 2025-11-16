import { LoginForm } from "@/features/AuthByUsername";
import { Page } from "@/widgets/Page"
import { memo } from "react"
import cls from './AuthPage.module.scss'
const AuthPage = memo(() => {
    return (<Page className={cls.page}>
        <div> Страница Авторизации</div>
        <LoginForm />
    </Page>)
})

export default AuthPage;