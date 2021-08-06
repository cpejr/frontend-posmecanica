import React, { useState } from 'react';
import Header from '../../components/Navbar';
import Footer from '../../components/Footer';
import './ThesesPost.scss';
import RightPanel from '../../components/Menu/RightPanel';

function ThesesPost() {
  const [expandRightPanel, setExpandRightPanel] = useState(true);

  const inputProps = [
    {
      text: 'Página principal',
      path: 'lista-estudantes',
    },
    {
      text: 'Criar processo seletivo',
      path: '/',
    },
    {
      text: 'Postagens de teses',
      path: '/',
    },
    {
      text: 'Cadastro de professores',
      path: 'lista-professores',
    },
    {
      text: 'Cadastro de disciplina isolada',
      path: 'cadastro-disciplina',
    },
    {
      text: 'Redefinição de senha',
      path: 'esqueci-senha',
    },
  ];

  return (
    <div className="thesesPost-root">
      <Header expandRightPanel={expandRightPanel} setExpandRightPanel={setExpandRightPanel} />
      <div className="thesesPost-content">
        <RightPanel inputProps={inputProps} expandRightPanel={expandRightPanel} />
        <h1>sla</h1>
      </div>
      <Footer />
    </div>
  );
}
export default ThesesPost;
