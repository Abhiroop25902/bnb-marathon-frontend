/*
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Slider,
  Chip,
  Stack,
  useTheme,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";

export default function OnboardingPage() {
  const theme = useTheme();
  const { user } = useUser();
  const navigate = useNavigate();

  const steps = ["Cycle Info", "Preferences", "Review"];
  const [activeStep, setActiveStep] = useState(0);

  // Step 1: Cycle info
  const [cycleLength, setCycleLength] = useState(28);
  const [lastPeriods, setLastPeriods] = useState(["", "", ""]);

  // Step 2: Preferences
  const [vegetarian, setVegetarian] = useState(false);
  const [proteinTarget, setProteinTarget] = useState(40);
  const [sensitivities, setSensitivities] = useState<string[]>([]);
  const [inputChip, setInputChip] = useState("");

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleAddSensitivity = () => {
    if (inputChip && !sensitivities.includes(inputChip)) {
      setSensitivities((prev) => [...prev, inputChip]);
      setInputChip("");
    }
  };

  const handleDeleteSensitivity = (item: string) => {
    setSensitivities((prev) => prev.filter((s) => s !== item));
  };

  const handleSubmit = async () => {
    if (!user) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/onboarding`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.uid,
          cycleLength,
          lastPeriods,
          preferences: { vegetarian, proteinTarget_g: proteinTarget, sensitivities },
        }),
      });

      if (!res.ok) throw new Error("Failed to submit onboarding data");

      navigate("/"); // go to HomePage after successful onboarding
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
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
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Second Last Period"
              type="date"
              value={lastPeriods[1]}
              onChange={(e) => setLastPeriods([lastPeriods[0], e.target.value, lastPeriods[2]])}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Third Last Period"
              type="date"
              value={lastPeriods[2]}
              onChange={(e) => setLastPeriods([lastPeriods[0], lastPeriods[1], e.target.value])}
              InputLabelProps={{ shrink: true }}
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
                    "&.Mui-checked": { color: theme.palette.primary.main },
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
                onChange={(e, val) => setProteinTarget(val as number)}
                valueLabelDisplay="auto"
              />
            </Box>

            <Box>
              <TextField
                label="Add Sensitivity"
                value={inputChip}
                onChange={(e) => setInputChip(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddSensitivity();
                  }
                }}
                sx={{ mb: 1 }}
              />
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {sensitivities.map((s) => (
                  <Chip
                    key={s}
                    label={s}
                    onDelete={() => handleDeleteSensitivity(s)}
                    color="primary"
                    sx={{ mt: 0.5 }}
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
            <Typography>Last Periods: {lastPeriods.filter(Boolean).join(", ")}</Typography>
            <Typography>Cycle Length: {cycleLength} days</Typography>
            <Typography>Vegetarian: {vegetarian ? "Yes" : "No"}</Typography>
            <Typography>Protein Target: {proteinTarget}g</Typography>
            <Typography>
              Sensitivities: {sensitivities.length ? sensitivities.join(", ") : "None"}
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
        minHeight: "100vh",
        backgroundColor: theme.palette.background.default,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        pt: 8,
        px: 3,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 500,
          p: 4,
          borderRadius: theme.shape.borderRadius,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {renderStepContent(activeStep)}

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ borderRadius: theme.shape.borderRadius }}
          >
            Back
          </Button>

          {activeStep < steps.length - 1 ? (
            <Button
              variant="contained"
              onClick={handleNext}
              sx={{
                borderRadius: theme.shape.borderRadius,
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                "&:hover": { backgroundColor: theme.palette.primary.dark },
              }}
            >
              Next
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                borderRadius: theme.shape.borderRadius,
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                "&:hover": { backgroundColor: theme.palette.primary.dark },
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
*/
