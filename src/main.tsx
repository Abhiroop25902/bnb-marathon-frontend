import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {ThemeProvider} from "@mui/material";
import App from './App.tsx'
import theme from "./theme/Theme.ts";
import CssBaseline from '@mui/material/CssBaseline';


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <App/>
        </ThemeProvider>
    </StrictMode>,
)
