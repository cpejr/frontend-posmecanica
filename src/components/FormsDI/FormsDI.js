/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';
import StyledInput from '../StyledInput';
import UploadInput from '../UploadInput';
import * as managerService from '../../services/manager/managerService';
import './FormsDI.scss';
import WarnningModal from '../../utils/WarnningModal';
import { GoVerified } from 'react-icons/go';
import { CircularProgress } from '@material-ui/core';

function Forms({
  initialState, formsInput, files, setFiles, handleClick, error, exit, loading,
}) {
  window.onbeforeunload = confirmExit;
  function confirmExit() {
    if (!exit) { return 'Deseja realmente sair desta página?'; }
  }
  const [dados, setDados] = useState(initialState);
  const handleChange = (value, field) => {
    setDados({ ...dados, [field]: value });
  };
  const formsFile = ['Identidade', 'CPF', 'Diploma de Graduação', 'Comprovante de Endereço', 'Proficiência em Língua Inglesa'];
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
      resp = resp.filter((item) => item.discipline_semester === 'OFERTADO');
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
          <div className="formsDI_box">
            {topic.items.map((item) => (
              <div className="formsDI_input">
                <StyledInput
                  type={item.type}
                  shrink={item.type === 'date' ? true : undefined}
                  id={item.id}
                  error={error}
                  label={item.label}
                  width="100%"
                  field={item.field}
                  select={item.select}
                  dados={dados}
                  setDados={handleChange}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="formsDI_box_title">
        <div className="formsDI_title">
          Escolha de disciplinas isoladas
        </div>
      </div>
      <div className="formsDI_box">
        {formsIsolatedDiscipline.map((disc) => (
          <div className="formsDI_input">
            <StyledInput
              type={disc.type}
              id={disc.id}
              label={disc.label}
              width="100%"
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
      <div className="formsDI_box">
        {formsFile.map((file) => (
          <div className="formsDI_input_file">
            <div className="formsDI_upload_text">{file}</div>
            <UploadInput files={files} setFiles={setFiles} fileName={file} />
          </div>
        ))}
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
      {(loading === true) ? (
        <>
          {(exit === true) && (
            <WarnningModal>
              <GoVerified size={52} color="inherit" className="LoaderProfCandidates" />
              <div className="BdDivGridLoader">
                <div className="Loader-form">
                  <p>Cadastro Realizado com sucesso!</p>
                  <p>Verifique o número de protocolo em seu email.</p>
                </div>
              </div>
              <div className="postButton">
                <button
                  className="buttonPost"
                  type="submit"
                  onClick={(e) => handleClickRedirect(e)}
                >
                  OK
                </button>
              </div>
            </WarnningModal>
          )}
          {(exit === false) && (
            <WarnningModal>
              <div className="BdDivGridLoader">
                <div className="Loader-form">
                  <p>Aguarde, subindo arquivos...</p>
                  <p>Por gentileza, não saia da página</p>
                  <br />
                  <CircularProgress size={32} color="inherit" className="LoaderProfCandidates" />
                </div>
              </div>
            </WarnningModal>
          )}
        </>
      ) : (
        <div className="forms_divButton">
          <button type="submit" id="botao" onClick={(e) => handleClick(e, dados)}>Inscrever</button>
        </div>
      )}
    </div>
  );
}
export default Forms;
