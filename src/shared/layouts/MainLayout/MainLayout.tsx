import {ReactElement} from "react";
import cls from './MainLayout.module.scss'
import {classNames} from "@/shared/lib/classNames/classNames";

interface MainLayoutProps {
    className?: string;
    content: ReactElement;
    footer: ReactElement;

}
export const MainLayout = (props: MainLayoutProps) => {
    const { className,
        content,
        footer} = props;
    return (
        <div className={classNames(cls.MainLayout, {}, [className])}>
            <div className={cls.content}>{content}</div>
            <div className={cls.footer}>{footer}</div>
        </div>
    );
}

export default MainLayout;