import { Box, Button, Dialog, Stack, Typography, useTheme } from '@mui/material';
import FeatherIcon from 'feather-icons-react';
import HomeCard from '../components/HomeCard';
import AIRecommend from '../components/AIRecommend.tsx';
import { useEffect, useState } from 'react';
import NewMealLogModal from '../components/NewMealLogModal.tsx';
import { globalState } from '../helper/GlobalState.ts';
import axios from 'axios';

export default function HomePage() {
    const theme = useTheme();
    const [homeCardsData, setHomeCardsData] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const loggedInUser = globalState((s) => s.loggedInUser);

    useEffect(() => {
        const fetchScheduled = async () => {
            try {
                if (!loggedInUser) return;

                const idToken = await loggedInUser.getIdToken();
                const backendUrl = 'https://bnb-marathon-backend-569093928388.asia-east1.run.app';

                const res = await axios.get(
                    `${backendUrl}/scheduled`,
                    {
                        headers: {
                            Authorization: `Bearer ${idToken}`
                        },
                        params: {
                            range: 'lw'
                        }
                    }
                );

                // Zod validation (expect an array)
                const parsed = res.data.items;

                // Save into HomeCards list
                setHomeCardsData(parsed);

            } catch (err) {
                console.error('Error fetching scheduled meals:', err);
            }
        };

        fetchScheduled();
    }, [loggedInUser]);

    return (
        <Box
            sx={{
                px: 4,
                py: 6,
                backgroundColor: theme.palette.background.default,
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                width: '100%'
            }}
        >
            {/* Top Row: Summary + Log Meal */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Stack spacing={1}>
                    <Typography variant="h5" sx={{ color: theme.palette.primary.contrastText }}>
                        Your Meal Summary
                    </Typography>
                </Stack>

                <Button
                    onClick={() => setModalOpen(true)}
                    sx={{
                        borderRadius: '999px',
                        textTransform: 'none',
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        '&:hover': { backgroundColor: theme.palette.primary.dark },
                        px: 4,
                        height: 34,
                        fontWeight: 600,
                        fontSize: '0.9rem'
                    }}
                >
                    <FeatherIcon icon="plus" color={theme.palette.primary.contrastText} />
                    Log Meal
                </Button>
                <Dialog fullWidth open={modalOpen} onClose={() => setModalOpen(false)}>
                    <NewMealLogModal setModalOpen={setModalOpen} />
                </Dialog>
            </Box>

            {/* Bottom Row: HomeCards + AIChat */}
            <Box
                sx={{
                    display: 'flex',
                    gap: 4,
                    alignItems: 'flex-start', // important!
                    minHeight: 500 // fixes ellipse
                }}
            >
                {/* Left: HomeCards */}
                <Box
                    sx={{
                        width: '40%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        maxHeight: '800px',          // 👈 SAME height as AIChat
                        overflowY: 'auto',           // 👈 Scrollbar
                        pr: 1                       // 👈 Little padding so scrollbar doesn't overlap cards
                    }}
                >
                    {homeCardsData.map((item) => (
                        <HomeCard key={item} item={item} />
                    ))}
                </Box>

                {/* Right: AIChat */}
                <Box sx={{ width: '60%', display: 'flex', minHeight: '500px', maxHeight: '800px' }}>
                    <AIRecommend />
                </Box>
            </Box>
        </Box>
    );
}
