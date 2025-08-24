import { createContext, useState } from 'react';

export const UserContext = createContext();
export const UserProvider = ({ children }) => {
    const [userName, setUserName] = useState('');
    const updateUserName = (newName) => {
        setUserName(newName);
    };
    return(
        <UserContext.Provider value={{ userName, updateUserName}}></UserContext.Provider>
        
    )
}