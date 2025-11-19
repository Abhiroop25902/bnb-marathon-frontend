import {createTheme} from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: '#D3A5A5',
            light: '#D3A5A5',
            dark: '#D3A5A5',
            contrastText: '#675553',
        },
        secondary: {
            main: '#A98B88',
            light: '#A98B88',
            dark: '#A98B88',
            contrastText: '#EBD6C5',
        },
        background: {
            default: '#EEE9E2',
            paper: '#F4EDE7',    // ivory
        }
    },
    shape: {
        borderRadius: 8,
    },
    typography: {
        fontFamily:
            'var(--font-primary, -apple-system, Poppins, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif)',
    },
    components: {
        MuiTypography: {
            styleOverrides: {
                root: {
                    color: "#675553",
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#675553",          // border when focused
                    },
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    "&.Mui-selected": {
                        color: "#675553",
                    }
                }
            }
        },
        MuiSelect: {
            styleOverrides: {
                root: {
                    ".MuiSelect-outlined": {
                        paddingTop: "0.5rem",
                        paddingBottom: "0.5rem",
                    }

                }
            }
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    height: "24px",
                }
            }
        },

        MuiInputLabel: {
            styleOverrides: {
                root: {
                    "&.Mui-focused": {
                        color: "#675553",                // label color when focused
                    },
                },
            },
        },
    },
})

export default theme