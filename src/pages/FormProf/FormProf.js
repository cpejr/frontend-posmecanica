import React, { useState } from 'react';
import './FormProf.scss';
// import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import SiteHeader from '../../components/SiteHeader';
import StyledInput from '../../components/StyledInput';
import * as managerService from '../../services/manager/managerService';
import States from '../../Utils/states';
import Genres from '../../Utils/genres';
import Boolean from '../../Utils/boolean';
import Types from '../../Utils/types';
import Titles from '../../Utils/titles';

const states = States;
const genres = Genres;
const boolean = Boolean;
const types = Types;
const titles = Titles;

function FormProf() {
  const initialState = {
    prof_name: '',
    prof_email: '',
    professor_description: '',
    professor_curriculum: '',
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
  // const history = useHistory();
  const { addToast } = useToasts();

  const handleClick = async (e) => {
    e.preventDefault();
    if (1) {
      console.log(dados);
      await managerService.createProfessor(dados);
      // history.push('/');
      addToast('Cadastro realizado com sucesso!', { appearance: 'success' });
    } else {
      addToast('Preencha todos os campos!', { appearance: 'error' });
    }
  };
  return (
    <div className="screen-ps">
      <SiteHeader />
      <h1> Inscrição Processo Seletivo:</h1>
      <div className="form_dis_ps_box_title">
        <div className="form_dis_ps_title">
          Dados Pessoais
        </div>
      </div>
      <div className="form_dis_ps_requerente">
        <div className="form_dis_ps_line">
          <div className="form_dis_ps_input">
            <StyledInput
              type="text"
              id="prof_name"
              label="Nome"
              width="16rem"
              dados={dados}
              setDados={setDados}
            />
          </div>
          <div className="form_dis_ps_input">
            <StyledInput
              type="date"
              id="prof_birth"
              label="Data de Nascimento"
              width="16rem"
              dados={dados}
              setDados={setDados}
            />
          </div>
          <div className="form_dis_ps_input">
            <StyledInput
              type="text"
              id="prof_cpf"
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
              type="email"
              id="prof_email"
              label="Email"
              width="16rem"
              dados={dados}
              setDados={setDados}
            />
          </div>
          <div className="form_dis_ps_input">
            <StyledInput
              type="text"
              id="prof_gender"
              label="Gênero"
              width="16rem"
              field={genres}
              select
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
              id="prof_city"
              label="Cidade"
              width="16rem"
              dados={dados}
              setDados={setDados}
            />
          </div>
          <div className="form_dis_ps_input">
            <StyledInput
              type="text"
              id="prof_state"
              label="Estado"
              width="16rem"
              field={states}
              select
              dados={dados}
              setDados={setDados}
            />
          </div>
          <div className="form_dis_ps_input">
            <StyledInput
              type="text"
              id="prof_country"
              label="País"
              width="16rem"
              dados={dados}
              setDados={setDados}
            />
          </div>
        </div>
      </div>

      <div className="form_dis_ps_box_title">
        <div className="form_dis_ps_title">
          Acadêmico
        </div>
      </div>
      <div className="form_dis_ps_requerente">
        <div className="form_dis_ps_line">
          <div className="form_dis_ps_input">
            <StyledInput
              type="text"
              id="prof_university"
              label="Universidade"
              width="16rem"
              dados={dados}
              setDados={setDados}
            />
          </div>
          <div className="form_dis_ps_input">
            <StyledInput
              type="text"
              id="professor_curriculum"
              label="Currículo"
              width="16rem"
              dados={dados}
              setDados={setDados}
            />
          </div>
          <div className="form_dis_ps_input">
            <StyledInput
              type="text"
              id="prof_active"
              label="Professor ativo no programa?"
              field={boolean}
              select
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
              id="prof_type"
              label="Tipo de professor?"
              field={types}
              select
              width="16rem"
              dados={dados}
              setDados={setDados}
            />
          </div>
          <div className="form_dis_ps_input">
            <StyledInput
              type="text"
              id="prof_credential"
              label="Possui credencial?"
              field={boolean}
              select
              width="16rem"
              dados={dados}
              setDados={setDados}
            />
          </div>
          <div className="form_dis_ps_input">
            <StyledInput
              type="text"
              id="prof_course"
              label="Curso"
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
              id="prof_title"
              label="Qual seu título?"
              field={titles}
              select
              width="16rem"
              dados={dados}
              setDados={setDados}
            />
          </div>
          <div className="form_dis_ps_input">
            <StyledInput
              type="number"
              id="prof_title_year"
              label="Data do título"
              width="16rem"
              dados={dados}
              setDados={setDados}
            />
          </div>
          <div className="form_dis_ps_input">
            <StyledInput
              type="text"
              id="prof_treatment"
              label="Como gostaria de ser chamado?"
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
              id="prof_workplace"
              label="Local de trabalho"
              width="16rem"
              dados={dados}
              setDados={setDados}
            />
          </div>
        </div>
      </div>
      <div className="form_dis_ps_box_title">
        <div className="form_dis_ps_title">
          Descrição
        </div>
      </div>
      <div className="form_dis_ps_requerente">
        <div className="form_dis_ps_line">
          <div className="form_dis_ps_input">
            <StyledInput
              multiline
              type="text"
              id="professor_description"
              label=""
              width="70rem"
              height="30rem"
              dados={dados}
              setDados={setDados}
            />
          </div>
        </div>
      </div>
      <div className="divButton-ps">
        <button type="submit" onClick={handleClick}> Cadastre-se</button>
      </div>
    </div>
  );
}
export default FormProf;
