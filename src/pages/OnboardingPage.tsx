import {useState} from 'react';
import {useNavigate} from 'react-router';
import {
    Box,
    Button,
    Checkbox,
    Chip,
    FormControlLabel,
    Paper,
    Slider,
    Stack,
    Step,
    StepLabel,
    Stepper,
    TextField,
    Typography,
    useTheme
} from '@mui/material';
import {globalState} from '../helper/GlobalState.ts';
import UserSchema from '../schema/UserSchema.ts';
import {normalizeDateToYMD} from '../helper/helper.ts';
import axios from 'axios';

export default function OnboardingPage() {
    const url = 'https://bnb-marathon-backend-569093928388.asia-east1.run.app';
    const theme = useTheme();
    const navigate = useNavigate();

    const steps = ['Cycle Info', 'Preferences', 'Review'];
    const [activeStep, setActiveStep] = useState(0);

    // Step 1: Cycle info
    const [cycleLength, setCycleLength] = useState(28);
    const [lastPeriods, setLastPeriods] = useState(['', '', '']);

    // Step 2: Preferences
    const [vegetarian, setVegetarian] = useState(false);
    const [proteinTarget, setProteinTarget] = useState(40);
    const [sensitivities, setSensitivities] = useState<string[]>([]);
    const [inputChip, setInputChip] = useState('');

    const loggedInUser = globalState((s) => s.loggedInUser);

    const handleNext = () => setActiveStep((prev) => prev + 1);
    const handleBack = () => setActiveStep((prev) => prev - 1);

    const handleAddSensitivity = () => {
        if (inputChip && !sensitivities.includes(inputChip)) {
            setSensitivities((prev) => [...prev, inputChip]);
            setInputChip('');
        }
    };

    const handleDeleteSensitivity = (item: string) => {
        setSensitivities((prev) => prev.filter((s) => s !== item));
    };

    const setUserInfo = globalState((s) => s.setUserInfo);

    const handleSubmit = async () => {
        try {
            if (!loggedInUser) {
                alert('Not logged in');
                return;
            }

            const idToken = await loggedInUser.getIdToken();

            // Convert UI dates → JS Date or null
            const [raw1, raw2, raw3] = lastPeriods; // whatever shape your state has
            const d1 = normalizeDateToYMD(raw1);
            const d2 = normalizeDateToYMD(raw2);
            const d3 = normalizeDateToYMD(raw3);

            if (!d1) {
                alert('Please enter at least your most recent period date.');
                return;
            }

            const payload = {
                cycle: {
                    cycleLength,
                    lastPeriodStart: d1,
                    previousPeriodStart: d2,        // optional + nullable
                    thirdLastPeriodStart: d3        // optional + nullable
                },
                onboarding: {
                    completed: true,
                    completedAt: new Date().toISOString(),
                    version: 'v1'
                },
                preference: {
                    proteinTarget_g: proteinTarget,
                    sensitivities,
                    vegetarian
                },
                id: loggedInUser.uid
            };

            const result = UserSchema.safeParse(payload);
            if (!result.success) {
                console.error('Zod validation failed:', result.error.format());
                alert('Please check your inputs — something is invalid.');
                return;
            }

            const validData = result.data;

            await axios.patch(
                `${url}/user`,
                validData,
                {
                    headers: {
                        Authorization: `Bearer ${idToken}`
                    }
                }
            );

            setUserInfo({...validData});
            navigate('/');

        } catch (err) {
            console.error('Submit error:', err);
            alert('Error submitting onboarding data.');
        }
    };


    // Render each step
    const renderStepContent = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <Stack spacing={2}>
                        <TextField
                            label="Most Recent Period"
                            type="date"
                            value={lastPeriods[0]}
                            onChange={(e) => setLastPeriods([e.target.value, lastPeriods[1], lastPeriods[2]])}
                            InputLabelProps={{shrink: true}}
                        />
                        <TextField
                            label="Second Last Period"
                            type="date"
                            value={lastPeriods[1]}
                            onChange={(e) => setLastPeriods([lastPeriods[0], e.target.value, lastPeriods[2]])}
                            InputLabelProps={{shrink: true}}
                        />
                        <TextField
                            label="Third Last Period"
                            type="date"
                            value={lastPeriods[2]}
                            onChange={(e) => setLastPeriods([lastPeriods[0], lastPeriods[1], e.target.value])}
                            InputLabelProps={{shrink: true}}
                        />
                        <TextField
                            label="Average Cycle Length (days)"
                            type="number"
                            value={cycleLength}
                            onChange={(e) => setCycleLength(Number(e.target.value))}
                        />
                    </Stack>
                );
            case 1:
                return (
                    <Stack spacing={3}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={vegetarian}
                                    onChange={(e) => setVegetarian(e.target.checked)}
                                    sx={{
                                        color: theme.palette.primary.main,
                                        '&.Mui-checked': {color: theme.palette.primary.main}
                                    }}
                                />
                            }
                            label="Vegetarian?"
                        />

                        <Box>
                            <Typography gutterBottom>Protein Target (g)</Typography>
                            <Slider
                                value={proteinTarget}
                                min={20}
                                max={150}
                                step={5}
                                onChange={(_e, val) => setProteinTarget(val as number)}
                                valueLabelDisplay="auto"
                            />
                        </Box>

                        <Box>
                            <TextField
                                label="Add Sensitivity"
                                value={inputChip}
                                onChange={(e) => setInputChip(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        handleAddSensitivity();
                                    }
                                }}
                                sx={{mb: 1}}
                            />
                            <Stack direction="row" spacing={1} flexWrap="wrap">
                                {sensitivities.map((s) => (
                                    <Chip
                                        key={s}
                                        label={s}
                                        onDelete={() => handleDeleteSensitivity(s)}
                                        color="primary"
                                        sx={{mt: 0.5}}
                                    />
                                ))}
                            </Stack>
                        </Box>
                    </Stack>
                );
            case 2:
                return (
                    <Stack spacing={2}>
                        <Typography variant="subtitle1">Review your data</Typography>
                        <Typography>Last Periods: {lastPeriods.filter(Boolean).join(', ')}</Typography>
                        <Typography>Cycle Length: {cycleLength} days</Typography>
                        <Typography>Vegetarian: {vegetarian ? 'Yes' : 'No'}</Typography>
                        <Typography>Protein Target: {proteinTarget}g</Typography>
                        <Typography>
                            Sensitivities: {sensitivities.length ? sensitivities.join(', ') : 'None'}
                        </Typography>
                    </Stack>
                );
            default:
                return null;
        }
    };

    return (
        <Box
            sx={{
                width: 800,
                height: 100,
                minHeight: '80vh',
                backgroundColor: theme.palette.background.default,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Paper
                elevation={2}
                sx={{
                    width: '100%',
                    maxWidth: 520,          // perfect card width
                    p: 4,
                    borderRadius: theme.shape.borderRadius,
                    backgroundColor: theme.palette.background.paper
                }}
            >
                {/* STEP HEADER */}
                <Stepper activeStep={activeStep}
                         alternativeLabel
                         sx={{
                             mb: 4,

                             '& .MuiStepLabel-root .Mui-completed': {
                                 color: theme.palette.secondary.main + ' !important' // completed circle
                             },

                             '& .MuiStepLabel-label.Mui-completed': {
                                 color: theme.palette.primary.contrastText + ' !important', // completed text
                                 fontWeight: 600
                             },

                             '& .MuiStepLabel-label.Mui-active': {
                                 color: theme.palette.primary.contrastText + ' !important', // active text color
                                 fontWeight: 700
                             },

                             '& .MuiStepLabel-root .Mui-active .MuiStepIcon-root': {
                                 color: theme.palette.primary.main + ' !important' // active circle
                             },

                             '& .MuiStepIcon-root': {
                                 color: '#C7BBB4'    // inactive dot color (soft pastel taupe)
                             },

                             '& .MuiStepConnector-line': {
                                 borderColor: '#D8C9C4' // connector line (pastel neutral)
                             }
                         }}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                {/* STEP CONTENT */}
                {renderStepContent(activeStep)}

                {/* BUTTONS */}
                <Box sx={{display: 'flex', justifyContent: 'space-between', mt: 4}}>
                    <Button disabled={activeStep === 0} onClick={handleBack}>
                        Back
                    </Button>

                    {activeStep < steps.length - 1 ? (
                        <Button
                            variant="contained"
                            onClick={handleNext}
                            sx={{
                                backgroundColor: theme.palette.primary.main,
                                color: theme.palette.primary.contrastText,
                                '&:hover': {backgroundColor: theme.palette.primary.dark}
                            }}
                        >
                            Next
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                            sx={{
                                backgroundColor: theme.palette.primary.main,
                                color: theme.palette.primary.contrastText,
                                '&:hover': {backgroundColor: theme.palette.primary.dark}
                            }}
                        >
                            Complete
                        </Button>
                    )}
                </Box>
            </Paper>
        </Box>
    );

}
