import React from 'react';
import { ToastProvider } from 'react-toast-notifications';
import Routes from './routes';
import './global.scss';
import AdminDoubtContextProvider from './providers/adminDoubt';

function App() {
  return (
    <ToastProvider placement="bottom-right" autoDismiss autoDismissTimeout={4000}>
      <AdminDoubtContextProvider>
        <Routes />
      </AdminDoubtContextProvider>
    </ToastProvider>
  );
}

export default App;
