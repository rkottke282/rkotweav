import { createContext, useState } from "react";

export const UserContext = createContext<any | null>(null);

export default function WithUserContext ({children}: any) {
    const [ user, setUser ] = useState<any | null>();
    return (
        <UserContext.Provider value={{user,setUser}} >
            {children}
        </UserContext.Provider>
    )
}
