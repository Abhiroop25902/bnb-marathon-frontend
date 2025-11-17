import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {logEvent} from 'firebase/analytics'
import {signInWithEmailAndPassword} from 'firebase/auth'
import {analytics, auth} from '../helper/firebase.ts';
import {useState} from "react";

export default function LoginPage() {
    logEvent(analytics, "page_view", {
        page_title: 'Login',
        page_location: window.location.href,
        page_path: '/login',
    });


    async function login(email: string, password: string) {
        try {
            const userCred = await signInWithEmailAndPassword(auth, email, password);
            logEvent(analytics, "login", {
                status: 'success',
                method: "password",
                userId: userCred.user.uid
            })
            return userCred.user;
        } catch (error) {
            logEvent(analytics, "login", {
                status: 'failed',
                providedEmail: email,
                providedPassword: password,
                reason: error
            })
        }
        return null;
    }

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);

    const [loading, setLoading] = useState(false);

    return (
        <Box sx={{
            paddingLeft: '20vw',
            paddingRight: '20vw',
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            justifyContent: 'center',
        }}>
            <Typography variant="h4" gutterBottom>Hello There 👋</Typography>
            <TextField id="outlined-basic email" label="Email" variant="outlined" margin="normal"
                       required={true}
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       error={emailError}
            />
            <TextField id="outlined-basic password" label="Password" variant="outlined" margin="normal"
                       type={"password"}
                       required={true}
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       error={passwordError}
            />
            <Button variant="contained" sx={{marginTop: '0.5rem', height: '3rem'}} loading={loading}
                    onClick={async () => {
                        setLoading(true);

                        if (!email) setEmailError(true);
                        else setEmailError(false);

                        if (!password) setPasswordError(true);
                        else setPasswordError(false);

                        if (!emailError && !passwordError) {
                            const user = await login(email, password);
                            console.log(user?.uid);
                        }

                        setLoading(false);
                    }}>Login</Button>

        </Box>
    );
}