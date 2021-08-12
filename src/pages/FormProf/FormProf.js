import React, { useState } from 'react';
import './FormProf.scss';
import { useToasts } from 'react-toast-notifications';
import SiteHeader from '../../components/SiteHeader';
import StyledInput from '../../components/StyledInput';
import * as managerService from '../../services/manager/managerService';
import formsInput from '../../utils/formsProf';

function FormProf() {
  const initialState = {
    prof_name: '',
    prof_email: '',
    prof_description: '',
    prof_curriculum: '',
    prof_gender: '',
    prof_active: '',
    prof_birth: '',
    prof_cpf: '',
    prof_credential: '',
    prof_type: '',
    prof_title: '',
    prof_title_year: '',
    prof_university: '',
    prof_city: '',
    prof_state: '',
    prof_country: '',
    prof_course: '',
    prof_treatment: '',
    prof_workplace: '',
  };
  const [dados, setDados] = useState(initialState);
  const { addToast } = useToasts();

  const handleChange = (value, field) => {
    setDados({ ...dados, [field]: value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (1) {
      await managerService.createProfessor(dados);
      addToast('Cadastro realizado com sucesso!', { appearance: 'success' });
    } else {
      addToast('Preencha todos os campos!', { appearance: 'error' });
    }
  };
  return (
    <div className="screen-ps">
      <SiteHeader />
      <h1> Inscrição Processo Seletivo:</h1>
      {formsInput.map((topic) => (
        <div key={topic.title}>
          <div className="form_dis_prof_box_title">
            <div className="form_dis_prof_title">
              {topic.title}
            </div>
          </div>
          {topic.lines.map((line) => (
            <div className="form_dis_prof_line">
              {line.items.map((item) => (
                <div className="form_dis_prof_input">
                  <StyledInput
                    type={item.type}
                    id={item.id}
                    label={item.label}
                    width="18rem"
                    field={item.field}
                    select={item.select}
                    dados={dados}
                    shrink={item.type === 'date'}
                    setDados={handleChange}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
      <div className="divButton-psprof">
        <button className="Button-psprof" type="submit" onClick={handleClick}> Cadastre-se</button>
      </div>
    </div>
  );
}
export default FormProf;
