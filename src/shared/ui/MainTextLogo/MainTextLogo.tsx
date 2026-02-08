import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./MainTextLogo.module.scss";

type MainTextLogoSizesType = 'm' | 'l' | 'xl';

interface MainTextLogoProps {
    className?: string;
    size?: MainTextLogoSizesType;
}

const mapSizeToClass: Record<MainTextLogoSizesType, string> = {
    m : cls.m,
    l : cls.l,
    xl : cls.xl,
}

export const MainTextLogo = (props: MainTextLogoProps) => {

    const {className, size="xl"} = props;



    const mainClassses = classNames(cls.Logo, {}, [mapSizeToClass[size], className])

    return <div className={mainClassses}>
        YES.
    </div>
}