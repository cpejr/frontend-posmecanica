import { Button } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../../../components/Footer';
import Navbar from '../../../components/Navbar';
import './Confirmation.scss';
import { useAuth } from '../../../providers/auth';

function Confirmation() {
  const history = useHistory();
  const { user } = useAuth();

  const handleClick = () => {
    if (user.type === 'administrator') {
      history.push('/consoleposmec');
    } else {
      history.push('/login');
    }
  };

  return (
    <div className="container">
      <Navbar />
      <div className="campos">
        <div className="coluna">
          <div className="text">
            <h1>Confira seu email</h1>
            <h2>
              Te enviamos um email com um link para alterar sua senha,
              após alterá-la faça login novamente
            </h2>
          </div>
          <div>
            <Button variant="contained" color="primary" onClick={handleClick}>
              Fazer Login
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Confirmation;
