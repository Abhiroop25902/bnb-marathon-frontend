import {globalState} from "../helper/GlobalState.ts";
import {Link} from "react-router";
import LoggedInAvatar from "./LoggedInAvatar.tsx";


export default function LoginIcon() {
    const user = globalState(state => state.loggedInUser)

    if (user === null) {
        return <Link to="/login">Login</Link>
    }

    return <LoggedInAvatar/>

}