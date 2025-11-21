import { Box, Button, Card, Chip, Typography, useTheme } from '@mui/material';

export default function RecommendationCard({ item, onLock }) {
    const theme = useTheme();

    const hasMacros =
        item.protein_g !== null ||
        item.carbs_g !== null ||
        item.fat_g !== null;

    return (
        <Card
            sx={{
                width: '100%',
                minHeight: 220,
                p: 2.5,
                pt: 3,
                borderRadius: 4,
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.primary.main}30`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                gap: 1.5,
                position: 'relative'
            }}
        >
            {/* Meal Type Badge */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    backgroundColor: theme.palette.secondary.light + '40',
                    color: theme.palette.primary.contrastText,
                    borderRadius: '12px',
                    px: 1.5,
                    py: 0.3,
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    textTransform: 'capitalize'
                }}
            >
                {item.mealType}
            </Box>
            {/* Title */}
            <Typography
                variant="subtitle1"
                sx={{ color: theme.palette.primary.contrastText, fontWeight: 600 }}
            >
                {item.title}
            </Typography>

            {/* Macronutrient badges */}
            {hasMacros && (
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {item.protein_g !== null && (
                        <Chip
                            label={`Protein: ${item.protein_g}g`}
                            sx={{
                                backgroundColor: theme.palette.primary.light + '40',
                                color: theme.palette.primary.contrastText
                            }}
                        />
                    )}

                    {item.carbs_g !== null && (
                        <Chip
                            label={`Carbs: ${item.carbs_g}g`}
                            sx={{
                                backgroundColor: theme.palette.secondary.light + '40',
                                color: theme.palette.primary.contrastText
                            }}
                        />
                    )}

                    {item.fat_g !== null && (
                        <Chip
                            label={`Fat: ${item.fat_g}g`}
                            sx={{
                                backgroundColor: '#DEC8C8',
                                color: theme.palette.primary.contrastText
                            }}
                        />
                    )}
                </Box>
            )}

            {/* Description */}
            {item.description && (
                <Typography
                    variant="body2"
                    sx={{
                        color: theme.palette.primary.contrastText,
                        opacity: 0.85,
                        mb: 2
                    }}
                >
                    {item.description}
                </Typography>
            )}

            {/* Lock Button (BOTTOM CENTER) */}
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    mt: 'auto'   // pushes it to the bottom
                }}
            >
                <Button
                    onClick={() => onLock(item)}
                    sx={{
                        borderRadius: theme.shape.borderRadius,
                        textTransform: 'none',
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        px: 3,
                        py: 0.7,
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        '&:hover': {
                            backgroundColor: theme.palette.primary.dark
                        }
                    }}
                >
                    Lock
                </Button>
            </Box>
        </Card>
    );
}
