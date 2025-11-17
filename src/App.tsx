import Box from '@mui/material/Box';
import LoginCard from "./components/LoginCard.tsx";


function App() {

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
        }}>
            <LoginCard/>
        </Box>
    )
}

export default App
