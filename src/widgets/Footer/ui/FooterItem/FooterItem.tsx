import { useSelector } from "react-redux";
import { FooterItemType } from "../../model/types/footer"
import { getUserAuthData } from "@/entities/User";
import { NavLink } from "react-router-dom";
import cls from './FooterItem.module.scss'
import { memo } from "react";

interface FooterItemProps {
    item: FooterItemType;
}

export const FooterItem = memo((props:FooterItemProps) => {
    const {item} = props
    const auth = useSelector(getUserAuthData);
    if (item.authOnly && !auth) {
        return null;
    }

    const {Icon, text, path}  = item;
    return <NavLink to={path} className={cls.block}>
        <Icon className={cls.icon}/>
        <span className={cls.desc}>{text}</span>
    </NavLink>
})