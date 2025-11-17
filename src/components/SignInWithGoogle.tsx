import Typography from '@mui/material/Typography';
import GoogleIcon from '@mui/icons-material/Google';
import {GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {logEvent} from "firebase/analytics";
import {analytics, auth} from "../helper/firebase.ts";
import type {Dispatch, SetStateAction} from "react";

type Props = {
    updateUserCallback: Dispatch<SetStateAction<typeof auth.currentUser | null>>
}

export default function SignInWithGoogleButton({updateUserCallback}: Props) {

    async function loginWithGoogle() {
        try {
            const googleProvider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, googleProvider);
            logEvent(analytics, "login", {method: "google", user_id: result.user.uid});
            updateUserCallback(result.user);
        } catch (err) {
            console.error("Google login failed:", err);
            // show user-friendly error message
        }
        return null;
    }

    return (
        <div style={{
            padding: "1rem",
            borderRadius: "100px",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
        }}
             onClick={() => {
                 loginWithGoogle()
             }}
        >
            <GoogleIcon/>
            <Typography variant="body2" paddingLeft={"10px"}>Sign In With Google</Typography>
        </div>
    )
}