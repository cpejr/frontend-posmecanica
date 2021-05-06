import React from 'react';
import './Footer.scss';
import logoCpe from '../../Assets/logo_cpe_amarela.svg';

export default function Footer() {
  return (
    <footer className="footer">
      <img
        className="imagem"
        src="/Images/logo-ufmg-branca.png"
        alt="logotipo Universidade FEderal de Minas Gerais"
      />
      <h1 className="text">Feito por cpeJR</h1>
      <img
        className="imagemC"
        src={logoCpe}
        alt="logotipo Universidade FEderal de Minas Gerais"
      />
    </footer>
  );
}
