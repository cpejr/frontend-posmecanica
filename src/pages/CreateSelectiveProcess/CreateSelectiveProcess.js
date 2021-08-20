import React, { useState } from 'react';
import './CreateSelectiveProcess.scss';
import { useToasts } from 'react-toast-notifications';
import processType from '../../utils/processType';
import SiteHeader from '../../components/SiteHeader';
import Footer from '../../components/Footer';
import StyledInput from '../../components/StyledInput';
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
  return (
    <div className="screen-ps">
      <SiteHeader />
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
      </div>
      <Footer />
    </div>
  );
}
export default registerDis;
