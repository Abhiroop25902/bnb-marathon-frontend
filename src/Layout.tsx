import {Outlet} from "react-router";
import NavBar from "./components/NavBar.tsx";

export default function Layout() {
    return (
        <>
            <NavBar/>
            <Outlet/>
        </>

    );
}