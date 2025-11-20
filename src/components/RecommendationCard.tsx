import {Card, CardContent, Typography} from '@mui/material';

export default function RecommendationCard({item}) {
    return (
        <Card
            elevation={0}
            sx={(theme) => ({
                backgroundColor: theme.palette.primary.light + '22',     // soft pastel background (13% opacity)
                border: `1px solid ${theme.palette.primary.main}33`,     // subtle border (20% opacity)
                borderRadius: '12px',
                marginTop: '4px',
                marginBottom: '4px',
                backdropFilter: 'blur(4px)'                             // optional: gives a nice soft-glass look
            })}
        >
            <CardContent
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    padding: '16px !important'
                }}
            >
                {/* Title */}
                <Typography
                    variant="subtitle1"
                    sx={(theme) => ({
                        fontWeight: 600,
                        color: theme.palette.primary.dark
                    })}
                >
                    {item.title}
                </Typography>

                {/* Subtitle */}
                {item.subtitle && (
                    <Typography
                        variant="body2"
                        sx={{color: 'text.secondary'}}
                    >
                        {item.subtitle}
                    </Typography>
                )}

                {/* Value */}
                {item.value && (
                    <Typography
                        variant="h6"
                        sx={(theme) => ({
                            fontWeight: 700,
                            color: theme.palette.primary.main
                        })}
                    >
                        {item.value}
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
}
