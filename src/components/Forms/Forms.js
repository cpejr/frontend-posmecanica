import React, { useState, useEffect } from 'react';
import StyledInput from '../StyledInput';
import UploadInput from '../UploadInput';
import * as managerService from '../../services/manager/managerService';
import './Forms.scss';

function Forms({
  initialState, formsInput, files, setFiles, handleClick,
}) {
  const [dados, setDados] = useState(initialState);
  const handleChange = (value, field) => {
    setDados({ ...dados, [field]: value });
  };
  const formsFile = ['Identidade', 'CPF', 'Diploma de Graduação', 'Comprovante de Endereço'];
  const formsIsolatedDiscipline = ['Primeira opção', 'Segunda opção', 'Terceira opção'];
  const [disciplines, setDisciplines] = useState([]);
  useEffect(async () => {
    const disciplinas = await managerService.getDisciplines('discipline_is_isolated', true);
    setDisciplines(disciplinas);
  }, []);

  return (
    <div>
      {formsInput.map((topic) => (
        <div key={topic.title}>
          <div className="forms_box_title">
            <div className="forms_title">
              {topic.title}
            </div>
          </div>
          {topic.lines.map((line) => (
            <div className="forms_line">
              {line.items.map((item) => (
                <div className="forms_input">
                  <StyledInput
                    type={item.type}
                    id={item.id}
                    label={item.label}
                    width="21rem"
                    field={item.field}
                    select={item.select}
                    dados={dados}
                    setDados={handleChange}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
      <div className="forms_box_title">
        <div className="forms_title">
          Escolha de disciplinas isoladas
        </div>
      </div>
      <div className="forms_line">
        {formsIsolatedDiscipline.map((disc) => (
          <div className="forms_input">
            <StyledInput
              type={disc.type}
              id={disc.id}
              label={disc}
              width="21rem"
              field={disciplines}
              select={1}
              dados={dados}
              setDados={handleChange}
            />
          </div>
        ))}
      </div>
      <div className="forms_box_title">
        <div className="forms_title">
          Arquivos
        </div>
      </div>
      <div className="forms_line">
        {formsFile.map((file) => (
          <div className="forms_input">
            <div className="forms_upload_text">{file}</div>
            <UploadInput files={files} setFiles={setFiles} fileName={file} />
          </div>
        ))}
      </div>
      <div className="forms_divButton">
        <button type="submit" onClick={(e) => handleClick(e, dados)}>Cadastrar</button>
      </div>
    </div>
  );
}
export default Forms;
