import { getUserAuthData } from "@/entities/User";
import { createSelector } from "@reduxjs/toolkit";
import { FooterItemType } from "../types/footer";
import { getRouteMain } from "@/shared/const/router";
import MainIcon from '@/shared/assets/icons/Home.svg';

export const getFooterItems = createSelector(getUserAuthData, (authData) => {
    const sidebarItems: FooterItemType[] = [
        {
            path: getRouteMain(),
            Icon: MainIcon,
            text: 'Главная',
        }
    ];

    if (authData) {
        sidebarItems.push(
            // можно добавить ссылки на страницы с авторизацией
        );
    }
    return sidebarItems;
});