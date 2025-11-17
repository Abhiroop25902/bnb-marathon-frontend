import {NavLink} from "react-router";
import {useTheme} from "@mui/material";
import LoginIcon from "./LoginIcon.tsx";


export default function NavBar() {
    const theme = useTheme();
    return (
        <nav style={{
            background: theme.palette.primary.main,
            padding: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
        }}>
            <div id={"links"}>
                <NavLink to={"/"}>Home</NavLink>
            </div>
            <div id={"loginIcon"}>
                <LoginIcon/>
            </div>

        </nav>

    )
}