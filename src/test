import { Box, Button, Chip, Typography, useTheme } from "@mui/material";
import FeatherIcon from "feather-icons-react";
import HomeCard from "../components/HomeCard";

export default function HomePage() {
  const theme = useTheme();
  const homeCardsData = [1, 2, 3];

  return (
    <Box
      sx={{
        px: "4%",
        py: 3,
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      {/* TOP ROW: Summary + Chip (left) and Log Meal (right) */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        {/* LEFT SIDE */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.text.secondary,
              fontWeight: 600,
            }}
          >
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
            }}
          />
        </Box>

        {/* RIGHT SIDE (LOG MEAL BUTTON) */}
        <Button
          onClick={() => true}
          sx={{
            borderRadius: "999px",
            textTransform: "none",
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            "&:hover": {
              backgroundColor: theme.palette.primary.main + "cc",
            },
            px: 4,
            height: 34,
            fontWeight: 600,
            fontSize: "0.9rem",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <FeatherIcon
            icon="plus"
            size={16}
            color={theme.palette.primary.contrastText}
          />
          Log Meal
        </Button>
      </Box>

      {/* HOME CARDS */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
        {homeCardsData.map((item) => (
          <HomeCard key={item} item={item} />
        ))}
      </Box>
    </Box>
  );
}
