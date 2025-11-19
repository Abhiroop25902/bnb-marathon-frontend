import {Paper, Typography, useTheme} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';


export default function AddLogIcon() {
    const theme = useTheme();

    return (
        <Paper elevation={1}
               sx={{
                   px: 3,
                   py: 2,
                   borderRadius: theme.shape.borderRadius,
                   backgroundColor: theme.palette.background.paper,
                   border: `1px solid ${theme.palette.primary.main}40`, // subtle border
                   alignItems: 'center',
                   justifyContent: 'center',
                   display: 'flex',
                   gap: "0.5rem",
                   cursor: 'pointer',
               }}
               onClick={() => {
                   alert("HI")
               }}>
            <AddIcon fontSize="small"/>
            <Typography variant={"subtitle2"}>Add Log</Typography>
        </Paper>
    )

}