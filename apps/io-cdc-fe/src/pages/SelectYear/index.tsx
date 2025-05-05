import { CheckboxList, Loader, SectionTitle } from "@io-cdc/ui"
import { Button, Stack, Typography } from "@mui/material"
import { useCallback, useState } from "react"
import { useNavigate } from "react-router-dom"
import { APP_ROUTES } from "../../utils/appRoutes";

const delay = (ms: number) => new Promise(
    resolve => setTimeout(resolve, ms));


const YEAR_OPTIONS = [
    {
        label: "2020",
        value: "2020"
    },
    {
        label: "2021",
        value: "2021",
        disabled: true
    },
    {
        label: "2022",
        value: "2022"
    },
    {
        label: "2023",
        value: "2023",
        disabled: true
    },
    {
        label: "2024",
        value: "2024",
        disabled: true
    },
    {
        label: "2025",
        value: "2025"
    },
    {
        label: "2026",
        value: "2026"
    },
    {
        label: "2027",
        value: "2027"
    },
    {
        label: "2028",
        value: "2028"
    },
    {
        label: "2029",
        value: "2029"
    },
    {
        label: "2030",
        value: "2030"
    }
]

const SelectYear = () => {
    const [isLoading, setIsLoading] = useState(false)
    const alredaySelected = YEAR_OPTIONS.filter(({disabled}) => disabled).map(({value}) => value)
    const [selectedItems, setSelectedItems] = useState<string[]>(alredaySelected)
    const navigate = useNavigate()

    const onSelectYear = useCallback((value: string[]) => {
        setSelectedItems(value)
    }, [])

    const onConfirm = useCallback(async () => {
        try {
            setIsLoading(true)
            await delay(2500)
            navigate(APP_ROUTES.FEEDBACK, {
                state: {
                    status: 200
                }
            })
        }
        catch (e) {
            console.log(e)
            navigate(APP_ROUTES.FEEDBACK, {
                state: {
                    status: "error"
                }
            })
        }
    }, [navigate])

    return isLoading ?
        <Stack flex={1} justifyContent="center" alignItems="center" rowGap={2}>
            <Loader />
            <Typography fontSize={22} fontWeight={700} textAlign="center">
                Stiamo inviando la tua richiesta
            </Typography>
        </Stack>

        : <Stack padding={2} flex={1} justifyContent="space-between" rowGap={2} overflow="hidden">
            <SectionTitle
                title="Per quale anno vuoi richiedere la Carta della Cultura?"
                description="Per ogni anno selezionato, assicurati che il tuo ISEE non superi i 15.000 € e che la tua residenza sia in Italia."
            />
            <Stack rowGap={2} flex={1} overflow="scroll">
                <CheckboxList
                    title="ANNO"
                    value={selectedItems}
                    multiple
                    buttonLabel="Seleziona tutti"
                    onChange={onSelectYear}
                    options={YEAR_OPTIONS}
                    disableSelectAll={selectedItems.length >= YEAR_OPTIONS.length - 1}
                />
            </Stack>
            <Button
                onClick={onConfirm}
                disabled={selectedItems.length <= alredaySelected.length }
                size="small"
                variant="contained"
            >
                Continua
            </Button>
        </Stack>
}

export default SelectYear