import React from 'react';
import { ToastProvider } from 'react-toast-notifications';
import Routes from './routes';
import './global.scss';

function App() {
  return (
    <ToastProvider placement="bottom-right" autoDismiss autoDismissTimeout={4000}>
      <Routes />
    </ToastProvider>
  );
}

export default App;
