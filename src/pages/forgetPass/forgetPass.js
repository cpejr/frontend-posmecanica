import { Button, TextField } from '@material-ui/core';
import React from 'react';
import '../../components/CampoText/campotxt';
import './forgetPass.scss';
import { createMuiTheme } from '@material-ui/core/styles';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ThemeProvider } from '@material-ui/styles';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import DrawerComponent from '../../components/Navbar/DrawerComponent/Drawer';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#d32f2f',
    },
  },
});

function forgetPass() {
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
              <TextField
                className="campinho"
                label="senha"
                id="outlined-size-small"
                defaultValue="Senha"
                variant="outlined"
                size="small"
              />
              <TextField
                className="campinho"
                label="senha"
                id="outlined-size-small"
                defaultValue="Senha"
                variant="outlined"
                size="small"
              />
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
