import React from "react";

const UserContext = React.createContext({
  signedIn: false
});

export const UserContextProvider = ({ children }) => {
  const [signedIn, setSignedIn] = React.useState(false);

  return (
    <UserContext.Provider value={{ signedIn, }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => React.useContext(UserContext);