import SelectYear from "../pages/SelectYear"

export enum APP_ROUTES {
    SELECT_YEAR = "scelta-anno"
}

export const APP_ROUTES_CONFIG = [
    {
        path: APP_ROUTES.SELECT_YEAR,
        Element: SelectYear
    }
]