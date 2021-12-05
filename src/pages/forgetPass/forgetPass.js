import { Button, TextField, InputAdornment } from '@material-ui/core';
import { FiMail } from 'react-icons/fi';
import { useToasts } from 'react-toast-notifications';
import React, { useState } from 'react';
import '../../components/CampoText/campotxt';
import './forgetPass.scss';
import { useHistory } from 'react-router-dom';
import * as managerService from '../../services/manager/managerService';
import Header from '../../components/SecondHeader';
import Footer from '../../components/Footer';

function esqueciSenha() {
  const [email, setEmail] = useState('');
  const { addToast } = useToasts();
  const history = useHistory();
  function confirmarEmail(e) {
    setEmail(e.target.value);
  }
  const sendEmail = {
    email,
  };
  const JSONtoSend = JSON.stringify(sendEmail);
  const handleClick = async (e) => {
    try {
      e.preventDefault();
      await managerService.sendResetEmail(JSONtoSend);
      history.push('/confirmacao');
      addToast('Email enviado com sucesso!', { appearance: 'success' });
    } catch {
      addToast('Email não cadastrado!', { appearance: 'error' });
    }
  };
  const [expandRightPanel, setExpandRightPanel] = useState(false);
  return (

    <div className="container">
      <Header expandRightPanel={expandRightPanel} setExpandRightPanel={setExpandRightPanel} />
      <div className="campos">

        <div className="coluna">
          <div className="text1">
            <h1>Informe seu email cadastrado</h1>
            <h2>Enviaremos para seu email um link para realizar a alteração da sua senha.</h2>
          </div>
          <TextField
            className="campinho"
            label="Informe seu email"
            id="input-with-icon-textfield"
            variant="filled"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FiMail />
                </InputAdornment>
              ),
            }}
            onChange={(e) => confirmarEmail(e)}
          />
          <div>
            <Button variant="contained" color="primary" onClick={handleClick}>
              Continuar
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default esqueciSenha;
