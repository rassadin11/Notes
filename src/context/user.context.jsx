/* eslint-disable indent */
import { createContext, useState } from 'react';

export const UserContext = createContext({
    userId: 1
});

export const UserContextProvider = ({children}) => {
	const [userId, setUserId] = useState(1);
    const [modifyPost, setModifyPost] = useState(0);

    return <UserContext.Provider value={{userId, setUserId, modifyPost, setModifyPost}}>
            {children}
        </UserContext.Provider>;
};