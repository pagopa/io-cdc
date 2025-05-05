import { Icon, IconType, OperationResult } from "@io-cdc/ui"
import { useCallback } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Box, Button, Stack } from "@mui/material"
import { APP_ROUTES } from "../../utils/appRoutes"

type FeedbackState = {
    status: keyof typeof configByStatus
}

const configByStatus: Record<number, {
    title: string,
    subTitle: string,
    icon: IconType
    description?: string
}> = {
    200: {
        title: "Fatto!",
        icon: "party",
        subTitle: "Riceverai un messaggio su IO con l'esito della tua richiesta.",
        description: "Per non perderti i messaggi in app, attiva le notifiche push da Impostazioni > Preferenze"
    },
    503: {
        icon: "umbrella",
        title: "Non riusciamo ad inviare la tua richiesta al momento",
        subTitle: "Riprova più tardi.",
    },
    500: {
        icon: "umbrella",
        title: "Qualcosa non ha funzionato",
        subTitle: "Riprova più tardi.",
    },

}

const Feedback = () => {
    const { state } = useLocation()
    const navigate = useNavigate()
    const { title, description, icon, subTitle } = configByStatus[(state as FeedbackState).status]

    const onClose = useCallback(() => {
        navigate(APP_ROUTES.HOME)
    }, [navigate])


    return <Stack flex={1} justifyContent="center" alignItems="center">
        {icon && <Icon name={icon} sx={{width: 60, height: 60}}/>}
        <OperationResult title={title} subTitle={subTitle} description={description} />
        <Box>
            <Button
                onClick={onClose}
                variant="contained"
            >
                Chiudi
            </Button>
        </Box>
    </Stack>

}

export default Feedback