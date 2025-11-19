import {useTheme} from "@mui/material";
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Popover from '@mui/material/Popover';
import {useState} from "react";
import {auth} from "../helper/firebase.ts"
import {globalState} from "../helper/GlobalState.ts";
import FeatherIcon from "feather-icons-react";


export default function LoggedInAvatar() {
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    const user = globalState(s => s.loggedInUser)!;
    let displayAvatar;
    if (user.photoURL === null) {
        const displayString = user.displayName
            ? user.displayName.split(' ').map(w => w.charAt(0).toUpperCase()).join('')
            : user.email!.charAt(0).toUpperCase()

        displayAvatar = <Avatar sx={{
            backgroundColor: theme.palette.secondary.main,
        }} onClick={handleClick}>{displayString}</Avatar>
    } else displayAvatar = <Avatar sx={{
        backgroundColor: theme.palette.secondary.main,
    }} onClick={handleClick} alt={user.displayName as string} src={user.photoURL}/>

    return (
        <>
            {displayAvatar}
            <Popover id={id}
                     open={open}
                     anchorEl={anchorEl}
                     onClose={handleClose}
                     anchorOrigin={{
                         vertical: 'bottom',
                         horizontal: 'left',
                     }}
            >
                <Box onClick={() => auth.signOut()}
                     sx={{display: 'flex', padding: '1rem', gap: '1rem', alignItems: 'center'}}>
                    <FeatherIcon icon={"log-out"} size={"1.25rem"}/>
                    <Typography variant="subtitle1" noWrap={true}>
                        Log Out
                    </Typography>
                </Box>
            </Popover>
        </>


    )
}