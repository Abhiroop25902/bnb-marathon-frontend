import {BrowserRouter, Route, Routes} from "react-router";
import HomePage from "./pages/HomePage.tsx";
import Layout from "./Layout.tsx";
import {globalState} from "./helper/GlobalState.ts";
import {auth} from "./helper/firebase.ts";
import {onAuthStateChanged} from "firebase/auth";
import LoginPage from "./pages/LoginPage.tsx";


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
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<Layout/>}>
                    <Route index element={<HomePage/>}/>
                    <Route path={'/login'} element={<LoginPage/>}/>
                </Route>

            </Routes>

        </BrowserRouter>


    )
}

export default App
