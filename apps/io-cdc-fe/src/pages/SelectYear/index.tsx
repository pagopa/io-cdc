import { CheckboxList, SectionTitle } from "@io-cdc/ui"
import { Button, Stack } from "@mui/material"
import { useCallback, useState } from "react"


const YEAR_OPTIONS = [
    {
        label: "2020",
        value: "2020"
    },
    {
        label: "2021",
        value: "2021"
    },
    {
        label: "2022",
        value: "2022"
    },
    {
        label: "2023",
        value: "2023"
    },
    {
        label: "2024",
        value: "2024"
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

    const [selectedItems, setSelectedItems] = useState<string[]>([])

    const onSelectYear = useCallback((value: string[]) => {
        setSelectedItems(value)
    }, [])

    return <Stack padding={2} flex={1} justifyContent="space-between" rowGap={2} overflow="hidden">
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
            />
        </Stack>
        <Button
            onClick={() => { }}
            size="small"
            variant="contained"
        >
            Continua
        </Button>
    </Stack>
}

export default SelectYear