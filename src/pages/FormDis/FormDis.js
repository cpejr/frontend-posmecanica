import React, { useState } from 'react';
import './FormDis.scss';
import SiteHeader from '../../components/SiteHeader';
import StyledInput from '../../components/StyledInput';
import * as managerService from '../../services/manager/managerService';
import Estados from '../../Utils/Estados';
import EstadoCivil from '../../Utils/Estado_civil';
import Generos from '../../Utils/Generos';
import Racas from '../../Utils/Racas';
import Booleanos from '../../Utils/Booleanos';

const estados = Estados;
const estadosCivil = EstadoCivil;
const generos = Generos;
const racas = Racas;
const booleanos = Booleanos;

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
  const handleClick = async (e) => {
    e.preventDefault();
    await managerService.createCandidate(dados, 'ce96ed27-7d30-4157-bc63-bc9bd2a21dc6');
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
        <div className="form_dis_ps_line">
          <div className="form_dis_ps_input">
            <StyledInput
              type="text"
              id="candidate_name"
              label="Nome"
              width="16rem"
              dados={dados}
              setDados={setDados}
            />
          </div>
          <div className="form_dis_ps_input">
            <StyledInput
              type="date"
              id="candidate_birth"
              label="Data de Nascimento"
              width="16rem"
              dados={dados}
              setDados={setDados}
            />
          </div>
          <div className="form_dis_ps_input">
            <StyledInput
              type="text"
              id="candidate_nationality"
              label="Nacionalidade"
              width="16rem"
              dados={dados}
              setDados={setDados}
            />
          </div>
        </div>
        <div className="form_dis_ps_line">
          <div className="form_dis_ps_input">
            <StyledInput
              type="email"
              id="candidate_email"
              label="Email"
              width="16rem"
              dados={dados}
              setDados={setDados}
            />
          </div>
          <div className="form_dis_ps_input">
            <StyledInput
              type="text"
              id="candidate_phone_number"
              label="Número do telefone"
              width="16rem"
              dados={dados}
              setDados={setDados}
            />
          </div>
        </div>
        <div className="form_dis_ps_line">
          <div className="form_dis_ps_input">
            <StyledInput
              type="text"
              id="candidate_civil_state"
              label="Estado Civil"
              width="16rem"
              field={estadosCivil}
              select
              dados={dados}
              setDados={setDados}
            />
          </div>
          <div className="form_dis_ps_input">
            <StyledInput
              type="text"
              id="candidate_race"
              label="Raça"
              width="16rem"
              field={racas}
              select
              dados={dados}
              setDados={setDados}
            />
          </div>
          <div className="form_dis_ps_input">
            <StyledInput
              type="text"
              id="candidate_gender"
              label="Gênero"
              width="16rem"
              field={generos}
              select
              dados={dados}
              setDados={setDados}
            />
          </div>
        </div>
      </div>
      <div className="form_dis_ps_box_title">
        <div className="form_dis_ps_title">
          Documentação
        </div>
      </div>
      <div className="form_dis_ps_requerente">
        <div className="form_dis_ps_line">
          <div className="form_dis_ps_input">
            <StyledInput
              type="text"
              id="candidate_cpf"
              label="CPF"
              width="16rem"
              dados={dados}
              setDados={setDados}
            />
          </div>
        </div>
        <div className="form_dis_ps_line">
          <div className="form_dis_ps_input">
            <StyledInput
              type="text"
              id="candidate_identity"
              label="Identidade"
              width="16rem"
              dados={dados}
              setDados={setDados}
            />
          </div>
          <div className="form_dis_ps_input">
            <StyledInput
              type="text"
              id="candidate_expedition"
              label="Orgão Expeditor"
              width="16rem"
              dados={dados}
              setDados={setDados}
            />
          </div>
        </div>
        <div className="form_dis_ps_line">
          <div className="form_dis_ps_input">
            <StyledInput
              type="texte"
              id="candidate_voter_title"
              label="Título de Eleitor"
              width="16rem"
              dados={dados}
              setDados={setDados}
            />
          </div>
          <div className="form_dis_ps_input">
            <StyledInput
              type="number"
              id="candidate_zone_title"
              label="Zona Eleitoral"
              width="16rem"
              dados={dados}
              setDados={setDados}
            />
          </div>
          <div className="form_dis_ps_input">
            <StyledInput
              type="number"
              id="candidate_section_title"
              label="Sessão"
              width="16rem"
              dados={dados}
              setDados={setDados}
            />
          </div>
        </div>
      </div>
      <div className="form_dis_ps_box_title">
        <div className="form_dis_ps_title">
          Endereço
        </div>
      </div>
      <div className="form_dis_ps_requerente">
        <div className="form_dis_ps_line">
          <div className="form_dis_ps_input">
            <StyledInput
              type="text"
              id="candidate_street"
              label="Rua"
              width="16rem"
              dados={dados}
              setDados={setDados}
            />
          </div>
          <div className="form_dis_ps_input">
            <StyledInput
              type="number"
              id="candidate_adress_num"
              label="Número residencial"
              width="16rem"
              dados={dados}
              setDados={setDados}
            />
          </div>
          <div className="form_dis_ps_input">
            <StyledInput
              type="text"
              id="candidate_district"
              label="Bairro"
              width="16rem"
              dados={dados}
              setDados={setDados}
            />
          </div>
        </div>
        <div className="form_dis_ps_line">
          <div className="form_dis_ps_input">
            <StyledInput
              type="text"
              id="candidate_city"
              label="Cidade"
              width="16rem"
              dados={dados}
              setDados={setDados}
            />
          </div>
          <div className="form_dis_ps_input">
            <StyledInput
              type="text"
              id="candidate_state"
              label="Estado"
              width="16rem"
              field={estados}
              select
              dados={dados}
              setDados={setDados}
            />
          </div>
          <div className="form_dis_ps_input">
            <StyledInput
              type="text"
              id="candidate_country"
              label="País"
              width="16rem"
              dados={dados}
              setDados={setDados}
            />
          </div>
          <div className="form_dis_ps_input">
            <StyledInput
              type="text"
              id="candidate_cep"
              label="CEP"
              width="16rem"
              dados={dados}
              setDados={setDados}
            />
          </div>
        </div>
      </div>
      <div className="form_dis_ps_box_title">
        <div className="form_dis_ps_title">
          Graduação
        </div>
      </div>
      <div className="form_dis_ps_requerente">
        <div className="form_dis_ps_line">
          <div className="form_dis_ps_input">
            <StyledInput
              type="text"
              id="candidate_university"
              label="Universidade"
              width="16rem"
              dados={dados}
              setDados={setDados}
            />
          </div>
          <div className="form_dis_ps_input">
            <StyledInput
              type="text"
              id="candidate_graduation"
              label="Graduação"
              width="16rem"
              dados={dados}
              setDados={setDados}
            />
          </div>
          <div className="form_dis_ps_input">
            <StyledInput
              type="date"
              id="candidate_grade_date_begin"
              label="Data início da graduação"
              width="16rem"
              dados={dados}
              setDados={setDados}
            />
          </div>
          <div className="form_dis_ps_input">
            <StyledInput
              type="date"
              id="candidate_grade_date_end"
              label="Data final da graduação"
              width="16rem"
              dados={dados}
              setDados={setDados}
            />
          </div>
        </div>
        <div className="form_dis_ps_line">
          <div className="form_dis_ps_input">
            <StyledInput
              type="text"
              id="candidate_pGraduate_university"
              label="Universidade da Pós Graduação"
              width="16rem"
              dados={dados}
              setDados={setDados}
            />
          </div>
          <div className="form_dis_ps_input">
            <StyledInput
              type=""
              id="candidate_ufmg_active_serv"
              label="Servidor ativo da UFMG?"
              width="16rem"
              field={booleanos}
              select
              dados={dados}
              setDados={setDados}
            />
          </div>
          <div className="form_dis_ps_input">
            <StyledInput
              type="text"
              id="candidate_ufmg_retired_serv"
              label="Servidor aposentado da UFMG?"
              width="16rem"
              field={booleanos}
              select
              dados={dados}
              setDados={setDados}
            />
          </div>
        </div>
      </div>
      <div className="divButton">
        <button type="submit" onClick={handleClick}> Cadastre-se</button>
      </div>
    </div>
  );
}
export default FormDis;
