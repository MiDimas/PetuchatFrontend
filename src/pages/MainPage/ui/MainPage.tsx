import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';
import { Counter } from '@/entities/Counter';
// import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
// import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
// import { loginByUsername } from '@/features/AuthByUsername';


const MainPage = memo(() => {
    const { t } = useTranslation('main');
    // const dispatch = useAppDispatch();

    // useInitialEffect(() => {
    //     dispatch(loginByUsername({username: 'kolobochek', password: 'Kolobok123'}))
    // })
    return (
        <Page data-testid="MainPage">
            {t('Главная Страница')}
            <Counter />
        </Page>
    );
});

export default MainPage;
