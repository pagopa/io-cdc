import { Loader } from "@io-cdc/ui"
import { Stack, Typography } from "@mui/material"
import { useCallback, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { APP_ROUTES } from "../../utils/appRoutes";

const delay = (ms: number) => new Promise(
    resolve => setTimeout(resolve, ms));

const getRandomResponse = () => {
    return Math.random() < 0.2;
}
const getRandomError = () => {
    const codes = [500, 501];
    const index = Math.floor(Math.random() * codes.length);
    return codes[index];
}

const Home = () => {
    const navigate = useNavigate()


    const loadConfig = useCallback(async () => {
        try {
            await delay(2500)
            //NOTE -> DEMO ONLY
            const hasError = getRandomResponse()
            if(hasError){
                throw new Error("Something went wrong")
            }
            navigate(APP_ROUTES.SELECT_YEAR)
        }
        catch (e) {
            console.log(e)
            const errorCode = getRandomError()
            navigate(APP_ROUTES.EXPIRED, {
                state: {
                    status: errorCode
                }
            })
        }
    }, [navigate])

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