import { Outlet, useLocation } from 'react-router';
import { Box } from '@mui/material';
import NavBar from './components/NavBar.tsx';
import LoggedInAvatar from './components/LoggedInAvatar.tsx';
import { globalState } from './helper/GlobalState.ts';

export default function Layout() {
    const location = useLocation();
    const userInfo = globalState((s) => s.userInfo);

    // Hide navbar on onboarding page
    const hideNav = location.pathname === '/onboarding' || (location.pathname === '/' && !userInfo.onboarding.completed);

    return (
        <Box
            sx={{
                width: '100%',
                minHeight: '100dvh',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            {/* TOP BAR ROW */}

            <Box
                sx={{
                    width: '100%',
                    px: 3,
                    py: 2,
                    mb: hideNav ? 0 : 2,
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                {!hideNav && (<NavBar />)}

                {/* Right Side */}
                <Box sx={{
                    position: 'absolute',
                    top: 20,             // <-- FIXED TOP
                    right: 24,           // <-- FIXED RIGHT
                    zIndex: 99
                }}>
                    <LoggedInAvatar />
                </Box>
            </Box>

            {/* Page Content */}
            <Box sx={{
                flexGrow: 1,
                width: '100%',             // ⭐ ensures the routed pages get full width
                display: 'flex',
                justifyContent: 'center',  // center ANY page put inside Layout
                alignItems: 'flex-start'
            }}>
                <Outlet />
            </Box>
        </Box>
    );
}
