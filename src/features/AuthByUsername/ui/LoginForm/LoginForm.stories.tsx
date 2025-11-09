import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import LoginForm from './LoginForm';

const meta: Meta<typeof LoginForm> = {
    title: 'features/LoginForm',
    component: LoginForm,
    argTypes: {},
};

export default meta;
type Story = StoryObj<typeof LoginForm>;

export const LoginFormLight: Story = {
    args: {},
    decorators: [
        StoreDecorator({
            loginForm: {
            },
        }),
    ],
};

export const LoginFormDark: Story = {
    args: {},
    decorators: [
        ThemeDecorator(Theme.DARK),
    ],
};
export const LoginFormError: Story = {
    args: {},
    decorators: [
        StoreDecorator({
            loginForm: {
                error: 'Ошибка ввода',
            },
        }),
    ],
};

export const LoginFormLoading: Story = {
    args: {},
    decorators: [
        StoreDecorator({
            loginForm: {
                isLoading: true,
            },
        }),
    ],
};
