import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';
import { MainTextLogo } from '@/shared/ui/MainTextLogo';
import cls from "./StartPage.module.scss";
import { Button } from '@/shared/ui/Button';
import { Link } from 'react-router-dom';
import { getRouteRegistration } from '@/shared/const/router';



const StartPage = memo(() => {
    const { t } = useTranslation('main');

    return (
        <Page data-testid="MainPage" className={cls.Page}>
            <MainTextLogo className={cls.logo}/>
            <div className={cls.bottomBlock}>
                <Button linkTo='/auth'>{t("стартуем")}</Button>
                <div className={cls.regBlock}>
                    <span>
                        {t("Не являетесь участником?")}
                    </span>
                    <Link className={cls.link} to={getRouteRegistration()}>{t("Регистрация")}</Link>
                </div>
            </div>
        </Page>
    );
});

export default StartPage;
