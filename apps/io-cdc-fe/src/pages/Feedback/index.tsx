import { OperationResult } from "@io-cdc/ui"
import { useCallback, useMemo } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Box, Button, Stack } from "@mui/material"
import { APP_ROUTES } from "../../utils/appRoutes"

type FeedbackState = {
    status: keyof typeof configByStatus
}

const configByStatus = {
    200: {
        title: "Fatto!",
        subTitle: "Riceverai un messaggio su IO con l'esito della tua richiesta.",
        description: "Per non perderti i messaggi in app, attiva le notifiche push da Impostazioni > Preferenze"
    },
    503: {
        title: "Non riusciamo ad inviare la tua richiesta al momento",
        subTitle: "Riprova più tardi.",
    },
    500: {
        title: "Qualcosa non ha funzionato",
        subTitle: "Riprova più tardi.",
    },

}

const Feedback = () => {
    const { state } = useLocation()
    const navigate = useNavigate()
    const { title, description, subTitle } = useMemo(() => {
        return configByStatus[(state as FeedbackState).status]
    }, [state])

    const onClose = useCallback(() => {
        navigate(APP_ROUTES.SELECT_YEAR)
    }, [navigate])


    return <Stack flex={1} justifyContent="center" alignItems="center">
        <OperationResult title={title} description={subTitle} />
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