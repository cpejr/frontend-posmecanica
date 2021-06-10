import React, { useState } from 'react';
import './registerDis.scss';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import SiteHeader from '../../components/SiteHeader';
import StyledInput from '../../components/StyledInput';
import enumm from '../../Utils/enum';
import boolean from '../../Utils/boolean';
import semester from '../../Utils/semester';
import * as managerService from '../../services/manager/managerService';

const booleans = boolean;
function registerDis() {
  const initialState = {
    discipline_name: '',
    discipline_code: '',
    discipline_is_isolated: '',
    discipline_semester: '',
    discipline_type: '',

  };
  const [dados, setDados] = useState(initialState);
  const history = useHistory();
  const { addToast } = useToasts();

  // eslint-disable-next-line no-unused-vars
  const handleClick = async (e) => {
    e.preventDefault();
    if (dados.discipline_name.length > 3
        && dados.discipline_code.length > 3
        && dados.discipline_semester.length > 3) {
      await managerService.createDiscipline(dados, '8c81278b-691e-4221-b87f-b1901cecda1d');
      history.push('/');
      addToast('Cadastro realizado com sucesso!', { appearance: 'success' });
    } else {
      addToast('Preencha todos os campos!', { appearance: 'error' });
    }
  };
  return (
    <div className="screen-ps">
      <SiteHeader />
      <h1> Cadastro de Disciplinas:</h1>
      <div className="form_dis_ps_box_title">
        <div className="form_dis_ps_title">
          Dados da Disciplina
        </div>
      </div>
      <div className="form_dis_ps_requerente">
        <div className="form_dis_ps_line">
          <div className="form_dis_ps_line">
            <div className="input-content">

              <div className="form_dis_ps_input">
                <StyledInput
                  type="text"
                  id="discipline_name"
                  label="Nome"
                  width="16rem"
                  dados={dados}
                  setDados={setDados}
                />
              </div>
              <div className="form_dis_ps_input" />
              <StyledInput
                type="text"
                id="discipline_code"
                label="Código da Disciplina"
                width="16rem"
                dados={dados}
                setDados={setDados}
              />
            </div>
            <div className="form_dis_ps_line">
              <div className="form_dis_ps_input">
                <StyledInput
                  type="text"
                  id="discipline_semester"
                  label="Período Ofertado"
                  width="16rem"
                  select
                  field={semester}
                  dados={dados}
                  setDados={setDados}
                />
              </div>

              <div className="form_dis_ps_input">
                <StyledInput
                  type="text"
                  id="discipline_is_isolated"
                  label="Disciplina Isolada"
                  width="16rem"
                  field={booleans}
                  select
                  dados={dados}
                  setDados={setDados}
                />

                <div className="form_dis_ps_input" />
                <StyledInput
                  type="text"
                  id="discipline_type"
                  label="Conteúdo"
                  field={enumm}
                  select
                  width="16rem"
                  dados={dados}
                  setDados={setDados}
                />
              </div>
              <div className="form_dis_ps_input" />
              <StyledInput
                type="text"
                id="discipline_content"
                label="Conteúdo"
                width="16rem"
                dados={dados}
                setDados={setDados}
              />
            </div>
            <div className="divButton-ps">
              <button type="submit" onClick={handleClick}> Cadastrar </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
export default registerDis;
