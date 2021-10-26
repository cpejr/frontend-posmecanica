/* eslint-disable */

import React, { useState } from "react";
import "./FormProf.scss";
import { useToasts } from "react-toast-notifications";
import Header from "../../components/Navbar";
import StyledInput from "../../components/StyledInput";
import moment from 'moment';
import * as managerService from "../../services/manager/managerService";
import formsInput from "../../utils/formsProf";
import RightPanel from "../../components/Menu/RightPanel";
import Footer from '../../components/Footer';

function FormProf() {
  const initialState = {
    prof_name: "",
    prof_email: "",
    prof_description: "",
    prof_curriculum: "",
    prof_gender: "",
    prof_active: "",
    prof_birth: "",
    prof_cpf: "",
    prof_credential: "",
    prof_type: "",
    prof_title: "",
    prof_title_year: "",
    prof_university: "",
    prof_city: "",
    prof_state: "",
    prof_country: "",
    prof_course: "",
    prof_treatment: "",
    prof_workplace: "",
  };
  const [dados, setDados] = useState(initialState);
  const { addToast } = useToasts();

  const handleChange = (value, field) => {
    setDados({ ...dados, [field]: value });
  };

  const handleClick = async (e) => {
    dados.prof_birth = moment(dados.prof_birth).format();
    e.preventDefault();
    if (1) {
      await managerService.createProfessor(dados);
      addToast("Cadastro realizado com sucesso!", { appearance: "success" });
    } else {
      addToast("Preencha todos os campos!", { appearance: "error" });
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
      text: 'Lista de professores',
      path: 'lista-professores',
    },
    {
      text: 'Criar processo seletivo',
      path: 'administrator/criar-processo-seletivo',
    },
    {
      text: 'Visualizar Processos Seletivos',
      path: 'processos-seletivos',
    },
    {
      text: 'Cadastro de disciplina isolada',
      path: 'administrator/cadastro-disciplina',
    },
    {
      text: 'Redefinição de senha',
      path: '../esqueci-senha',
    },
  ];

  return (
    <div className="screen-ps-profForms">
      <Header expandRightPanel={expandRightPanel} setExpandRightPanel={setExpandRightPanel} />
      <h1 className="title_professor_forms"> Cadastro de Professor:</h1>
      {formsInput.map((topic) => (
        <div key={topic.title}>
          <div className="form_dis_prof_box_title">
            <div className="form_dis_prof_title">{topic.title}</div>
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
                    shrink={item.type === "date"}
                    setDados={handleChange}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
      <div className="DIV_form_dis_prof_description">
        <div className="DIVinside_form_dis_prof_description">
          <StyledInput
            type="text"
            id="prof_description"
            label="Descrição do professor"
            multiline
            dados={dados}
            setDados={handleChange}
          />
        </div>
      </div>
      <div className="divButton-psprof">
        <button className="Button-psprof" type="submit" onClick={handleClick}>
          {" "}
          Cadastrar
        </button>
      </div>
      <RightPanel
        inputProps={inputProps}
        expandRightPanel={expandRightPanel}
        setExpandRightPanel={setExpandRightPanel}
      />
      <Footer />
    </div>
  );
}
export default FormProf;
