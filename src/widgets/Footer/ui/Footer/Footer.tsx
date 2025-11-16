import { classNames } from "@/shared/lib/classNames/classNames"
import cls from "./Footer.module.scss"
import { useSelector } from "react-redux"
import { getFooterItems } from "../../model/selectors/getFooterItems"
import { FooterItem } from "../FooterItem/FooterItem"


export const Footer = () => {

    const footerItemList = useSelector(getFooterItems);

    return <div className={classNames(cls.footer)} role="navigation">
            {footerItemList.map((item) => (
                <FooterItem key={item.path} item={item}/>
            ))}

    </div>
}