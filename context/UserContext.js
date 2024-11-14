import React, {createContext, useState, useContext} from 'react';
const UserContext = createContext();
export const UserProvider = ({children}) => {
  const [userData, setUserData] = useState({
    phoneNumber: '',
    user_id: '',
    businessName: '',
    businessIndustry: '',
    businessType: '',
    email: '',
  });

  return (
    <UserContext.Provider value={{userData, setUserData}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserData = () => useContext(UserContext);
