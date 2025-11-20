import {Card, Chip, Typography, useTheme} from "@mui/material";
import {toCapitalCase} from "../helper/helper.ts";
import {z} from "zod";
import type LogSchema from "../schema/LogSchema.ts";

type Props = {
    meal: z.infer<typeof LogSchema>
}

const mealTypeEmojiMap: Record<Props['meal']['mealType'], string> = {
    breakfast: "🥑",
    lunch: "🥙",
    snacks: "🍏",
    dinner: "🥗",
    other: "🍵"
}

export default function HistoryMealCard({meal}: Props) {
    const theme = useTheme();


    return (
        <Card style={{
            display: "flex",
            height: "10rem",
            padding: "1rem",
            flexDirection: "row",
            gap: "1rem",
            backgroundColor: theme.palette.primary.light + "22",
            backdropFilter: "blur(4px)",
        }}>


            <div style={{
                height: "100%",
                aspectRatio: "1/1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <div style={{fontSize: "4rem"}}>{
                    mealTypeEmojiMap[meal.mealType]
                }</div>
            </div>
            <div style={{display: 'flex', flexDirection: "column", justifyContent: "start", width: "100%"}}>
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <div style={{display: "flex", gap: "1rem", alignItems: "center"}}>
                        <Typography variant={"h6"}>{toCapitalCase(meal.rawText)}</Typography>
                        <Chip label={toCapitalCase(meal.mealType)}/>
                    </div>
                    <div style={{display: "flex", gap: "0.5rem"}}>
                        {meal.symptoms?.map(symptom => <Chip
                            key={symptom}
                            sx={{
                                backgroundColor: theme.palette.primary.main,
                                color: theme.palette.primary.contrastText
                            }}
                            label={toCapitalCase(symptom)}/>)}
                    </div>

                </div>
                <Typography variant={"body2"}
                            sx={{paddingBottom: "1rem"}}>{new Date(meal.createdAt._seconds * 1000 + meal.createdAt._nanoseconds / 1_000_000).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                })}</Typography>
                <div style={{display: "flex", gap: "1rem"}}>
                    {meal.estimatedMacros &&
                        Object.entries(meal.estimatedMacros).map(([macro, amount]) => <Chip key={`${meal.id}-${macro}`}
                                                                                            variant={"outlined"}
                                                                                            label={toCapitalCase(`${macro.replace("_g", '')}: ${amount}g`)}/>)
                    }
                </div>
            </div>
        </Card>)
}