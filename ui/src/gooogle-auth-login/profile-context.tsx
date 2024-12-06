import { createContext, useState } from "react";

export const ProfileContext = createContext<any | null>(null);

export default function WithProfileContext ({children}:any) {
    const [ profile, setProfile ] = useState<any | null>();
    return (
        <ProfileContext.Provider value={{profile,setProfile}} >
            {children}
        </ProfileContext.Provider>
    )
}
