import {Box, Button, Chip, Stack, Typography, useTheme} from "@mui/material";
import FeatherIcon from "feather-icons-react";
import HomeCard from "../components/HomeCard";
import AIChat from "../components/AIChat";

export default function HomePage() {
    const theme = useTheme();
    const homeCardsData = [1, 2, 3];

    return (
        <Box
            sx={{
                px: 4,
                py: 6,
                backgroundColor: theme.palette.background.default,
                display: "flex",
                flexDirection: "column",
                gap: 4,
                width: "100%",
            }}
        >
            {/* Top Row: Summary + Log Meal */}
            <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <Stack spacing={1}>
                    <Typography variant="h5" sx={{color: theme.palette.primary.contrastText}}>
                        Your Meal Summary
                    </Typography>
                    <Chip
                        label="Last 7 days"
                        variant="outlined"
                        color="primary"
                        sx={{
                            borderRadius: "9999px",
                            px: 1.5,
                            py: 0.5,
                            fontSize: "0.85rem",
                            width: "fit-content",
                        }}
                    />
                </Stack>

                <Button
                    onClick={() => true}
                    sx={{
                        borderRadius: "999px",
                        textTransform: "none",
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        "&:hover": {backgroundColor: theme.palette.primary.dark},
                        px: 4,
                        height: 34,
                        fontWeight: 600,
                        fontSize: "0.9rem",
                    }}
                >
                    <FeatherIcon icon="plus" color={theme.palette.primary.contrastText}/>
                    Log Meal
                </Button>
            </Box>

            {/* Bottom Row: HomeCards + AIChat */}
            <Box
                sx={{
                    display: "flex",
                    gap: 4,
                    alignItems: "flex-start", // important!
                    minHeight: 500, // fixes ellipse
                }}
            >
                {/* Left: HomeCards */}
                <Box
                    sx={{
                        width: "40%",
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        maxHeight: "800px",          // 👈 SAME height as AIChat
                        overflowY: "auto",           // 👈 Scrollbar
                        pr: 1,                       // 👈 Little padding so scrollbar doesn't overlap cards
                    }}
                >
                    {homeCardsData.map((item) => (
                        <HomeCard key={item} item={item}/>
                    ))}
                </Box>

                {/* Right: AIChat */}
                <Box sx={{width: "60%", display: "flex", minHeight: "500px", maxHeight: "800px"}}>
                    <AIChat/>
                </Box>
            </Box>
        </Box>
    );
}
