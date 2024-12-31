import React, { createContext, useContext, useEffect, useState } from 'react';
import {auth} from "./firebaseConfig";
import { onAuthStateChanged, signOut } from 'firebase/auth';



const AuthCntxt = React.createContext();

const AuthContext = ({children}) =>
{
    const [user, setUser] = useState("");
    useEffect(()=>
    {
        const unsubscribe = auth.onAuthStateChanged((currUser)=>
        {
            setUser(currUser);
        })

        return () => unsubscribe();
    }, [])

    const LogOutFunct = async (navigateFn, path) =>
    {
        try{
            await signOut(auth);
            console.log("User signed out successfully")
            navigateFn(path); 
        }
        catch (error)
        {
            console.log("Error logging out: " + error.message);
        }
    }
    return(
        <AuthCntxt.Provider value={{user, LogOutFunct}}>
            {children}
        </AuthCntxt.Provider>
    )
}

export default AuthContext;

export const useAuth = () => useContext(AuthCntxt);

