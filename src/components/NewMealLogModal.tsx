import {
    Box,
    Button,
    Chip,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography,
    useTheme
} from "@mui/material";
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import {toCapitalCase} from "../helper/helper.ts";
import {useState} from "react";
import dayjs, {type Dayjs} from "dayjs";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {globalState} from "../helper/GlobalState.ts";
import {storage} from "../helper/firebase.ts";
import {
    ref as storageRef,
    uploadBytesResumable,
    getDownloadURL
} from "firebase/storage";
import axios from "axios";

type Props = {
    setModalOpen: (open: boolean) => void;
}
const url = "https://bnb-marathon-backend-569093928388.asia-east1.run.app";


export default function NewMealLogModal({setModalOpen}: Props) {
    const theme = useTheme();

    const [selectedMealType, setSelectedMealType] = useState<"breakfast" | "lunch" | "dinner" | "snacks" | "other" | null>(null);
    const [selectedDateTime, setSelectedDateTime] = useState<Dayjs | null>(dayjs());
    const [enteredDesc, setEnteredDesc] = useState<string | null>(null);
    const [symptoms, setSymptoms] = useState<Array<string>>([]);
    const [imgUrl, setImgUrl] = useState<string | undefined>(undefined);

    const [uploadProgress, setUploadProgress] = useState<number | null>(null);
    const [uploading, setUploading] = useState(false);


    const loggedInUser = globalState(s => s.loggedInUser)


    return (
        <Box style={{backgroundColor: theme.palette.background.default, padding: "1rem"}}>
            <DialogTitle>Log Meal</DialogTitle>
            <DialogContent>
                <div style={{display: "flex", flexDirection: "column", gap: "1rem"}}>
                    <div style={{display: "flex", flexDirection: "column", gap: "0.5rem"}}>
                        <Typography variant={"body1"}>Meal Type</Typography>
                        <div style={{display: "flex", gap: "0.3rem"}}>
                            {(["breakfast", "lunch", "dinner", "snacks", "other"] as const).map((e) => (
                                <Chip key={e}
                                      variant={selectedMealType === e ? "filled" : "outlined"}
                                      label={toCapitalCase(e)}
                                      onClick={() => setSelectedMealType(e)
                                      }
                                />
                            ))}
                        </div>
                    </div>
                    <div style={{display: "flex", flexDirection: "column", gap: "0.5rem"}}>
                        <Typography variant={"body1"}>Time</Typography>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker label={"Pick Date"} value={selectedDateTime}
                                            onChange={(newValue) => setSelectedDateTime(newValue)}
                                            sx={{
                                                "& .MuiPickersSectionList-root": {
                                                    py: 1
                                                },
                                            }}
                            />
                        </LocalizationProvider>
                    </div>
                    <div style={{display: "flex", flexDirection: "column", gap: "0.5rem"}}>
                        <Typography variant={"body1"}>Describe your meal</Typography>
                        <TextField
                            value={enteredDesc}
                            placeholder={"Describe your meal"}
                            onChange={(e) => setEnteredDesc(e.target.value)}
                            sx={{
                                input: {
                                    py: 1
                                },
                            }}
                        />
                    </div>
                    <div style={{display: "flex", flexDirection: "column", gap: "0.5rem"}}>
                        <Typography variant={"body1"}>Any symptoms after eating?</Typography>
                        <div style={{display: "flex", gap: "0.3rem", flexWrap: "wrap"}}>
                            {(["bloating", "cramps", "low energy", "headache", "mood swings"] as const).map((e) => (
                                <Chip key={e}
                                      variant={symptoms.includes(e) ? "filled" : "outlined"}
                                      label={toCapitalCase(e)}
                                      onClick={() => {
                                          if (symptoms.includes(e)) setSymptoms(symptoms.filter(s => s !== e));
                                          else setSymptoms([...symptoms, e])
                                      }
                                      }
                                />
                            ))}
                        </div>
                    </div>
                    <div style={{display: "flex", flexDirection: "column", gap: "0.5rem"}}>
                        <Typography variant={"body1"}>Photo</Typography>
                        <div>
                            <input
                                type="file"
                                accept="image/jpeg, image/png, image/jpg"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (!file) return;

                                    setUploading(true);
                                    setUploadProgress(0);

                                    try {
                                        const path = `uploads/${loggedInUser!.uid}/${Date.now()}_${file.name}`;
                                        const sRef = storageRef(storage, path);

                                        const uploadTask = uploadBytesResumable(sRef, file);

                                        uploadTask.on("state_changed",
                                            (snap) => {
                                                const pct = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
                                                setUploadProgress(pct);
                                            },
                                            (err) => {
                                                console.error("Upload failed", err);
                                                setUploading(false);
                                                setUploadProgress(null);
                                                // handle error UI as needed
                                            },
                                            async () => {
                                                const url = await getDownloadURL(uploadTask.snapshot.ref)
                                                setImgUrl(url);
                                                setUploading(false);
                                                setUploadProgress(null);
                                            })
                                    } catch (err) {
                                        console.error(err);
                                        setUploading(false);
                                        setUploadProgress(null);
                                    }
                                }}
                            />
                            {uploading && <Typography variant={"caption"}>Uploading: {uploadProgress}%</Typography>}
                        </div>
                    </div>
                </div>

            </DialogContent>
            <DialogActions sx={{justifyContent: "space-evenly"}}>
                <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => setModalOpen(false)}>Cancel</Button>
                <Button fullWidth variant="contained" onClick={async () => {
                    await axios.post(`${url}/logs`,
                        {
                            imgUrl: imgUrl,
                            mealType: selectedMealType,
                            rawText: enteredDesc,
                            symptoms: symptoms,
                            createdAt: selectedDateTime
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${await loggedInUser!.getIdToken()}`,
                                "Content-Type": "application/json",
                            }
                        })
                    setModalOpen(false)
                }}>
                    Confirm
                </Button>
            </DialogActions>
        </Box>
    )
}