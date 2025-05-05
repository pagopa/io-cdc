import ExpiredInitiative from "../pages/ExpiredInitiative"
import Feedback from "../pages/Feedback"
import Home from "../pages/Home"
import SelectYear from "../pages/SelectYear"

export enum APP_ROUTES {
    HOME = "/",
    SELECT_YEAR = "/scelta-anno",
    FEEDBACK = "/esito",
    EXPIRED = "/iniziativa-scaduta"
}

export const APP_ROUTES_CONFIG = [
    {
        path: APP_ROUTES.HOME,
        Element: Home
    },
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