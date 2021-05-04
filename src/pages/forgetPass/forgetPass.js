import { Button, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import '../../components/CampoText/campotxt';
import './forgetPass.scss';
import { createMuiTheme } from '@material-ui/core/styles';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ThemeProvider } from '@material-ui/styles';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import DrawerComponent from '../../components/Navbar/DrawerComponent/Drawer';
import TextBoxPassword from '../../components/TextBoxPassword';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#d32f2f',
    },
  },
});

function forgetPass() {
  const initialUser = {
    email: '',
    password: '',
    type: 'administrator',
  };
  // eslint-disable-next-line no-undef
  const [user, setUser] = useState(initialUser);

  return (
    <ThemeProvider theme={theme}>
      <div className="container">
        <Navbar />
        <DrawerComponent />
        <div className="conta">
          <div className="page">
            <h1>Crie Uma nova Senha</h1>

            <h2>Digite o código de acesso que enviamos para o seu e-mail.</h2>
            <div className="campos">
              <TextField
                className="campinho"
                label="Codigo de acesso"
                id="outlined-size-small"
                defaultValue="Digite o código de acesso"
                variant="outlined"
                size="small"
                color="primary"
              />
              <div className="text1">
                <TextBoxPassword
                  className="passbox"
                  user={user}
                  setUser={setUser}
                  variant="outlined"
                  label="Codigo de acesso"
                />
                <TextBoxPassword
                  className="passbox"
                  user={user}
                  setUser={setUser}
                  variant="outlined"
                  label="Codigo de acesso"
                />
              </div>
            </div>
            <div className="btn">
              <Button variant="contained" color="primary">
                Continuar
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default forgetPass;
