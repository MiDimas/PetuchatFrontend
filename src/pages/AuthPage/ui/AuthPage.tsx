import { LoginForm } from "@/features/AuthByUsername";
import { Page } from "@/widgets/Page"
import { memo } from "react"
const AuthPage = memo(() => {
    return (<Page>
        <div> Страница Авторизации</div>
        <LoginForm />
    </Page>)
})

export default AuthPage;