import {createTheme} from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: '#f79489',
            light: '#f79489',
            dark: '#f79489',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#F8AFA6',
            light: '#F8AFA6',
            dark: '#F8AFA6',
            contrastText: '#ffffff',
        },
        background: {
            default: '#F9F1F0',
            paper: '#FADCD9',
        }
    },
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#645756",          // border when focused
                    },
                },
            },
        },

        MuiInputLabel: {
            styleOverrides: {
                root: {
                    "&.Mui-focused": {
                        color: "#645756",                // label color when focused
                    },
                },
            },
        },
    },
})

export default theme