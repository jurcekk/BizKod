import React, { createContext, useState } from 'react';

const AuthContext = createContext();
const AuthProvider = (props) => {
  const [user, setUser] = useState(true);
  const [userData, setUserData] = useState({
    email: 'dsadas',
    password: 'asdasd',
  });

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        userData,
        setUserData,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
