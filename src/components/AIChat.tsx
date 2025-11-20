import { useState } from 'react';
import { Box, Button, Card, Typography, useTheme } from '@mui/material';
import FeatherIcon from 'feather-icons-react';
import HomeCard from './HomeCard'; // reuse existing card

export default function AIChat() {
    const theme = useTheme();

    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<any[]>([]);

    const handleGenerate = async () => {
        setLoading(true);

        // Simulated API call — replace with your backend later
        setTimeout(() => {
            setResults([1, 2, 3]); // sample response
            setLoading(false);
        }, 1000);
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
            <Typography variant="h6" sx={{ color: theme.palette.primary.contrastText }}>
                AI Recommendations
            </Typography>

            {/* Main Generate Button */}
            <Button
                onClick={handleGenerate}
                disabled={loading}
                sx={{
                    borderRadius: theme.shape.borderRadius,
                    textTransform: 'none',
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    '&:hover': { backgroundColor: theme.palette.primary.dark },
                    alignSelf: 'center',
                    px: 4,
                    py: 1.5,
                    fontWeight: 600,
                    fontSize: '1rem'
                }}
            >
                <FeatherIcon icon="zap" size={18} style={{ marginRight: 8 }} />
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
                {results.map((item) => (
                    <HomeCard key={item} item={item} />
                ))}

                {/* Empty state */}
                {!loading && results.length === 0 && (
                    <Typography
                        variant="body2"
                        sx={{ textAlign: 'center', color: theme.palette.primary.contrastText }}
                    >
                        Click the button above to get tailored recommendations.
                    </Typography>
                )}
            </Box>
        </Card>
    );
}
