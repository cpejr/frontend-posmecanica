import React from "react";

import logo_ufmg from "../../Assets/logo_negativo_ufmg.svg";
import "./Footer.scss";
import logo_cpe from "../../Assets/logo_cpe_amarela.svg";

export default function Footer() {
  return (
    <footer className="footer">
      <img
        className="imagem"
        src={logo_ufmg}
        alt="logotipo Universidade FEderal de Minas Gerais"
      />
      <h1 className="text">Feito por cpeJR</h1>
      <img
        className="imagemC"
        src={logo_cpe}
        alt="logotipo Universidade FEderal de Minas Gerais"
      />
    </footer>
  );
}
