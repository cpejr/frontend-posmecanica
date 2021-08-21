import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.scss';
import { useToasts } from 'react-toast-notifications';
import StyledInputWithIcon from '../../components/StyledInputWithIcon';
import * as managerService from '../../services/manager/managerService';
import Header from '../../components/Navbar';
import Footer from '../../components/Footer';

function Login() {
  const initialUser = {
    email: '',
    password: '',
  };
  const [user, setUser] = useState(initialUser);
  const { addToast } = useToasts();
  const [expandRightPanel, setExpandRightPanel] = useState(false);
  const handleChange = (value, field) => {
    setUser({ ...user, [field]: value });
  };

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
      <Header expandRightPanel={expandRightPanel} setExpandRightPanel={setExpandRightPanel} />
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
              setDados={handleChange}
            />
            <StyledInputWithIcon
              type="password"
              id="password"
              label="Senha"
              width="35vh"
              dados={user}
              setDados={handleChange}
            />
          </div>
          <div className="Login-buttons">
            <div className="Login-button1">
              <button type="button" onClick={handleClick}>ENTRAR</button>
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
export default Login;
