import React, { useState } from 'react';
import moment from 'moment';
import './CreateSelectiveProcess.scss';
import { useHistory } from 'react-router-dom';
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
    process_semester: '',
  };
  const [dados, setDados] = useState(initialState);
  const history = useHistory();
  const { addToast } = useToasts();

  const handleChange = (value, field) => {
    setDados({ ...dados, [field]: value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (dados.process_date_begin < dados.process_date_end) {
      if (dados.process_type.length > 3
        && dados.process_name.length > 3
        && dados.process_date_begin !== ''
        && dados.process_date_end !== ''
        && dados.process_semester.length === 5) {
        const year = dados.process_semester.substr(0, 4);
        const semester = dados.process_semester.substr(4, 5);
        dados.process_semester = year.concat('/').concat(semester);
        if (semester === '1' || semester === '2') {
          dados.process_date_begin = moment(dados.process_date_begin).format();
          dados.process_date_end = moment(dados.process_date_end).set({
            hour: 23, minute: 59, second: 59, millisecond: 59,
          }).format();
          const verify = await managerService.verifySelectiveProcess('process_type', dados);
          if (verify.length === 0) {
            await managerService.createSelectiveProcess(dados);
            addToast('Processo Seletivo criado com sucesso!', { appearance: 'success' });
            history.push('/painel/processos-seletivos');
          } else {
            addToast('Já há um processo em andamento na data escolhida!', { appearance: 'error' });
          }
        } else {
          addToast('Insira um semestre válido!', { appearance: 'error' });
        }
      } else {
        addToast('Preencha todos os campos corretamente!', { appearance: 'error' });
      }
    } else {
      addToast('Data inválida!', { appearance: 'error' });
    }
  };
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
      text: 'Cadastro de disciplina',
      path: 'administrator/cadastro-disciplina',
    },
    {
      text: 'Enviar Notificação',
      path: 'administrator/criar-notificacao',
    },
    {
      text: 'Visualizar Teses',
      path: 'administrator/teses',
    },
    {
      text: 'Redefinição de senha',
      path: 'esqueci-senha',
    },
  ];
  return (
    <div className="screen-CreateProcess">
      <Header expandRightPanel={expandRightPanel} setExpandRightPanel={setExpandRightPanel} />
      <div className="form-CreatSelectiveProcess-title">
        <h1> Cadastro de Processo Seletivo:</h1>
      </div>
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
                  type="text"
                  id="process_semester"
                  label="Ano/Semestre"
                  width="100%"
                  placeholder="xxxx/x"
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
