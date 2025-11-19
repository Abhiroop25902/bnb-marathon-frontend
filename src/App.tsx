import {BrowserRouter, Route, Routes} from "react-router";
import HomePage from "./pages/HomePage.tsx";
import HistoryPage from "./pages/HistoryPage.tsx";
import Layout from "./Layout.tsx";
import {globalState} from "./helper/GlobalState.ts";
import {auth} from "./helper/firebase.ts";
import {browserSessionPersistence, onAuthStateChanged} from "firebase/auth";
import LoginPage from "./pages/LoginPage.tsx";
import {useEffect} from "react";


function App() {
    const loggedInUser = globalState(s => s.loggedInUser)
    const setLoggedInUser = globalState(state => state.setLoggedInUser)
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setLoggedInUser(user);
            // User is signed in
            console.log("User is signed in:", user.uid);
        } else {
            if (loggedInUser !== null) setLoggedInUser(null);
            // User is signed out
            console.log("User is signed out");
        }
    });

    const setPersistenceInitialized = globalState(s => s.setPersistenceInitialized)
    useEffect(() => {
        auth.setPersistence(browserSessionPersistence).then(() => {
            setPersistenceInitialized(true);
            console.log('Persistence setup successfully')
        });
    }, [setPersistenceInitialized])

    return (
        <div style={{height: "100dvh", overflowY: "hidden"}}>
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<Layout/>}>
                        <Route index element={<HomePage/>}/>
                        <Route path={'/history'} element={<HistoryPage/>}/>
                        <Route path={'/login'} element={<LoginPage/>}/>
                    </Route>

                </Routes>

            </BrowserRouter>
        </div>


    )
}

export default App
