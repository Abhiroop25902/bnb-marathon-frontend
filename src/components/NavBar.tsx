import {type SyntheticEvent, useEffect, useState} from "react";
import {Box, Paper, Tab, Tabs, useTheme} from "@mui/material";
import {useLocation, useNavigate} from "react-router";
import LoginIcon from "./LoginIcon.tsx";

const pathToTab: Record<string, string> = {
    "/today": "today",
    "/history": "history",
    "/profile": "profile",
};

const NavBar = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();

    const [activeTab, setActiveTab] = useState("today");

    // Sync URL → tab
    useEffect(() => {
        const current = pathToTab[location.pathname] || "today";
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setActiveTab(current);
    }, [location.pathname]);

    // Handle tab click → navigate
    const handleChange = (_: SyntheticEvent, newValue: string) => {
        setActiveTab(newValue);

        if (newValue === "today") navigate("/");
        if (newValue === "history") navigate("/history");
        if (newValue === "profile") navigate("/profile");
    };

    return (
        <Box
            sx={{
                width: "100%",
                py: 2,
                px: 3,
                backgroundColor: theme.palette.background.default,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Paper
                    elevation={1}
                    sx={{
                        px: 1,
                        py: 0.5,
                        borderRadius: theme.shape.borderRadius,
                        backgroundColor: theme.palette.background.paper,
                        border: `1px solid ${theme.palette.primary.main}40`, // subtle border
                    }}
                >
                    <Tabs
                        value={activeTab}
                        onChange={handleChange}
                        sx={{
                            "& .MuiTabs-indicator": {
                                display: "none",
                            },
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            "& .MuiTab-root": {
                                textTransform: "none",
                                borderRadius: Number(theme.shape.borderRadius) / 2,
                                minHeight: 42,
                                px: 3,
                                mx: 0.2,
                                fontWeight: 500,
                                color: theme.palette.primary.contrastText,
                            },
                            "& .Mui-selected": {
                                backgroundColor: theme.palette.primary.main + "55", // semi-transparent
                                color: theme.palette.primary.contrastText,
                            },
                        }}
                    >
                        <Tab value="today" label="Today"/>
                        <Tab value="history" label="History"/>
                        <Tab value="profile" label="Profile"/>
                    </Tabs>
                </Paper>

                <LoginIcon/>
            </Box>
        </Box>
    );
};

export default NavBar;
