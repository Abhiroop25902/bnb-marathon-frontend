import {useState} from 'react';
import {Box, Button, Card, Typography, useTheme} from '@mui/material';
import FeatherIcon from 'feather-icons-react';
import RecommendationCard from './RecommendationCard.tsx';
import {globalState} from '../helper/GlobalState.ts';
import axios from "axios";
import {RecommendationListSchema} from "../schema/RecommendationSchema.ts";


export default function AIRecommend() {
    const theme = useTheme();
    const loggedInUser = globalState((s) => s.loggedInUser);
    const [loading, setLoading] = useState(false);
    const [recommendations, setRecommendations] = useState([]);
    const backendUrl = "https://bnb-marathon-backend-569093928388.asia-east1.run.app";

    const handleGenerate = async () => {
        setLoading(true);
        try {
            if (!loggedInUser) {
                console.error('User not logged in');
                return;
            }
            const idToken = await loggedInUser.getIdToken();
            const res = await axios.post(
                `${backendUrl}/ai/recommendations/generate`,
                {
                    date: new Date().toISOString().slice(0, 10),
                    count: 3
                },
                {
                    headers: {
                        Authorization: `Bearer ${idToken}`
                    }
                }
            );
            console.log('Raw response:', res.data);
            // Zod Parse
            const parsed = RecommendationListSchema.parse(res.data.items);
            console.log('Parsed recommendations:', parsed);
            return parsed;

        } catch (err) {
            console.error('Recommendation error:', err);
        }
    };

    return (
        <Card
            sx={{
                width: '100%',
                minHeight: 400,
                backgroundColor: theme.palette.background.paper,
                borderRadius: theme.shape.borderRadius,
                p: 3,
                border: `1px solid ${theme.palette.primary.main}20`,
                display: 'flex',
                flexDirection: 'column',
                gap: 3
            }}
        >
            {/* Title */}
            <Typography variant="h6" sx={{color: theme.palette.primary.contrastText}}>
                AI Recommendations
            </Typography>

            {/* Main Generate Button */}
            <Button
                onClick={() => {
                    const response = handleGenerate();
                    response.then((recData) => {
                        // @ts-expect-error sdfhgfds
                        setRecommendations(recData);
                    });
                }}
                disabled={loading}
                sx={{
                    borderRadius: theme.shape.borderRadius,
                    textTransform: 'none',
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    '&:hover': {backgroundColor: theme.palette.primary.dark},
                    alignSelf: 'center',
                    px: 4,
                    py: 1.5,
                    fontWeight: 600,
                    fontSize: '1rem'
                }}
            >
                <FeatherIcon icon="zap" size={18} style={{marginRight: 8}}/>
                {loading ? 'Generating...' : 'Generate Recommendations'}
            </Button>

            {/* Results Section */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    mt: 2,
                    overflowY: 'auto',
                    pr: 1,
                    maxHeight: 380
                }}
            >
                {recommendations.map((item) => (
                    <RecommendationCard item={item}/>
                ))}

                {/* Empty state */}
                {!loading && recommendations.length === 0 && (
                    <Typography
                        variant="body2"
                        sx={{textAlign: 'center', color: theme.palette.primary.contrastText}}
                    >
                        Click the button above to get tailored recommendations.
                    </Typography>
                )}
            </Box>
        </Card>
    );
}
