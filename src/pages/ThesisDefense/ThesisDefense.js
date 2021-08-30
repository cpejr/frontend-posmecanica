import React from 'react';
import Header from '../../components/Navbar';
import Footer from '../../components/Footer';
import './ThesisDefense.scss';
import StyledInput from '../../components/StyledInputWithIcon';

function ThesisDefense() {
  return (
    <div className="defenseContent">
      <Header />
      <div className="defenseContainer">
        <h2 className="defenseTitle">Divulgação de Defesa de Tese</h2>
        <div className="subTitle-line" />
        <div className="defenseBlock">
          <div className="defenseGrid">
            <div className="leftDefenseGrid">
              <div className="input-SPcontent">
                <div className="form_SP_cad_input">
                  <StyledInput
                    type="text"
                    label="Aluno"
                    width="20rem"
                  />
                </div>
              </div>
              <div className="input-SPcontent">
                <div className="form_SP_cad_input">
                  <StyledInput
                    type="text"
                    label="Título da Tese"
                    width="20rem"
                  />
                </div>
              </div>
              <div className="input-SPcontent">
                <div className="form_SP_cad_input">
                  <StyledInput
                    type="text"
                    label="Orientador"
                    width="20rem"
                  />
                </div>
              </div>
            </div>
            <div className="rightDefenseGrid">
              <div className="input-SPcontent">
                <div className="form_SP_cad_input">
                  <StyledInput
                    type="text"
                    label="Horário"
                    width="20rem"
                  />
                </div>
              </div>
              <div className="input-SPcontent">
                <div className="form_SP_cad_input">
                  <StyledInput
                    type="text"
                    label="Local"
                    width="20rem"
                  />
                </div>
              </div>
              <div className="input-SPcontent">
                <div className="form_SP_cad_input">
                  <StyledInput
                    type="date"
                    shrink
                    label="Data"
                    width="20rem"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="input-SPcontent">
            <div className="form_SP_cad_input">
              <StyledInput
                type="text"
                label="Banca Examinadora"
                width="42rem"
              />
            </div>
          </div>
          <button type="submit"> GERAR DIVULGAÇÃO</button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ThesisDefense;
