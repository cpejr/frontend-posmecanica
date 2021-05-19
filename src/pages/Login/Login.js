import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.scss';
import { useToasts } from 'react-toast-notifications';
import StyledInputWithIcon from '../../components/StyledInputWithIcon';
import * as managerService from '../../services/manager/managerService';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

function Login() {
  const initialUser = {
    email: '',
    password: '',
    type: 'administrator',
  };
  const [user, setUser] = useState(initialUser);
  const { addToast } = useToasts();
  const handleClick = async (e) => {
    try {
      e.preventDefault();
      await managerService.login(user);
    } catch {
      addToast('Acesso negado!', { appearance: 'error' });
    }
  };

  return (
    <div className="Login-externalDiv">
      <Navbar />
      <div className="Login-screen">
        <div className="Login">
          <div className="Login-title">
            Login
          </div>
          <div className="Login-inputs">
            <StyledInputWithIcon
              type="text"
              id="email"
              label="Email"
              width="35vh"
              dados={user}
              setDados={setUser}
            />
            <StyledInputWithIcon
              type="password"
              id="password"
              label="Senha"
              width="35vh"
              dados={user}
              setDados={setUser}
            />
          </div>
          <div className="Login-botoes">
            <div className="Login-button1">
              <button type="button" onClick={handleClick}>Entrar</button>
            </div>
            <div className="Login-link">
              <Link to="login"> Esqueceu a senha? </Link>
            </div>
            <div className="Login-button2">
              <button type="button">Cadastrar-se</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default Login;
