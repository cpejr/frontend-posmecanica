import React, { useState } from 'react';
import './FormDis.scss';
import { useToasts } from 'react-toast-notifications';
import SiteHeader from '../../components/SiteHeader';
import StyledInput from '../../components/StyledInput';
import * as managerService from '../../services/manager/managerService';
import States from '../../Utils/states';
import CivilStatus from '../../Utils/civil_status';
import Genres from '../../Utils/genres';
import Races from '../../Utils/races';
import Booleans from '../../Utils/boolean';

const states = States;
const civilStatus = CivilStatus;
const genres = Genres;
const races = Races;
const booleans = Booleans;

function FormDis() {
  const initialState = {
    candidate_name: '',
    candidate_cpf: '',
    candidate_identity: '',
    candidate_expedition: '',
    candidate_nationality: '',
    candidate_civil_state: '',
    candidate_birth: '',
    candidate_race: '',
    candidate_gender: '',
    candidate_voter_title: '',
    candidate_zone_title: '',
    candidate_section_title: '',
    candidate_street: '',
    candidate_adress_num: '',
    candidate_city: '',
    candidate_state: '',
    candidate_country: '',
    candidate_cep: '',
    candidate_email: '',
    candidate_phone_number: '',
    candidate_university: '',
    candidate_graduation: '',
    candidate_grade_date_begin: '',
    candidate_grade_date_end: '',
    candidate_pGraduate_university: '',
    candidate_ufmg_active_serv: '',
    candidate_ufmg_retired_serv: '',
  };
  const [dados, setDados] = useState(initialState);
  const handleChange = (value, field) => {
    setDados({ ...dados, [field]: value });
  };
  const { addToast } = useToasts();

  const handleClick = async (e) => {
    e.preventDefault();
    if (dados.candidate_name.length > 3 && dados.candidate_cpf.length > 3
      && dados.candidate_identity.length > 3 && dados.candidate_expedition.length !== ''
      && dados.candidate_nationality.length > 3 && dados.candidate_civil_state.length > 3
      && dados.candidate_birth.length > 3 && dados.candidate_race.length > 3
      && dados.candidate_gender.length > 3 && dados.candidate_voter_title.length > 3
      && dados.candidate_zone_title.length !== '' && dados.candidate_section_title.length !== ''
      && dados.candidate_street.length !== '' && dados.candidate_pGraduate_university.length !== ''
      && dados.candidate_ufmg_active_serv.length !== '' && dados.candidate_ufmg_retired_serv.length !== ''
      && dados.candidate_city.length > 3 && dados.candidate_state.length > 3
      && dados.candidate_country.length > 3 && dados.candidate_cep.length > 3
      && dados.candidate_email.length > 3 && dados.candidate_phone_number.length > 3
      && dados.candidate_university.length > 3 && dados.candidate_graduation.length > 3) {
      const selectiveProcesses = await managerService.getActualSelectiveProcess('process_type', 'ISOLADA');
      await managerService.createCandidate(
        dados, selectiveProcesses[0].process_id,
      );
      addToast('Cadastro realizado com sucesso!', { appearance: 'success' });
    } else {
      addToast('Preencha todos os dados!', { appearance: 'error' });
    }
  };
  return (
    <div className="form_dis_screen">
      <SiteHeader />
      <h1> Inscrição:</h1>
      <div className="form_dis_box_title">
        <div className="form_dis_title">
          Dados Pessoais
        </div>
      </div>
      <div className="form_dis_ps_requerente">
        <div className="form_dis_line">
          <div className="form_dis_input">
            <StyledInput
              type="text"
              id="candidate_name"
              label="Nome"
              width="16rem"
              dados={dados}
              setDados={handleChange}
            />
          </div>
          <div className="form_dis_input">
            <StyledInput
              type="date"
              id="candidate_birth"
              label="Data de Nascimento"
              width="16rem"
              dados={dados}
              setDados={handleChange}
            />
          </div>
          <div className="form_dis_input">
            <StyledInput
              type="text"
              id="candidate_nationality"
              label="Nacionalidade"
              width="16rem"
              dados={dados}
              setDados={handleChange}
            />
          </div>
        </div>
        <div className="form_dis_line">
          <div className="form_dis_input">
            <StyledInput
              type="email"
              id="candidate_email"
              label="Email"
              width="16rem"
              dados={dados}
              setDados={handleChange}
            />
          </div>
          <div className="form_dis_input">
            <StyledInput
              type="text"
              id="candidate_phone_number"
              label="Número do telefone"
              width="16rem"
              dados={dados}
              setDados={handleChange}
            />
          </div>
        </div>
        <div className="form_dis_line">
          <div className="form_dis_input">
            <StyledInput
              type="text"
              id="candidate_civil_state"
              label="Estado Civil"
              width="16rem"
              field={civilStatus}
              select
              dados={dados}
              setDados={handleChange}
            />
          </div>
          <div className="form_dis_input">
            <StyledInput
              type="text"
              id="candidate_race"
              label="Raça"
              width="16rem"
              field={races}
              select
              dados={dados}
              setDados={handleChange}
            />
          </div>
          <div className="form_dis_input">
            <StyledInput
              type="text"
              id="candidate_gender"
              label="Gênero"
              width="16rem"
              field={genres}
              select
              dados={dados}
              setDados={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="form_dis_box_title">
        <div className="form_dis_title">
          Documentação
        </div>
      </div>
      <div className="form_dis_ps_requerente">
        <div className="form_dis_line">
          <div className="form_dis_input">
            <StyledInput
              type="text"
              id="candidate_cpf"
              label="CPF"
              width="16rem"
              dados={dados}
              setDados={handleChange}
            />
          </div>
        </div>
        <div className="form_dis_line">
          <div className="form_dis_input">
            <StyledInput
              type="text"
              id="candidate_identity"
              label="Identidade"
              width="16rem"
              dados={dados}
              setDados={handleChange}
            />
          </div>
          <div className="form_dis_input">
            <StyledInput
              type="text"
              id="candidate_expedition"
              label="Orgão Expeditor"
              width="16rem"
              dados={dados}
              setDados={handleChange}
            />
          </div>
        </div>
        <div className="form_dis_line">
          <div className="form_dis_input">
            <StyledInput
              type="texte"
              id="candidate_voter_title"
              label="Título de Eleitor"
              width="16rem"
              dados={dados}
              setDados={handleChange}
            />
          </div>
          <div className="form_dis_input">
            <StyledInput
              type="number"
              id="candidate_zone_title"
              label="Zona Eleitoral"
              width="16rem"
              dados={dados}
              setDados={handleChange}
            />
          </div>
          <div className="form_dis_input">
            <StyledInput
              type="number"
              id="candidate_section_title"
              label="Sessão"
              width="16rem"
              dados={dados}
              setDados={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="form_dis_box_title">
        <div className="form_dis_title">
          Endereço
        </div>
      </div>
      <div className="form_dis_ps_requerente">
        <div className="form_dis_line">
          <div className="form_dis_input">
            <StyledInput
              type="text"
              id="candidate_street"
              label="Rua"
              width="16rem"
              dados={dados}
              setDados={handleChange}
            />
          </div>
          <div className="form_dis_input">
            <StyledInput
              type="number"
              id="candidate_adress_num"
              label="Número residencial"
              width="16rem"
              dados={dados}
              setDados={handleChange}
            />
          </div>
        </div>
        <div className="form_dis_line">
          <div className="form_dis_input">
            <StyledInput
              type="text"
              id="candidate_district"
              label="Bairro"
              width="16rem"
              dados={dados}
              setDados={handleChange}
            />
          </div>
          <div className="form_dis_input">
            <StyledInput
              type="text"
              id="candidate_cep"
              label="CEP"
              width="16rem"
              dados={dados}
              setDados={handleChange}
            />
          </div>
        </div>
        <div className="form_dis_line">
          <div className="form_dis_input">
            <StyledInput
              type="text"
              id="candidate_city"
              label="Cidade"
              width="16rem"
              dados={dados}
              setDados={handleChange}
            />
          </div>
          <div className="form_dis_input">
            <StyledInput
              type="text"
              id="candidate_state"
              label="Estado"
              width="16rem"
              field={states}
              select
              dados={dados}
              setDados={handleChange}
            />
          </div>
          <div className="form_dis_input">
            <StyledInput
              type="text"
              id="candidate_country"
              label="País"
              width="16rem"
              dados={dados}
              setDados={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="form_dis_box_title">
        <div className="form_dis_title">
          Graduação
        </div>
      </div>
      <div className="form_dis_ps_requerente">
        <div className="form_dis_line">
          <div className="form_dis_input">
            <StyledInput
              type="text"
              id="candidate_university"
              label="Universidade"
              width="16rem"
              dados={dados}
              setDados={handleChange}
            />
          </div>
          <div className="form_dis_input">
            <StyledInput
              type="text"
              id="candidate_graduation"
              label="Graduação"
              width="16rem"
              dados={dados}
              setDados={handleChange}
            />
          </div>
        </div>
        <div className="form_dis_line">
          <div className="form_dis_input">
            <StyledInput
              type="date"
              id="candidate_grade_date_begin"
              label="Data início da graduação"
              width="16rem"
              dados={dados}
              setDados={handleChange}
            />
          </div>
          <div className="form_dis_input">
            <StyledInput
              type="date"
              id="candidate_grade_date_end"
              label="Data final da graduação"
              width="16rem"
              dados={dados}
              setDados={handleChange}
            />
          </div>
        </div>
        <div className="form_dis_line">
          <div className="form_dis_input">
            <StyledInput
              type="text"
              id="candidate_pGraduate_university"
              label="Universidade da Pós Graduação"
              width="16rem"
              dados={dados}
              setDados={handleChange}
            />
          </div>
          <div className="form_dis_input">
            <StyledInput
              type=""
              id="candidate_ufmg_active_serv"
              label="Servidor ativo da UFMG?"
              width="16rem"
              field={booleans}
              select
              dados={dados}
              setDados={handleChange}
            />
          </div>
          <div className="form_dis_input">
            <StyledInput
              type="text"
              id="candidate_ufmg_retired_serv"
              label="Servidor aposentado da UFMG?"
              width="16rem"
              field={booleans}
              select
              dados={dados}
              setDados={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="form_dis_divButton">
        <button type="submit" onClick={handleClick}> Cadastre-se</button>
      </div>
    </div>
  );
}
export default FormDis;
