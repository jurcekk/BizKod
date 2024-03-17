import React, { createContext, useState } from 'react';

const AuthContext = createContext();
const AuthProvider = (props) => {
  const [user, setUser] = useState(false);
  const [userData, setUserData] = useState(null);

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
