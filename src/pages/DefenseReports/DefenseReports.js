/*eslint-disable*/
import React, { useState } from "react";
import Header from "../../components/Navbar";
import Footer from "../../components/Footer";
import infos from '../../utils/Reports';
import RightPanel from "../../components/Menu/RightPanel";
import './DefenseReports.scss';
import StudentReports from '../../components/StudentReport/StudentReport'

function DefenseReports({ location }) {
  const [expandRightPanel, setExpandRightPanel] = useState(false);
  const inputProps = [
    {
      text: 'Página principal',
      path: 'administrator',
    },
    {
      text: 'Lista de estudantes',
      path: 'administrator/lista-estudantes',
    },
    {
      text: 'Lista de Disciplinas',
      path: 'administrator/lista-isoladas',
    },
    {
      text: 'Criar processo seletivo',
      path: 'administrator/criar-processo-seletivo',
    },
    {
      text: 'Visualizar Processos Seletivos',
      path: 'processos-seletivos',
    },
    {
      text: 'Lista de professores',
      path: 'lista-professores',
    },
    {
      text: 'Cadastro de professores',
      path: 'administrator/formulario-professores',
    },
    {
      text: 'Cadastro de disciplina isolada',
      path: 'administrator/cadastro-disciplina',
    },
    {
      text: 'Enviar Notificação',
      path: 'administrator/criar-notificacao',
    },
    {
      text: 'Redefinição de senha',
      path: 'esqueci-senha',
    },
  ];
  const renderLine = (docs) => {
    return (
      <div key={docs.types[0]} className="defenseReport-line">
        <StudentReports
          type={docs.types[0]}
          text={docs.text}
          path={docs.path[0]}
          location={location}
        >
          {docs.icons[0]}
        </StudentReports>
        <StudentReports
          type={docs.types[1]}
          text={docs.text}
          path={docs.path[1]}
          location={location}
        >
          {docs.icons[1]}
        </StudentReports>
        <StudentReports
          type={docs.types[2]}
          text={docs.text}
          path={docs.path[2]}
          location={location}
        >
          {docs.icons[2]}
        </StudentReports>
      </div>
    );
  };

  const renderInfo = (info) => (
    <div key={info.text} className="defenseReport-box">
      <div className="defenseReport-title">
        {info.text}
      </div>
      {info.docs.map((line) => renderLine(line))}
    </div>
  );


  return (
    <div className="defenseReport-root">
      <Header
        expandRightPanel={expandRightPanel}
        setExpandRightPanel={setExpandRightPanel}
      />
      <div className="defenseReport-container">
      {infos.map((info) => renderInfo(info))}
        <RightPanel
          inputProps={inputProps}
          expandRightPanel={expandRightPanel}
          setExpandRightPanel={setExpandRightPanel}
        />
      </div>
      <Footer />
    </div>
  );
}
export default DefenseReports;