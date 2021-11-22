import React, { useState } from 'react';
import Header from '../../components/Navbar';
import Footer from '../../components/Footer';
import './NotFound.scss';

function NotFound() {
  const [expandRightPanel, setExpandRightPanel] = useState(false);
  return (
    <div className="Login-externalDiv">
      <Header expandRightPanel={expandRightPanel} setExpandRightPanel={setExpandRightPanel} />
      <div className="Login-screen">
        <div className="notFound-grid">
          <div className="robo-image">
            <img
              src="/Images/robo.jpg"
              alt="logotipo Universidade FEderal de Minas Gerais"
            />
          </div>
          <div className="notFount-boxText">
            <div className="notFound-text">
              <h1 className="notFound-title">Página não encontrada</h1>
              <p>
                Não foi possível encontrar a página que você estava procurando. Isso ocorre porque:
              </p>
              <p>
                - Há um erro no URL em seu navegador da web. Verifique o URL e tente novamnte.
              </p>
              <p>
                - A página que você está procurando foi movida ou excluída.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default NotFound;
