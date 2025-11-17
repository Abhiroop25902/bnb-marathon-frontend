import {useTheme} from "@mui/material";
import FeatherIcon from "feather-icons-react";
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import {type Dispatch, type SetStateAction, useState} from "react";
import SignInWithGoogleButton from "./SignInWithGoogle.tsx";
import {auth} from "../helper/firebase.ts";

type Props = {
    updateUserCallback: Dispatch<SetStateAction<typeof auth.currentUser | null>>
}

export default function NotLoggedInAvatar({updateUserCallback}: Props) {
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

    return (

        <Avatar sx={{
            backgroundColor: theme.palette.secondary.main,
        }}>

            <FeatherIcon icon="user" aria-describedby={id} onClick={handleClick}/>
            <Popover id={id}
                     open={open}
                     anchorEl={anchorEl}
                     onClose={handleClose}
                     anchorOrigin={{
                         vertical: 'bottom',
                         horizontal: 'left',
                     }}
            >
                <SignInWithGoogleButton updateUserCallback={updateUserCallback}/>
            </Popover>

        </Avatar>


    )
}