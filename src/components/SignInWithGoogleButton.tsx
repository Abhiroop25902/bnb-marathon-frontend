import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';
import {GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {logEvent} from "firebase/analytics";
import {analytics, auth} from "../helper/firebase.ts";


export default function SignInWithGoogleButton() {

    async function loginWithGoogle() {
        try {
            const googleProvider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, googleProvider);
            logEvent(analytics, "login", {method: "google", user_id: result.user.uid});
        } catch (err) {
            console.error("Google login failed:", err);
            // show user-friendly error message
        }
        return null;
    }

    return (
        <Button variant="contained"
                onClick={() => {
                    loginWithGoogle()
                }}
                sx={{marginTop: '0.5rem', height: '3rem', gap: '0.5rem'}}
        >
            <GoogleIcon/>
            <Typography variant="body2">Sign In With Google</Typography>
        </Button>
    )
}