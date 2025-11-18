import {create} from "zustand/react";
import {auth} from "./firebase.ts";


type StateType = {
    loggedInUser: typeof auth.currentUser
    setLoggedInUser: CallableFunction
}

export const globalState = create<StateType>(set => ({
    loggedInUser: null,
    setLoggedInUser: (newUser: StateType["loggedInUser"]) => set({loggedInUser: newUser})
}))

