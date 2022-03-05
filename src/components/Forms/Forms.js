/*eslint-disable*/
import { CircularProgress } from '@material-ui/core';
import { useToasts } from 'react-toast-notifications';
import { GoVerified } from 'react-icons/go';
import React, { useState } from 'react';
import StyledInput from '../StyledInput';
import UploadInput from '../UploadInput';
import WarnningModal from '../../utils/WarnningModal';
import './Forms.scss';

function Forms({
  initialState, formsInput, files, setFiles, handleClick, error, loading, exit,
}) {
  window.onbeforeunload = confirmExit;
  function confirmExit() {
    if (!exit) { return 'Deseja realmente sair desta página?'; }
  }
  const { addToast } = useToasts();
  const [dados, setDados] = useState(initialState);
  const handleChange = (value, field) => {
    setDados({ ...dados, [field]: value });
  };
  function handleClickRedirect() {
    addToast('Redirecionando...', { appearance: 'success' });
    window.location.href = 'https://ppgmec.eng.ufmg.br/';
  }
  const formsFile = ['Identidade', 'CPF', 'Diploma de Graduação', 'Comprovante de Endereço', 'GRU', 'Histórico Escolar', 'Certidão de Nascimento ou Casamento', 'Curriculum Vitae e comprovantes (arquivo único)'];
  return (
    <div>
      {formsInput.map((topic) => (
        <div key={topic.title}>
          <div className="forms_box_title">
            <div className="forms_title">
              {topic.title}
            </div>
          </div>
          <div className="forms_box">
            {topic.items.map((item) => (
              <div className="forms_input">
                <StyledInput
                  required
                  error={error}
                  type={item.type}
                  id={item.id}
                  label={item.label}
                  width="100%"
                  field={item.field}
                  select={item.select}
                  shrink={item.type === 'date' ? true : undefined}
                  dados={dados}
                  setDados={handleChange}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="forms_box_title">
        <div className="forms_title">
          Arquivos
          {' '}
          <p>(Tamanho máximo de cada arquivo: 1 MB, formato PDF)</p>
        </div>
      </div>
      <div className="forms_box">
        {formsFile.map((file) => (
          <div className="forms_input_file">
            <div className="forms_upload_text">{file}</div>
            <UploadInput files={files} setFiles={setFiles} fileName={file} />
          </div>
        ))}
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
        {dados.candidate_race === 'indígena' && (
          <>
            <div className="forms_input_file">
              <div className="forms_upload_text">Formulários para Indígenas (arquivo único)</div>
              <UploadInput files={files} setFiles={setFiles} fileName="Formulários para Indígenas" />
            </div>
          </>
        )}
        {dados.candidate_PcD === true && (
          <>
            <div className="forms_input_file">
              <div className="forms_upload_text">Formulários para pessoas com deficiência (arquivo único)</div>
              <UploadInput files={files} setFiles={setFiles} fileName="Formulários para pessoas com deficiência" />
            </div>
          </>
        )}

        {(dados.candidate_nationality.toLowerCase().trim() === 'brasileira' || dados.candidate_nationality.toLowerCase().trim() === 'brasileiro') ? (
          <>
            <div className="forms_input_file">
              <div className="forms_upload_text">Certidão de Quitação Eleitoral</div>
              <UploadInput files={files} setFiles={setFiles} fileName="Certidão de Quitação Eleitoral" />
            </div>
            {dados.candidate_gender === 'masculino' && (
              <div className="forms_input_file">
                <div className="forms_upload_text">Comprovante de Obrigações Militares</div>
                <UploadInput files={files} setFiles={setFiles} fileName="Comprovante de Obrigações Militares" />
              </div>
            )}
          </>
        ) : (
          <>
            <div className="forms_input_file">
              <div className="forms_upload_text">Páginas do Visto de Entrada no Brasil</div>
              <UploadInput files={files} setFiles={setFiles} fileName="Páginas do Visto de Entrada no Brasil" />
            </div>
          </>
        )}
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
          <button type="submit" id="botao" onClick={(e) => handleClick(e, dados)}>Cadastrar</button>
        </div>
      )}
    </div>
  );
}
export default Forms;
