/*eslint-disable*/
import { CircularProgress } from "@material-ui/core";
import { useToasts } from "react-toast-notifications";
import { GoVerified } from "react-icons/go";
import React, { useState } from "react";
import StyledInput from "../StyledInput";
import UploadInput from "../UploadInput";
import WarningModal from "../../utils/WarningModal";
import "./Forms.scss";

function Forms({
  initialState,
  formsInput,
  files,
  setFiles,
  handleClick,
  error,
  loading,
  exit,
}) {
  window.onbeforeunload = confirmExit;
  function confirmExit() {
    if (!exit) {
      return "Deseja realmente sair desta página?";
    }
  }
  const { addToast } = useToasts();
  const [dados, setDados] = useState(initialState);
  const handleChange = (value, field) => {
    setDados({ ...dados, [field]: value });
  };
  function handleClickRedirect() {
    addToast("Redirecionando...", { appearance: "success" });
    window.location.href = "https://ppgmec.eng.ufmg.br/";
  }

  const formsFile = [
    {
      formFile: [
        "Identidade",
        "CPF",
        "Diploma de Graduação",
        "Comprovante de Endereço",
        "GRU",
        "Histórico Escolar",
        "Certidão de Nascimento ou Casamento",
        "Curriculum Vitae e comprovantes (arquivo único)",
      ],

      fileName: [
        "identidade",
        "cpf",
        "diploma",
        "endereco",
        "gru",
        "historico",
        "certidao",
        "curriculum",
      ],
    },
  ];

  return (
    <div>
      {formsInput.map((topic) => (
        <div key={topic.title}>
          <div className="forms_box_title">
            <div className="forms_title">{topic.title}</div>
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
                  shrink={item.type === "date" ? true : undefined}
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
          Arquivos <p>(Tamanho máximo de cada arquivo: 1 MB, formato PDF)</p>
        </div>
      </div>
      <div className="forms_box">
        <div className="forms_input_file">
          <div className="forms_upload_text">{formsFile.formFile[0]}</div>
          <UploadInput
            files={files}
            setFiles={setFiles}
            fileName={formsFile.fileName[0]}
          />
        </div>

        <div className="forms_input_file">
          <div className="forms_upload_text">{formsFile.formFile[1]}</div>
          <UploadInput
            files={files}
            setFiles={setFiles}
            fileName={formsFile.fileName[1]}
          />
        </div>

        <div className="forms_input_file">
          <div className="forms_upload_text">{formsFile.formFile[2]}</div>
          <UploadInput
            files={files}
            setFiles={setFiles}
            fileName={formsFile.fileName[2]}
          />
        </div>

        <div className="forms_input_file">
          <div className="forms_upload_text">{formsFile.formFile[3]}</div>
          <UploadInput
            files={files}
            setFiles={setFiles}
            fileName={formsFile.fileName[3]}
          />
        </div>

        <div className="forms_input_file">
          <div className="forms_upload_text">{formsFile.formFile[4]}</div>
          <UploadInput
            files={files}
            setFiles={setFiles}
            fileName={formsFile.fileName[4]}
          />
        </div>

        <div className="forms_input_file">
          <div className="forms_upload_text">{formsFile.formFile[5]}</div>
          <UploadInput
            files={files}
            setFiles={setFiles}
            fileName={formsFile.fileName[5]}
          />
        </div>

        <div className="forms_input_file">
          <div className="forms_upload_text">{formsFile.formFile[6]}</div>
          <UploadInput
            files={files}
            setFiles={setFiles}
            fileName={formsFile.fileName[6]}
          />
        </div>

        <div className="forms_input_file">
          <div className="forms_upload_text">{formsFile.formFile[7]}</div>
          <UploadInput
            files={files}
            setFiles={setFiles}
            fileName={formsFile.fileName[7]}
          />
        </div>

        <div className="forms_input_file">
          <div className="forms_upload_text">
            Proficiência em Língua Inglesa
          </div>
          <UploadInput
            files={files}
            setFiles={setFiles}
            fileName="proficiencia"
          />
        </div>
        {dados.candidate_grade === "DOUTORADO" && (
          <>
            <div className="forms_input_file">
              <div className="forms_upload_text">Plano de Doutorado</div>
              <UploadInput files={files} setFiles={setFiles} fileName="plano" />
            </div>
            <div className="forms_input_file">
              <div className="forms_upload_text">Comprovante de Mestrado</div>
              <UploadInput
                files={files}
                setFiles={setFiles}
                fileName="mestrado"
              />
            </div>
          </>
        )}
        {dados.candidate_race === "indígena" && (
          <>
            <div className="forms_input_file">
              <div className="forms_upload_text">
                Formulários para Indígenas (arquivo único)
              </div>
              <UploadInput
                files={files}
                setFiles={setFiles}
                fileName="indigenas"
              />
            </div>
          </>
        )}
        {dados.candidate_PcD === true && (
          <>
            <div className="forms_input_file">
              <div className="forms_upload_text">
                Formulários para pessoas com deficiência (arquivo único)
              </div>
              <UploadInput
                files={files}
                setFiles={setFiles}
                fileName="deficiencia"
              />
            </div>
          </>
        )}

        {dados.candidate_nationality.toLowerCase().trim() === "brasileira" ||
        dados.candidate_nationality.toLowerCase().trim() === "brasileiro" ? (
          <>
            <div className="forms_input_file">
              <div className="forms_upload_text">
                Certidão de Quitação Eleitoral
              </div>
              <UploadInput
                files={files}
                setFiles={setFiles}
                fileName="eleitoral"
              />
            </div>
            {dados.candidate_gender === "masculino" && (
              <div className="forms_input_file">
                <div className="forms_upload_text">
                  Comprovante de Obrigações Militares
                </div>
                <UploadInput
                  files={files}
                  setFiles={setFiles}
                  fileName="militares"
                />
              </div>
            )}
          </>
        ) : (
          <>
            <div className="forms_input_file">
              <div className="forms_upload_text">
                Páginas do Visto de Entrada no Brasil
              </div>
              <UploadInput files={files} setFiles={setFiles} fileName="visto" />
            </div>
          </>
        )}
      </div>
      {loading === true ? (
        <>
          {exit === true && (
            <WarningModal>
              <GoVerified
                size={52}
                color="inherit"
                className="LoaderProfCandidates"
              />
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
            </WarningModal>
          )}
          {exit === false && (
            <WarningModal>
              <div className="BdDivGridLoader">
                <div className="Loader-form">
                  <p>Aguarde, subindo arquivos...</p>
                  <p>Por gentileza, não saia da página</p>
                  <br />
                  <CircularProgress
                    size={32}
                    color="inherit"
                    className="LoaderProfCandidates"
                  />
                </div>
              </div>
            </WarningModal>
          )}
        </>
      ) : (
        <div className="forms_divButton">
          <button
            type="submit"
            id="botao"
            onClick={(e) => handleClick(e, dados)}
          >
            Cadastrar
          </button>
        </div>
      )}
    </div>
  );
}
export default Forms;
