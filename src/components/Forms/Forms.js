import React, { useState } from 'react';
import StyledInput from '../StyledInput';
import UploadInput from '../UploadInput';
import './Forms.scss';

function Forms({
  initialState, formsInput, files, setFiles, handleClick,
}) {
  const [dados, setDados] = useState(initialState);
  const handleChange = (value, field) => {
    setDados({ ...dados, [field]: value });
  };
  const formsFile = ['Identidade', 'CPF', 'Diploma de Graduação', 'Comprovante de Endereço'];

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
                    width="16rem"
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
        <button type="submit" onClick={(e) => handleClick(e, dados)}> Cadastre-se</button>
      </div>
    </div>
  );
}
export default Forms;
