import { Button } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../../../components/Footer';
import Navbar from '../../../components/SecondHeader';
import './Confirmation.scss';

function Confirmation() {
  const history = useHistory();

  const handleClick = () => {
    history.push('/login');
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
