import {Outlet} from "react-router";
import {Box} from "@mui/material";
import NavBar from './components/NavBar.tsx';
import LoggedInAvatar from './components/LoggedInAvatar.tsx';

export default function Layout() {
    return (
        <Box
            sx={{
                width: "100%",
                height: "100dvh",
                display: "flex",
                flexDirection: "column",
                overflowY: "hidden",
            }}
        >
            {/* TOP BAR ROW */}
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between", // <-- left + right
                    px: 3,
                    py: 2,
                }}
            >
                <NavBar/>

                {/* Right Side */}
                <Box sx={{display: "flex", alignItems: "center", gap: 2}}>
                    <LoggedInAvatar/>
                </Box>
            </Box>

            {/* Page Content */}
            <Box sx={{flexGrow: 1, display: "flex", overflowY: "hidden"}}>
                <Outlet/>
            </Box>
        </Box>
    );
}
