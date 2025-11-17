import {BrowserRouter, Route, Routes} from "react-router";
import HomePage from "./pages/HomePage.tsx";
import Layout from "./Layout.tsx";


function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<Layout/>}>
                    <Route index element={<HomePage/>}/>
                </Route>
            </Routes>

        </BrowserRouter>


    )
}

export default App
