import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CssBaseline } from "@material-ui/core";
import { AuthProvider } from './providers/auth';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <CssBaseline />
      <App />
    </AuthProvider>
  </React.StrictMode>,

  document.getElementById('root'),
);
