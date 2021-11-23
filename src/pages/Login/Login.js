import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import './Login.scss';
import { useToasts } from 'react-toast-notifications';
import { CircularProgress } from '@material-ui/core';
import moment from 'moment';
import StyledInputWithIcon from '../../components/StyledInputWithIcon';
import * as managerService from '../../services/manager/managerService';
import Header from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useAuth } from '../../providers/auth';
import WarningModal from '../SentDocuments/WarningModal/WarningModal';

function Login() {
  const initialUser = {
    email: '',
    password: '',
  };
  const history = useHistory();
  const [usuario, setUsuario] = useState(initialUser);
  const { addToast } = useToasts();
  const [expandRightPanel, setExpandRightPanel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [contentWarningModal, setContentWarningModal] = useState('');
  const { setUser } = useAuth();
  const location = useLocation();

  const handleChange = (value, field) => {
    setUsuario({ ...usuario, [field]: value });
  };

  const handleClickClose = () => {
    setShowWarningModal(false);
  };

  const verifySecurity = async () => {
    const currentSecurityStatus = JSON.parse(localStorage.getItem('userSecurity'));
    if (currentSecurityStatus && currentSecurityStatus.attemptsNumber === 3) {
      if (moment() > moment(currentSecurityStatus.blockDate)
        || currentSecurityStatus.email !== usuario?.email) {
        localStorage.removeItem('userSecurity');
        return true;
      }
      setShowWarningModal(true);
      setContentWarningModal('após alguns minutos.');
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (localStorage.getItem('user')) {
      localStorage.removeItem('user');
    }
  }, []);

  const handleClick = async (e) => {
    const pathName = location.pathname;
    const path = pathName === '/login' ? pathName : `/login${pathName}`;
    setLoading(true);
    let userStorage;
    if (await verifySecurity() === true) {
      const currentSecurityStatus = JSON.parse(localStorage.getItem('userSecurity'));
      try {
        e.preventDefault();
        const response = await managerService.login(usuario, path);
        const fields = Object.keys(response.data.user).find((field) => field.includes('id'));
        const id = response.data.user[fields];
        if (response.data.user.name === undefined) {
          const resp = await managerService.getByIdCandidate(response.data.user.stud_candidate_id);
          setUser({
            name: resp.candidate_name,
            email: resp.candidate_email,
            type: 'aluno',
            acessToken: response.data.accessToken,
            id: response.data.user.stud_id,
          });
          localStorage.setItem('user', JSON.stringify({
            name: resp.candidate_name,
            email: resp.candidate_email,
            type: 'aluno',
            acessToken: response.data.accessToken,
            id: response.data.user.stud_id,
          }));
          history.push('/painel/aluno');
        } else {
          setUser({
            name: response.data.user.name,
            email: response.data.user.email,
            type: response.data.user.type,
            acessToken: response.data.accessToken,
            id,
          });
          history.push(`/painel/${response.data.user.type}`);
        }
        localStorage.removeItem('userSecurity');
      } catch {
        addToast('Acesso negado!', { appearance: 'error' });
        if (!currentSecurityStatus || currentSecurityStatus?.email !== usuario.email) {
          userStorage = {
            email: usuario.email,
            attemptsNumber: 1,
          };
        } else {
          switch (currentSecurityStatus.attemptsNumber) {
            case 2: {
              userStorage = {
                email: usuario.email,
                attemptsNumber: currentSecurityStatus.attemptsNumber + 1,
                blockDate: moment().add(15, 'minutes'),
              };
              setShowWarningModal(true);
              setContentWarningModal('após 15 minutos.');
              break;
            }
            default: {
              userStorage = {
                email: usuario.email,
                attemptsNumber: currentSecurityStatus.attemptsNumber + 1,
              };
            }
          }
        }
        localStorage.setItem('userSecurity', JSON.stringify(userStorage));
        setLoading(false);
      }
    }
    setLoading(false);
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
        {showWarningModal && (
          <WarningModal
            content={contentWarningModal}
            close={handleClickClose}
            className="WarningModalLoginScreen"
          />
        )}
      </div>
      <Footer />
    </div>
  );
}
export default Login;
