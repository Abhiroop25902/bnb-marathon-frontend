import {Container, Typography} from '@mui/material';

import HistoryMealCard from "../components/HistoryMealCard.tsx";
import {z} from "zod";
import {useEffect, useState} from "react";
import MealLogSchema from "../schema/MealLogSchema.ts";
import axios from "axios";
import {globalState} from "../helper/GlobalState.ts";
import {useNavigate} from "react-router";
import "./HistoryPage.css"


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

    const [mealLogs, setMealLogs] = useState<Array<z.infer<typeof MealLogSchema>> | null>(null);


    useEffect(() => {
        async function fetchMealLogs() {
            const idToken = await loggedInUser!.getIdToken()

            try {
                const res = await axios.get(`${url}/mealLog`, {
                    headers: {
                        Authorization: `Bearer ${idToken}`,
                    },
                    params: {
                        range: "lw",
                    }
                })

                const resultSchema = z.array(MealLogSchema)

                const data: Array<z.infer<typeof MealLogSchema>> = resultSchema.parse(res.data)
                setMealLogs(data)
            } catch (err) {
                console.error(err)
            }
        }

        fetchMealLogs();
    }, [loggedInUser]);


    if (mealLogs === null) return (<div>Loading</div>);

    return (
        <Container sx={{height: "100%", overflowY: "hidden"}}>
            <Typography variant={"h4"}>Meal History</Typography>

            <div
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


        </Container>
    )

}