import React from "react";

const ExpiredInitiative = React.lazy(() => import('../pages/ExpiredInitiative'));
const Feedback = React.lazy(() => import('../pages/Feedback'));
const SelectYear = React.lazy(() => import('../pages/SelectYear'));

export enum APP_ROUTES {
    HOME = "/",
    SELECT_YEAR = "/scelta-anno",
    FEEDBACK = "/esito",
    EXPIRED = "/iniziativa-scaduta"
}

export const APP_ROUTES_CONFIG = [
    {
        path: APP_ROUTES.SELECT_YEAR,
        Element: SelectYear
    },
    {
        path: APP_ROUTES.FEEDBACK,
        Element: Feedback
    },
    {
        path: APP_ROUTES.EXPIRED,
        Element: ExpiredInitiative
    }
]