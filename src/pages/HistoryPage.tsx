import {CircularProgress, Container, MenuItem, Select, Typography, useTheme} from '@mui/material';
import {z} from "zod";
import {useEffect, useState} from "react";
import LogSchema from "../schema/LogSchema.ts";
import axios from "axios";
import {globalState} from "../helper/GlobalState.ts";
import {useNavigate} from "react-router";
import "./HistoryPage.css"
import HistoryMealCard from "../components/HistoryMealCard.tsx";
import FeatherIcon from "feather-icons-react";


export default function HistoryPage() {
    const loggedInUser = globalState(s => s.loggedInUser)
    const persistenceInitialized = globalState(s => s.persistenceInitialized)
    const navigate = useNavigate();

    useEffect(() => {
        if (persistenceInitialized && !loggedInUser) {
            navigate("/login");
        }
    }, [persistenceInitialized, loggedInUser, navigate]);

    const url = "https://bnb-marathon-backend-569093928388.asia-east1.run.app";

    const [mealLogs, setMealLogs] = useState<Array<z.infer<typeof LogSchema>> | null>(null);
    const [duration, setDuration] = useState<"lw" | "lm">("lw");


    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMealLogs(null);

        async function fetchMealLogs() {
            const idToken = await loggedInUser!.getIdToken()

            try {
                const res = await axios.get(`${url}/logs`, {
                    headers: {
                        Authorization: `Bearer ${idToken}`,
                    },
                    params: {
                        range: duration,
                    }
                })

                const resultSchema = z.array(LogSchema)

                const data: Array<z.infer<typeof LogSchema>> = resultSchema.parse(res.data)
                setMealLogs(data)
            } catch (err) {
                console.error(err)
            }
        }

        fetchMealLogs();
    }, [loggedInUser, duration]);


    const theme = useTheme();

    return (
        <Container sx={{height: "100%", overflowY: "hidden"}}>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: "1rem",
                paddingBottom: "1rem"
            }}>
                <Typography variant={"h4"}>Meal History</Typography>
                <div style={{display: "flex", alignItems: "center", gap: "0.5rem"}}>
                    <FeatherIcon icon={"calendar"} color={theme.palette.primary.contrastText}/>
                    <Select value={duration}
                            onChange={(e) => {
                                setDuration(e.target.value)
                            }}
                    >
                        <MenuItem value={"lw"}>Last Week</MenuItem>
                        <MenuItem value={"lm"}>Last Month</MenuItem>
                    </Select>
                </div>

            </div>
            {
                mealLogs === null ?
                    (<div style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <CircularProgress/>
                    </div>) :
                    (<div
                            className={"scrollArea"}
                            style={{
                                height: "100%",
                                overflowY: "auto",
                            }}>

                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "1rem"
                            }}>
                                {
                                    mealLogs.map(
                                        (mealLog) => <HistoryMealCard key={mealLog.id} meal={mealLog}/>
                                    )
                                }

                            </div>
                        </div>
                    )
            }


        </Container>
    )

}