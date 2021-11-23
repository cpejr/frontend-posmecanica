import React, {
  useContext, useState, useEffect,
} from 'react';
import { useToasts } from 'react-toast-notifications';
import { useAuth } from './auth';
import * as managerService from '../services/manager/managerService';

export const AdminDoubtContext = React.createContext();

export function useAdminDoubtContext() {
  return useContext(AdminDoubtContext);
}

function AdminDoubtContextProvider({ children }) {
  const [doubts, setDoubts] = useState([]);
  const [total, setTotal] = useState(0);
  const [refetch, setRefetch] = useState(false);
  const { addToast } = useToasts();

  const { user } = useAuth();

  useEffect(() => {
    if (user && user.type === 'administrator') {
      managerService.getMessageByUserId(user.id, 'adm').then((res) => {
        const t = res.filter((m) => m.message_status === 'new');
        setTotal(t.length);
        setDoubts(res);
      }).catch((error) => {
        console.error(error);
        addToast('Erro ao buscar dúvidas', { appearance: 'error' });
      });
    }
  }, [user, refetch]);

  return (
    <AdminDoubtContext.Provider value={{ doubts, total, setRefetch }}>
      {children}
    </AdminDoubtContext.Provider>
  );
}

export default AdminDoubtContextProvider;
