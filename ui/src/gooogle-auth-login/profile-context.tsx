import { createContext, useEffect, useState } from "react";

export const ProfileContext = createContext<any | null>(null);

const STORAGE_PROFILE: string = 'googleAuthProfile';

export default function WithProfileContext ({children}:any) {
    const [ profile, setProfile ] = useState<any | null>(() => {
        const savedProfile = localStorage.getItem(STORAGE_PROFILE);
        return savedProfile ? JSON.parse(savedProfile) : null;
    });

    useEffect(() => {
        const savedProfile = localStorage.getItem(STORAGE_PROFILE);
        if (profile && !savedProfile) { 
            localStorage.setItem(STORAGE_PROFILE, JSON.stringify(profile));
        } else if (savedProfile && !profile) {
            localStorage.removeItem(STORAGE_PROFILE);
        }
    }, [profile]);

    return (
        <ProfileContext.Provider value={{profile,setProfile}} >
            {children}
        </ProfileContext.Provider>
    )
}
