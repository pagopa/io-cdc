import { Loader } from "@io-cdc/ui"
import { Stack, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useGetYearsListQuery } from "../../features/app/services";
import { useEffect } from "react";
import { APP_ROUTES } from "../../utils/appRoutes";
import { ApiError } from "../../features/app/model";

const Home = () => {
    
    const { isError, isSuccess, error,} = useGetYearsListQuery()
    const navigate = useNavigate()
    const hasCompleted = isSuccess || isError


    useEffect(() => {
        if (hasCompleted) {
            if (isSuccess) {
                navigate(APP_ROUTES.SELECT_YEAR)
            }
            if (isError && error) {
                navigate(APP_ROUTES.EXPIRED, {
                    state: {
                        status: (error as ApiError).status
                    }
                })
            }
        }
    }, [error, hasCompleted, isError, isSuccess, navigate])


    return <Stack flex={1} justifyContent="center" alignItems="center" rowGap={2}>
        <Loader />
        <Typography fontSize={22} fontWeight={700} textAlign="center">
            Ti stiamo indirizzando al servizio
        </Typography>
        <Typography textAlign="center">
            Attendi qualche secondo
        </Typography>
    </Stack>
}

export default Home