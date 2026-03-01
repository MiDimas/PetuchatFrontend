import { useEffect } from "react";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "@/features/Logout";
import { getRouteStart } from "@/shared/const/router";



const LogoutPage = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()



    useEffect(() => {
        const logout = async () => {
            await dispatch(logoutUser());
            navigate(getRouteStart());
        }
        logout();
    }, [dispatch, navigate])


    return <div>
        Выполняется выход из аккаунта
    </div>
}

export default LogoutPage