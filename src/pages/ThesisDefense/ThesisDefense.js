import React, { useState } from 'react';
import Header from '../../components/Navbar';
import Footer from '../../components/Footer';
import './ThesisDefense.scss';
import StyledInput from '../../components/StyledInputWithIcon';

const initialState = {
  nome: '',
  tese: '',
  orientador: '',
  horario: '',
  local: '',
  data: '',
  banca: '',
};

function ThesisDefense() {
  const [dados, setDados] = useState(initialState);
  const handleChange = (value, field) => {
    setDados({ ...dados, [field]: value });
  };
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
                <div className="form_SP_input">
                  <StyledInput
                    type="text"
                    label="Aluno"
                    setDados={handleChange}
                  />
                </div>
              </div>
              <div className="input-SPcontent">
                <div className="form_SP_input">
                  <StyledInput
                    type="text"
                    label="Título da Tese"
                    setDados={handleChange}
                  />
                </div>
              </div>
              <div className="input-SPcontent">
                <div className="form_SP_input">
                  <StyledInput
                    type="text"
                    label="Orientador"
                    setDados={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="rightDefenseGrid">
              <div className="input-SPcontent">
                <div className="form_SP_input">
                  <StyledInput
                    type="text"
                    label="Horário"
                    shrink="true"
                    setDados={handleChange}
                  />
                </div>
              </div>
              <div className="input-SPcontent">
                <div className="form_SP_input">
                  <StyledInput
                    type="text"
                    label="Local"
                    setDados={handleChange}
                  />
                </div>
              </div>
              <div className="input-SPcontent">
                <div className="form_SP_input">
                  <StyledInput
                    type="date"
                    shrink
                    label="Data"
                    setDados={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="input-SPcontent">
            <div className="form_SP1_input">
              <StyledInput
                type="text"
                label="Banca Examinadora"
                setDados={handleChange}
              />
            </div>
          </div>
          <div className="divButton">
            <button type="submit" className="buttonDivulgar">GERAR DIVULGAÇÃO</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ThesisDefense;
