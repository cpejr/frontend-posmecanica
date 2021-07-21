import { Button, TextField } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import '../../components/CampoText/campotxt';
import './forgetPass.scss';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import * as managerService from '../../services/manager/managerService';
import { useAuth } from '../../providers/auth';

function esqueciSenha() {
  const [senha, setSenha] = useState();
  const [confirmar, setConfirmada] = useState();
  const [disabled, setDesabled] = useState(true);
  const [email, setEmail] = useState('');
  const { user } = useAuth();
  function novasenha(e) {
    setSenha(e.target.value);
  }
  function confirmarEmail(e) {
    setEmail(e.target.value);
  }
  useEffect(() => {
    if (senha === confirmar) {
      setDesabled(false);
    } else {
      setDesabled(true);
    }
  }, [senha, confirmar]);

  const handleClick = async () => {
    const sendEmail = {
      email,
    };
    const JSONtoSend = JSON.stringify(sendEmail);
    await managerService.sendResetEmail(JSONtoSend);
  };

  return (

    <div className="container">
      <Navbar />
      <div className="campos">

        <div className="coluna">
          <div className="text1">
            <h1>Crie uma nova senha</h1>
            <h2>Digite o código de acesso que enviamos para o seu e-mail.</h2>
          </div>
          {/* <TextField
            className="campinho"
            label="Digite a nova senha"
            id="outlined-size-small"
            variant="outlined"
            size="small"
            onChange={(e) => novasenha(e)}
          /> */}
          <TextField
            className="campinho"
            label="Confirmar o email"
            id="outlined-size-small"
            variant="outlined"
            size="small"
            onChange={(e) => confirmarEmail(e)}
          />
          <div>
            <Button variant="contained" color="primary" disabled={disabled} onClick={handleClick}>
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
