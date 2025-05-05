import { Outlet } from "react-router-dom";
import { Stack } from "@mui/material"

export const Layout = () => {
    return <Stack height="100vh">
        <Outlet />
    </Stack>
}