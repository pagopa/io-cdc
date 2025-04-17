import Feedback from "../pages/Feedback"
import SelectYear from "../pages/SelectYear"

export enum APP_ROUTES {
    SELECT_YEAR = "/scelta-anno",
    FEEDBACK = "/esito"
}

export const APP_ROUTES_CONFIG = [
    {
        path: APP_ROUTES.SELECT_YEAR,
        Element: SelectYear
    },
    {
        path: APP_ROUTES.FEEDBACK,
        Element: Feedback
    }
]