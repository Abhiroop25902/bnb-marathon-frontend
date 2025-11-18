import {initializeApp} from "firebase/app";
import {browserSessionPersistence, getAuth} from "firebase/auth";
import {getAnalytics} from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyDegiMyYGyllIynXXq_6a6FODbKemmK0Nk",
    authDomain: "bnb-marathon-478216.firebaseapp.com",
    projectId: "bnb-marathon-478216",
    storageBucket: "bnb-marathon-478216.firebasestorage.app",
    messagingSenderId: "569093928388",
    appId: "1:569093928388:web:03ec5f356fedc264f7e091",
    measurementId: "G-J3HS68MH7R"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
auth.setPersistence(browserSessionPersistence).then(() => console.log('Persistence setup successfully'));
export const analytics = getAnalytics(app);

