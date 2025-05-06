import { Loader } from "@io-cdc/ui"
import { Stack, Typography } from "@mui/material"
import { useCallback, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { APP_ROUTES } from "../../utils/appRoutes";
import { useLazyGetYearsListQuery } from "../../features/app/services";
import { ApiError } from "../../features/app/model";

const Home = () => {
    const navigate = useNavigate()
    const [getYearsList] = useLazyGetYearsListQuery()
    
    const loadConfig = useCallback(async () => {
        try {
            const { data, isError, isSuccess, error } = await getYearsList()
            if(isSuccess && data?.length > 0){
                return navigate(APP_ROUTES.SELECT_YEAR)
            }
            if(isError){
                throw new Error((error as ApiError)?.status.toString())
            }
        }
        catch (e) {
            navigate(APP_ROUTES.EXPIRED, {
                state: {
                    status: (e as {message: string}).message
                }
            })
        }
    }, [getYearsList, navigate])

    useEffect(() => {
        loadConfig()
    }, [loadConfig])

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