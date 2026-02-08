import { classNames } from "@/shared/lib/classNames/classNames";
import { ButtonHTMLAttributes, MouseEvent, useCallback } from "react";
import cls from "./Button.module.scss";
import { useNavigate } from "react-router-dom";



interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    linkTo?: string;
}


export const Button = (props: ButtonProps) => {
    const {className, linkTo, onClick, disabled, ...other} = props;
    const navigate = useNavigate();

    const mainCls = classNames(cls.Btn, {[cls.disabled]: disabled}, [className]);

    const handleClick = useCallback( (event:MouseEvent<HTMLButtonElement>) => {
        if (linkTo) {
            navigate(linkTo)
        }
        else if (onClick) {
            onClick(event)
        }
    }, [onClick, linkTo])
    
    

    return <button className={mainCls} onClick={handleClick} disabled={disabled} {...other}/>

}