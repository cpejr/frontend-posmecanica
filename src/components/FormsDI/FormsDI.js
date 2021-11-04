import React, { useState, useEffect } from 'react';
import StyledInput from '../StyledInput';
import UploadInput from '../UploadInput';
import * as managerService from '../../services/manager/managerService';
import './FormsDI.scss';

function Forms({
  initialState, formsInput, files, setFiles, handleClick, error,
}) {
  const [dados, setDados] = useState(initialState);
  const handleChange = (value, field) => {
    setDados({ ...dados, [field]: value });
  };
  const formsFile = ['Identidade', 'CPF', 'Diploma de Graduação', 'Comprovante de Endereço'];
  const formsIsolatedDiscipline = [
    {
      type: 'text',
      id: 'first_discipline_isolated',
      label: 'Primeira opção',
    },
    {
      type: 'text',
      id: 'second_discipline_isolated',
      label: 'Segunda opção',
      text: 'noRequired',
    },
    {
      type: 'text',
      id: 'third_discipline_isolated',
      label: 'Terceira opção',
      text: 'noRequired',
    },
    {
      type: 'text',
      id: 'fourth_discipline_isolated',
      label: 'Quarta opção',
      text: 'noRequired',
    },
  ];
  const [disciplines, setDisciplines] = useState([]);

  useEffect(async () => {
    managerService.getDisciplines('discipline_is_isolated', true).then((resp) => {
      const disciplinas = [];
      disciplinas.push({ label: 'Nenhuma', value: '' });
      resp.forEach((object) => {
        disciplinas.push({ label: object.discipline_name, value: object.discipline_id });
      });
      setDisciplines(disciplinas);
    });
  }, []);

  return (
    <div>
      {formsInput.map((topic) => (
        <div key={topic.title}>
          <div className="formsDI_box_title">
            <div className="formsDI_title">
              {topic.title}
            </div>
          </div>
          {topic.lines.map((line) => (
            <div className="formsDI_line">
              {line.items.map((item) => (
                <div className="formsDI_input">
                  <StyledInput
                    type={item.type}
                    shrink={item.type === 'date' ? true : undefined}
                    id={item.id}
                    error={error}
                    label={item.label}
                    width="22rem"
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
      <div className="formsDI_box_title">
        <div className="formsDI_title">
          Escolha de disciplinas isoladas
        </div>
      </div>
      <div className="formsDI_line">
        {formsIsolatedDiscipline.map((disc) => (
          <div className="formsDI_input">
            <StyledInput
              type={disc.type}
              id={disc.id}
              label={disc.label}
              width="18em"
              text={disc.text}
              field={disciplines}
              error={error}
              select={1}
              dados={dados}
              setDados={handleChange}
            />
          </div>
        ))}
      </div>
      <div className="formsDI_box_title">
        <div className="formsDI_title">
          Arquivos
        </div>
      </div>
      <div className="formsDI_line_files">
        {formsFile.map((file) => (
          <div className="formsDI_input_file">
            <div className="formsDI_upload_text">{file}</div>
            <UploadInput files={files} setFiles={setFiles} fileName={file} />
          </div>
        ))}
      </div>
      <div className="formsDI_line_files">
        <div className="formsDI_input_file">
          <div className="formsDI_upload_text">Proficiência em Língua Inglesa</div>
          <UploadInput files={files} setFiles={setFiles} fileName="comprovante_proficiencia" />
        </div>
      </div>
      <div className="formsDI_box_title">
        <div className="formsDI_title">
          Justificativa
        </div>
      </div>
      <div className="formsDI_TextInputDiv">
        <div className="formsDI_TextInput">
          <StyledInput
            type="text"
            id="candidate_justify"
            label="Insira aqui sua justificativa"
            multiline
            error={error}
            dados={dados}
            setDados={handleChange}
          />
        </div>
      </div>
      <div className="formsDI_divButton">
        <button type="submit" onClick={(e) => handleClick(e, dados)}>Inscrever</button>
      </div>
    </div>
  );
}
export default Forms;
