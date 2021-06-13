import React from 'react';
import SiteHeader from '../../components/SiteHeader/SiteHeader';
import './AdmEdit.scss';
import StyledInput from '../../components/StyledInputWithIcon/StyledInputWithIcon';
import Footer from '../../components/Footer';

function AdmEdit() {
  return (
    <div className="external-div">
      <SiteHeader />
      <div className="text">
        Página de Edição de Dados dos alunos
      </div>
      <div className="container-admEdit">

        <div className="input-edit">
          <StyledInput
            type="text"
            id="candidate_name"
            label="Nome"
            width="16rem"

          />

          <StyledInput
            type="text"
            id="candidate_register"
            label="Registro"
            width="16rem"
          />
          <StyledInput
            type="text"
            id="candidate_workplane"
            label="Plano de Trabalho"
            width="16rem"
          />

        </div>
        <div className="input-edit2">
          <StyledInput
            type="text"
            id="stud_prof_advisor"
            label="Professor Orientador"
            width="16rem"
            color="#1d2d57"
          />

          <StyledInput
            type="text"
            id="stud_prof_coAdvisor"
            label="Professor coOrientador"
            width="16rem"
          />

        </div>
        <div className="divButton-adm">
          <button type="submit"> Editar Informações </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AdmEdit;
