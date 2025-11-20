import {useEffect} from 'react';
import {auth} from './helper/firebase';
import {browserSessionPersistence, onAuthStateChanged} from 'firebase/auth';
import {globalState} from './helper/GlobalState';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router';
import Layout from './Layout.tsx';
import HistoryPage from './pages/HistoryPage.tsx';
import ProfilePage from './pages/ProfilePage.tsx';
import OnboardingPage from './pages/OnboardingPage.tsx';
import HomePage from './pages/HomePage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import Loader from './components/Loader.tsx';
import axios from 'axios';
import {z} from 'zod';
import UserSchema from './schema/UserSchema.ts';
import {getJSDateFromFirestoreDate} from './helper/helper.ts';

export default function App() {
    const loggedInUser = globalState((s) => s.loggedInUser);
    const setLoggedInUser = globalState((s) => s.setLoggedInUser);
    const persistenceInitialized = globalState((s) => s.persistenceInitialized);
    const setPersistenceInitialized = globalState((s) => s.setPersistenceInitialized);
    const userInfo = globalState((s) => s.userInfo);
    const setUserInfo = globalState((s) => s.setUserInfo);

    const url = 'https://bnb-marathon-backend-569093928388.asia-east1.run.app';

    async function fetchUserDetails() {
        const idToken = await loggedInUser!.getIdToken();
        try {
            const res = await axios.get(`${url}/user/me`, {
                headers: {
                    Authorization: `Bearer ${idToken}`
                }
            });
            const completedAt = res.data.onboarding.completedAt;
            const lastPeriodStart = res.data.cycle.lastPeriodStart;

            res.data.onboarding.completedAt = getJSDateFromFirestoreDate(completedAt);
            res.data.cycle.lastPeriodStart = getJSDateFromFirestoreDate(lastPeriodStart);
            const resultSchema = UserSchema;
            const data: z.infer<typeof UserSchema> = resultSchema.parse(res.data);
            setUserInfo(data);
        } catch (err) {
            console.error(err);
        }
    }

    // 1) Setup Persistence — only once
    useEffect(() => {
        auth.setPersistence(browserSessionPersistence).finally(() => {
            setPersistenceInitialized(true);
        });
    }, [setPersistenceInitialized]);

    // 2) Listen to Firebase login state — only once
    useEffect(() => {
        return onAuthStateChanged(auth, (user) => {
            console.log(user, user?.uid);
            setLoggedInUser(user || null);
        });
    }, [setLoggedInUser]);

    useEffect(() => {
        if (loggedInUser) {
            fetchUserDetails();
        }
    }, [loggedInUser]);

    useEffect(() => {
        console.log('userInfo updated:', userInfo);
    }, [userInfo]);

    if (!persistenceInitialized) {
        return <Loader></Loader>;
    }

    if (!loggedInUser) {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="*" element={<Navigate to="/login" replace/>}/>
                </Routes>
            </BrowserRouter>
        );
    }

    // @ts-expect-error err
    if (!userInfo || !userInfo.onboarding) {
        return <Loader></Loader>;
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/login"
                    element={<Navigate to="/" replace/>}
                />

                <Route element={<Layout/>}>
                    <Route
                        path="/"
                        element={
                            // @ts-expect-error err
                            userInfo.onboarding.completed
                                ? <HomePage/>
                                : <OnboardingPage/>
                        }
                    />
                    <Route path="/history" element={<HistoryPage/>}/>
                    <Route path="/profile" element={<ProfilePage/>}/>
                    <Route path="/onboarding" element={<OnboardingPage/>}/>
                    <Route path="/home" element={<HomePage/>}/>
                </Route>

                <Route path="*" element={<Navigate to="/" replace/>}/>
            </Routes>
        </BrowserRouter>
    );

}
