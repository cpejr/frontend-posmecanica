import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../Login.scss';
import { useToasts } from 'react-toast-notifications';
import { CircularProgress } from '@material-ui/core';
import StyledInputWithIcon from '../../../components/StyledInputWithIcon';
import * as managerService from '../../../services/manager/managerService';
import Header from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { useAuth } from '../../../providers/auth';

function LoginAdm() {
  const initialUser = {
    email: '',
    password: '',
  };
  const history = useHistory();
  const [usuario, setUsuario] = useState(initialUser);
  const { addToast } = useToasts();
  const [expandRightPanel, setExpandRightPanel] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuth();

  const handleChange = (value, field) => {
    setUsuario({ ...usuario, [field]: value });
  };

  useEffect(() => {
    if (localStorage.getItem('user')) {
      localStorage.removeItem('user');
    }
  }, []);

  const handleClick = async (e) => {
    setLoading(true);
    try {
      e.preventDefault();
      const response = await managerService.login(usuario);
      const fields = Object.keys(response.data.user).find((field) => field.includes('id'));
      const id = response.data.user[fields];
      setUser({
        name: response.data.user.name,
        email: response.data.user.email,
        type: response.data.user.type,
        acessToken: response.data.accessToken,
        id,
      });
      history.push(`/painel/${response.data.user.type}`);
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
              width="100%"
              dados={usuario}
              setDados={handleChange}
            />
            <StyledInputWithIcon
              type="password"
              id="password"
              label="Senha"
              width="100%"
              dados={usuario}
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
