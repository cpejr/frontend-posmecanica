import React, { useState, useEffect } from 'react';
import * as managerService from '../services/manager/managerService';

export const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    type: '',
    acessToken: '',
    id: '',
  });

  useEffect(async () => {
    const getStorage = JSON.parse(localStorage.getItem('user'));
    let response;
    if (getStorage?.type === 'administrator' && user.acessToken === '') {
      response = await managerService.getByIdAdm(getStorage.id);
      setUser({
        name: response.adm_name,
        email: response.adm_email,
        type: getStorage.type,
        acessToken: getStorage.acessToken,
        id: response.adm_id,
      });
    } else if (getStorage?.type === 'professor' && user.acessToken === '') {
      response = await managerService.getByIdProfessor(getStorage.id);
      setUser({
        name: response.prof_name,
        email: response.prof_email,
        type: getStorage.type,
        acessToken: getStorage.acessToken,
        id: response.prof_id,
      });
    } else if (getStorage?.type === 'student' && user.acessToken === '') {
      const StudentPerson = await managerService.getByIdStudent(getStorage.id);
      response = await managerService.getByIdCandidate(StudentPerson.stud_candidate_id);
      // TO DO
    }
  }, [user]);

  const [token, setToken] = useState();

  // useEffect(() => {
  //   const userStorage = localStorage.getItem('user');
  //   if (userStorage) {
  //     setUser(JSON.parse(userStorage));
  //   } else {
  //     setUser({
  //       name: '',
  //       email: '',
  //       type: '',
  //       acessToken: '',
  //       id: '',
  //     });
  //   }
  // }, []);

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      token,
      setToken,
      logout,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
