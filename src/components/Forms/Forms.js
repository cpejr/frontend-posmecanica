import React, { useState } from 'react';
import StyledInput from '../StyledInput';
import UploadInput from '../UploadInput';
import './Forms.scss';

function Forms({
  initialState, formsInput, files, setFiles, handleClick, error,
}) {
  const [dados, setDados] = useState(initialState);
  const handleChange = (value, field) => {
    setDados({ ...dados, [field]: value });
  };
  const formsFile = ['Identidade', 'CPF', 'Diploma de Graduação', 'Comprovante de Endereço', 'GRU'];

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
                    required
                    error={error}
                    type={item.type}
                    id={item.id}
                    label={item.label}
                    width="22rem"
                    field={item.field}
                    select={item.select}
                    shrink={item.type === 'date' ? true : undefined}
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
      <div className="forms_line_files">
        {formsFile.map((file) => (
          <div className="forms_input_file">
            <div className="forms_upload_text">{file}</div>
            <UploadInput files={files} setFiles={setFiles} fileName={file} />
          </div>
        ))}
      </div>
      <div className="forms_line_files">
        <div className="forms_input_file">
          <div className="forms_upload_text">GRU</div>
          <UploadInput files={files} setFiles={setFiles} fileName="GRU" />
        </div>
        <div className="forms_input_file">
          <div className="forms_upload_text">Proficiência em Língua Inglesa</div>
          <UploadInput files={files} setFiles={setFiles} fileName="Proficiência" />
        </div>
        {dados.candidate_grade === 'DOUTORADO' && (
          <>
            <div className="forms_input_file">
              <div className="forms_upload_text">Plano de Doutorado</div>
              <UploadInput files={files} setFiles={setFiles} fileName="Plano de Doutorado" />
            </div>
            <div className="forms_input_file">
              <div className="forms_upload_text">Comprovante de Mestrado</div>
              <UploadInput files={files} setFiles={setFiles} fileName="Comprovante de Mestrado" />
            </div>
          </>
        )}
      </div>
      <div className="forms_divButton">
        <button type="submit" onClick={(e) => handleClick(e, dados)}>Cadastrar</button>
      </div>
    </div>
  );
}
export default Forms;
