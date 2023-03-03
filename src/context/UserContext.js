import { createContext, useState, useEffect } from 'react';
import userService from '../services/user.service';

const UserContext = createContext();

export default UserContext;

export const UserContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');

        userService.getMe(token)
            .then((data) => {
                if ((data._id)) {
                    setUser(data);
                    setReady(true);
                }
            })
            .catch(err => console.log(err))

    }, []);

    const findUser = () => {

        const token = localStorage.getItem('token');

        userService.getMe(token)
            .then((data) => {
                if ((data._id)) {
                    setUser(data);
                    setReady(true);
                }
            })
            .catch(err => console.log(err))

    }

    const updateUserType = (newUser) => {
        setUser(newUser);
    }
    const logOut = () => {
        setUser();
        localStorage.removeItem('wishlist')
    }

    const context = {
        logOut,
        findUser,
        setUser,
        updateUserType,
        ready,
        user
    }

    return (
        <UserContext.Provider value={context}>
            {children}
        </UserContext.Provider>
    )

}



