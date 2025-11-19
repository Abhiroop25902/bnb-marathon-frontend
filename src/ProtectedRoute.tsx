import {Navigate, Outlet} from "react-router";
import {auth} from "./helper/firebase";

export default function ProtectedRoute() {
    const user = auth.currentUser;

    if (!user) return <Navigate to="/login" replace/>;

    return <Outlet/>;
}