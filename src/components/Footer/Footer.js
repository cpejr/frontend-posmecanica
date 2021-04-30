import React from 'react';

// eslint-disable-next-line camelcase
import logo_ufmg from '../../Assets/logo_negativo_ufmg.svg';
import './Footer.scss';
// eslint-disable-next-line camelcase
import logo_cpe from '../../Assets/logo_cpe_amarela.svg';

export default function Footer() {
  return (
    <footer className="footer">
      <img
        className="imagem"
        // eslint-disable-next-line camelcase
        src={logo_ufmg}
        alt="logotipo Universidade FEderal de Minas Gerais"
      />
      <h1 className="text">Feito por cpeJR</h1>
      <img
        className="imagemC"
        // eslint-disable-next-line camelcase
        src={logo_cpe}
        alt="logotipo Universidade FEderal de Minas Gerais"
      />
    </footer>
  );
}
