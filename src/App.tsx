import LoginPage from "./pages/LoginPage.tsx";
import Container from '@mui/material/Container';
import {BrowserRouter, Route, Routes} from "react-router";


function App() {

    return (
        <BrowserRouter>
            <Container>
                <Routes>
                    <Route path="/login" element={<LoginPage/>}/>
                </Routes>
            </Container>
        </BrowserRouter>


    )
}

export default App
