import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Login.scss';
import { useToasts } from 'react-toast-notifications';
import { CircularProgress } from '@material-ui/core';
import StyledInputWithIcon from '../../../components/StyledInputWithIcon';
import * as managerService from '../../../services/manager/managerService';
import Header from '../../../components/Navbar';
import Footer from '../../../components/Footer';

function LoginAdm() {
  const initialUser = {
    email: '',
    password: '',
  };
  const [user, setUser] = useState(initialUser);
  const { addToast } = useToasts();
  const [expandRightPanel, setExpandRightPanel] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleChange = (value, field) => {
    setUser({ ...user, [field]: value });
  };

  const handleClick = async (e) => {
    setLoading(true);
    try {
      e.preventDefault();
      await managerService.loginAdm(user);
    } catch {
      addToast('Acesso negado!', { appearance: 'error' });
      setLoading(false);
    }
  };

  return (
    <div className="Login-externalDiv">
      <Header expandRightPanel={expandRightPanel} setExpandRightPanel={setExpandRightPanel} />
      <div className="Login-screen">
        <div className="Login">
          <div className="Login-title">
            LoginAdm
          </div>
          <div className="Login-inputs">
            <StyledInputWithIcon
              type="text"
              id="email"
              label="Email"
              dados={user}
              setDados={handleChange}
            />
            <StyledInputWithIcon
              type="password"
              id="password"
              label="Senha"
              dados={user}
              setDados={handleChange}
            />
          </div>
          <div className="Login-buttons">
            <div className="Login-button1">
              <button type="button" onClick={handleClick}>
                {loading ? <CircularProgress size={24} color="inherit" /> : <p>Entrar</p>}
              </button>
            </div>
            <div className="Login-link">
              <Link to="esqueci-senha"> Esqueceu a senha? </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default LoginAdm;
