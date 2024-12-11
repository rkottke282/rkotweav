import { createContext, useEffect, useState } from "react";

export const UserContext = createContext<any | null>(null);

const STORAGE_USER: string = 'googleAuthUser';

export default function WithUserContext ({children}: any) {
    const [ user, setUser ] = useState<any | null>(() => {
        const savedUser = localStorage.getItem(STORAGE_USER);
        return savedUser ? JSON.parse(savedUser) : null;
    });

    useEffect(() => {
        const savedUser = localStorage.getItem(STORAGE_USER);
        if (user && !savedUser) {
            localStorage.setItem(STORAGE_USER, JSON.stringify(user));
        } else if (savedUser && !user) {
            localStorage.removeItem(STORAGE_USER);
        }
    }, [user]);

    return (
        <UserContext.Provider value={{user,setUser}} >
            {children}
        </UserContext.Provider>
    )
}
