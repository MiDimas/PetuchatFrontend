import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Page } from '@/widgets/Page';
import { RegistrationForm } from '@/features/Registration';
import { getRouteMain } from '@/shared/const/router';

const RegistrationPage = memo(() => {
    const navigate = useNavigate();

    const onSuccess = () => {
        navigate(getRouteMain());
    };

    return (
        <Page>
            <RegistrationForm onSuccess={onSuccess} />
        </Page>
    );
});

export default RegistrationPage;
