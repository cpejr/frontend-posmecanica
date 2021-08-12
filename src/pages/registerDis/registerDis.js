import React, { useState } from 'react';
import './registerDis.scss';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import SiteHeader from '../../components/SiteHeader';
import StyledInput from '../../components/StyledInput';
import enumm from '../../utils/enum';
import boolean from '../../utils/boolean';
import semester from '../../utils/semester';
import * as managerService from '../../services/manager/managerService';

const booleans = boolean;
function registerDis() {
  const initialState = {
    discipline_name: '',
    discipline_code: '',
    discipline_is_isolated: '',
    discipline_semester: '',
    discipline_type: '',
    discipline_content: '',
  };
  const [dados, setDados] = useState(initialState);
  const history = useHistory();
  const { addToast } = useToasts();

  const handleChange = (value, field) => {
    setDados({ ...dados, [field]: value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (dados.discipline_name.length > 3
      && dados.discipline_code.length > 3
      && dados.discipline_semester.length > 3
      && dados.discipline_is_isolated !== ''
      && dados.discipline_type.length !== ''
      && dados.discipline_content.length > 3) {
      await managerService.createDiscipline(dados, '8c81278b-691e-4221-b87f-b1901cecda1d');
      history.push('/painel/administrator/');
      addToast('Cadastro realizado com sucesso!', { appearance: 'success' });
    } else {
      addToast('Preencha todos os campos!', { appearance: 'error' });
    }
  };
  return (
    <div className="screen-ps">
      <SiteHeader />
      <h1> Cadastro de Disciplinas:</h1>
      <div className="form_dis_cad_box_title">
        <div className="form_dis_cad_title">
          Dados da Disciplina
        </div>
      </div>
      <div className="form_dis_cad_requerente">
        <div className="form_dis_cad_box">
          <div className="form_dis_cad_line">
            <div className="input-content">
              <div className="form_dis_cad_input">
                <StyledInput
                  type="text"
                  id="discipline_name"
                  label="Nome"
                  width="22.5rem"
                  dados={dados}
                  setDados={handleChange}
                />
              </div>
            </div>
            <div className="input-content">
              <div className="form_dis_cad_input" />
              <StyledInput
                type="text"
                id="discipline_code"
                label="Código da Disciplina"
                width="22.5rem"
                dados={dados}
                setDados={handleChange}
              />
            </div>
            <div className="form_dis_cad_line2">
              <div className="form_dis_cad_input">
                <StyledInput
                  type="text"
                  id="discipline_semester"
                  label="Período Ofertado"
                  width="22.5rem"
                  select
                  field={semester}
                  dados={dados}
                  setDados={handleChange}
                />
              </div>
              <div className="form_dis_cad_input">
                <StyledInput
                  type="text"
                  id="discipline_is_isolated"
                  label="Disciplina Isolada"
                  width="22.5rem"
                  field={booleans}
                  select
                  dados={dados}
                  setDados={handleChange}
                />
                <div className="form_dis_cad_input" />
                <StyledInput
                  type="text"
                  id="discipline_type"
                  label="Conteúdo"
                  field={enumm}
                  select
                  width="22.5rem"
                  dados={dados}
                  setDados={handleChange}
                />
              </div>
              <div className="form_dis_cad_input" />
              <StyledInput
                type="text"
                id="discipline_content"
                label="Conteúdo"
                width="22.5rem"
                dados={dados}
                setDados={handleChange}
              />
            </div>
            <div className="divButton-cad">
              <button type="submit" onClick={handleClick}> Cadastrar </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
export default registerDis;
