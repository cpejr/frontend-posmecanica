import React from 'react';
import './BoxDashboardAdministrator.scss';
import InscritoPS from '../../InscritoPS';

function BoxDashboardAdministrator() {
  return (
    <div className="tela">
      <div className="tituloPrincipal"> Processo Seletivo </div>
      <div className="tituloSecundario"> Lista de Inscritos: </div>
      <div className="aba">
        <div className="inscritos">
          <InscritoPS name="Gustavo almeida baracho" />
          <InscritoPS name="Gustavo almeida baracho" />
          <InscritoPS name="Gustavo almeida baracho" />
          <InscritoPS name="Gustavo almeida baracho" />
        </div>
      </div>
    </div>
  );
}

export default BoxDashboardAdministrator;
