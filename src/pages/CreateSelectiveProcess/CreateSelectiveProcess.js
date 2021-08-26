import React, { useState } from 'react';
import './CreateSelectiveProcess.scss';
import { useToasts } from 'react-toast-notifications';
import processType from '../../utils/processType';
import Header from '../../components/Navbar';
import Footer from '../../components/Footer';
import StyledInput from '../../components/StyledInput';
import RightPanel from '../../components/Menu/RightPanel';
import * as managerService from '../../services/manager/managerService';

function registerDis() {
  const initialState = {
    process_type: '',
    process_name: '',
    process_date_begin: '',
    process_date_end: '',
  };
  const [dados, setDados] = useState(initialState);
  const { addToast } = useToasts();

  const handleChange = (value, field) => {
    setDados({ ...dados, [field]: value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (dados.process_type.length > 3
      && dados.process_name.length > 3
      && dados.process_date_begin !== ''
      && dados.process_date_end !== '') {
      await managerService.createSelectiveProcess(dados);
      addToast('Cadastro realizado com sucesso!', { appearance: 'success' });
    } else {
      addToast('Preencha todos os campos!', { appearance: 'error' });
    }
  };
  const [expandRightPanel, setExpandRightPanel] = useState(false);
  const inputProps = [
    {
      text: 'Página principal',
      path: '',
    },
    {
      text: 'Lista de estudantes',
      path: 'lista-estudantes',
    },
    {
      text: 'Visualizar Processos Seletivos',
      path: 'processos-seletivos',
    },
    {
      text: 'Cadastro de professores',
      path: 'formulario-professores',
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
    <div className="screen-ps">
      <Header expandRightPanel={expandRightPanel} setExpandRightPanel={setExpandRightPanel} />
      <h1> Cadastro de Processo Seletivo:</h1>
      <div className="form_SP_cad_box_title">
        <div className="form_SP_cad_title">
          Dados do Processo
        </div>
      </div>
      <div className="form_SP_cad_requerente">
        <div className="form_SP_cad_box">
          <div className="form_SP_cad_line">
            <div className="input-SPcontent">
              <div className="form_SP_cad_input">
                <StyledInput
                  type="text"
                  id="process_type"
                  label="Tipo de processo"
                  width="100%"
                  select
                  field={processType}
                  dados={dados}
                  setDados={handleChange}
                />
              </div>
            </div>
            <div className="input-SPcontent">
              <div className="form_SP_cad_input">
                <StyledInput
                  type="text"
                  id="process_name"
                  label="Nome do processo"
                  width="100%"
                  dados={dados}
                  setDados={handleChange}
                />
              </div>
            </div>
            <div className="input-SPcontent">
              <div className="form_SP_cad_input">
                <StyledInput
                  type="date"
                  shrink
                  id="process_date_begin"
                  label="Data de início"
                  width="100%"
                  dados={dados}
                  setDados={handleChange}
                />
              </div>
            </div>
            <div className="input-SPcontent">
              <div className="form_SP_cad_input">
                <StyledInput
                  type="date"
                  shrink
                  id="process_date_end"
                  label="Data de término"
                  width="100%"
                  dados={dados}
                  setDados={handleChange}
                />
              </div>
            </div>
            <div className="divButton-createSP">
              <button type="submit" onClick={handleClick}> Criar Processo Seletivo </button>
            </div>
          </div>
        </div>
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
export default registerDis;