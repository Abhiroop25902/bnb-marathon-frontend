import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { auth } from "./helper/firebase";
import { onAuthStateChanged, browserSessionPersistence } from "firebase/auth";
import { globalState } from "./helper/GlobalState";

import HomePage from "./pages/HomePage";
import HistoryPage from "./pages/HistoryPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";

export default function App() {
  const loggedInUser = globalState((s) => s.loggedInUser);
  const setLoggedInUser = globalState((s) => s.setLoggedInUser);
  const persistenceInitialized = globalState((s) => s.persistenceInitialized);
  const setPersistenceInitialized = globalState((s) => s.setPersistenceInitialized);

  // 1) Setup Persistence — only once
  useEffect(() => {
    auth.setPersistence(browserSessionPersistence).finally(() => {
      setPersistenceInitialized(true);
    });
  }, [setPersistenceInitialized]);

  // 2) Listen to Firebase login state — only once
  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setLoggedInUser(user || null);
    });
  }, [setLoggedInUser]);

  // Wait until Firebase finishes initializing
  if (!persistenceInitialized) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN PAGE — public, but redirect if already logged in */}
        <Route
          path="/login"
          element={
            loggedInUser ? <Navigate to="/" replace /> : <LoginPage />
          }
        />

        {/* PROTECTED ROUTES */}
        <Route
          path="/"
          element={
            loggedInUser ? <HomePage /> : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/history"
          element={
            loggedInUser ? <HistoryPage /> : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/profile"
          element={
            loggedInUser ? <ProfilePage /> : <Navigate to="/login" replace />
          }
        />

        {/* Fallback */}
        <Route
          path="*"
          element={<Navigate to={loggedInUser ? "/" : "/login"} replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}
