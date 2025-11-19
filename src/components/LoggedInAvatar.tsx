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

    //@ts-expect-error adding any here make the html element typing resolution easier
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
            width: '3rem',
            height: '3rem',
            backgroundColor: theme.palette.secondary.main,
        }} onClick={handleClick}>{displayString}</Avatar>
    } else displayAvatar = <Avatar sx={{
        width: '3rem',
        height: '3rem',
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
                     sx={{display: 'flex', padding: '1rem', gap: '0.5rem', alignItems: 'center'}}>
                    <FeatherIcon icon={"log-out"} size={"1rem"}/>
                    <Typography variant="subtitle2" noWrap={true}>
                        Log Out
                    </Typography>
                </Box>
            </Popover>
        </>


    )
}