import {auth} from "../helper/firebase.ts";
import NotLoggedInAvatar from "./NotLoggedInAvatar.tsx";
import {useState} from "react";
import Avatar from '@mui/material/Avatar';


export default function LoginIcon() {

    const [user, setUser] = useState<typeof auth.currentUser>(auth.currentUser);

    if (user === null) {
        return <NotLoggedInAvatar updateUserCallback={setUser}/>
    }

    if (user.photoURL === null) {
        const displayString = user.displayName
            ? user.displayName.split(' ').map(w => w.charAt(0).toUpperCase()).join('')
            : user.email!.charAt(0).toUpperCase()

        return <Avatar>{displayString}</Avatar>
    }

    return <Avatar alt={user.displayName as string} src={user.photoURL}/>

}