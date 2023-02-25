import { createContext, useState, useEffect } from 'react';
import userService from '../services/user.service';
const UserContext = createContext();

export default UserContext;

export const UserContextProvider = ({ children }) => {

    const [user, setUser] = useState();

    useEffect(() => {
        const token = localStorage.getItem('token');
        userService.getMe(token)
          .then((user) => {
            console.log("logged : ", user);
            setUser(user);
          })
          .catch(err => console.log(err))
      }, []);
    

    const context = {
        user
    }

    return (
        <UserContext.Provider value={context}>
            {children}
        </UserContext.Provider>
    )

}