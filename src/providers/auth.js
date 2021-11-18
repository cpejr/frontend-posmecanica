import React, { useEffect, useState } from 'react';

export const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    type: '',
    acessToken: '',
    id: '',
  });

  useEffect(() => {
    const userStorage = localStorage.getItem('user');
    if (userStorage) {
      setUser(JSON.parse(userStorage));
    } else {
      setUser({
        name: '',
        email: '',
        type: '',
        acessToken: '',
        id: '',
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);

export const logout = () => {
  localStorage.removeItem('user');
};
