import {BrowserRouter, Navigate, Route, Routes} from "react-router";
import {useEffect} from "react";
import {auth} from "./helper/firebase";
import {browserSessionPersistence, onAuthStateChanged} from "firebase/auth";
import {globalState} from "./helper/GlobalState";

import HomePage from "./pages/HomePage";
import HistoryPage from "./pages/HistoryPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import Layout from './Layout.tsx';

export default function App() {
    const loggedInUser = globalState((s) => s.loggedInUser);
    const setLoggedInUser = globalState((s) => s.setLoggedInUser);
    const persistenceInitialized = globalState((s) => s.persistenceInitialized);
    const setPersistenceInitialized = globalState((s) => s.setPersistenceInitialized);

    // 1) Setup Persistence — only once
    useEffect(() => {
        auth.setPersistence(browserSessionPersistence).finally(() => {
            setPersistenceInitialized(true);
        });
    }, [setPersistenceInitialized]);

    // 2) Listen to Firebase login state — only once
    useEffect(() => {
        return onAuthStateChanged(auth, (user) => {
            setLoggedInUser(user || null);
        });
    }, [setLoggedInUser]);

    // Wait until Firebase finishes initializing
    if (!persistenceInitialized) {
        return <div>Loading...</div>;
    }

    return (
        <BrowserRouter>
            <Routes>

                {/* PUBLIC ROUTES */}
                <Route
                    path="/login"
                    element={
                        loggedInUser ? <Navigate to="/" replace/> : <LoginPage/>
                    }
                />

                {/* PROTECTED ROUTES — wrapped inside Layout */}
                <Route element={loggedInUser ? <Layout/> : <Navigate to="/login" replace/>}>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/history" element={<HistoryPage/>}/>
                    <Route path="/profile" element={<ProfilePage/>}/>
                </Route>

                {/* FALLBACK */}
                <Route
                    path="*"
                    element={<Navigate to={loggedInUser ? "/" : "/login"} replace/>}
                />

            </Routes>
        </BrowserRouter>
    );
}
