import { classNames } from "@/shared/lib/classNames/classNames"
import cls from "./Footer.module.scss"
import { useSelector } from "react-redux"
import { getFooterItems } from "../model/selectors/getFooterItems"


export const Footer = () => {

    const footerItemList = useSelector(getFooterItems);

    return <div className={classNames(cls.footer)} role="navigation">
            {footerItemList.map((item) => (
                <div key={item.path}>{item.text}</div>
            ))}

    </div>
}