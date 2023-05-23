import React, { createContext, useState } from 'react';

export const UserProvider = createContext(null);

const UserListProvider = ({children}) => {

    const [userList, setUserList] = useState(null);
    const [isLogged, setIsLogged] = useState(false);

  return (
    <UserProvider.Provider value={{ userList, setUserList, isLogged, setIsLogged }}>
        {children}
    </UserProvider.Provider>
  )
}

export default UserListProvider;