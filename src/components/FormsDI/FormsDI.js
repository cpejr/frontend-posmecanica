/*eslint-disable*/
import React, { useState, useEffect } from "react";
import { CircularProgress } from "@material-ui/core";
import StyledInput from "../StyledInput";
import UploadInput from "../UploadInput";
import { useToasts } from "react-toast-notifications";
import * as managerService from "../../services/manager/managerService";
import "./FormsDI.scss";
import WarningModal from "../../utils/WarningModal";
import { GoVerified } from "react-icons/go";

function Forms({
  initialState,
  formsInput,
  files,
  setFiles,
  handleClick,
  error,
  exit,
  loading,
}) {
  window.onbeforeunload = confirmExit;
  function confirmExit() {
    if (!exit) {
      return "Deseja realmente sair desta página?";
    }
  }
  const { addToast } = useToasts();
  function handleClickRedirect() {
    addToast("Redirecionando...", { appearance: "success" });
    window.location.href = "https://ppgmec.eng.ufmg.br/";
  }
  const [dados, setDados] = useState(initialState);
  const handleChange = (value, field) => {
    setDados({ ...dados, [field]: value });
  };

  const formsFile = [
    {
      formFile: "Identidade",
      fileName: "identidade",
    },
    {
      formFile: "CPF",
      fileName: "cpf",
    },
    {
      formFile: "Diploma de Graduação",
      fileName: "diploma",
    },
    {
      formFile: "Comprovante de Endereço",
      fileName: "endereco",
    },
    {
      formFile: "Histórico Escolar",
      fileName: "historico",
    },
    {
      formFile: "Currículo Lattes e comprovantes (arquivo único)",
      fileName: "curriculum",
    },
  ];

  const formsIsolatedDiscipline = [
    {
      type: "text",
      id: "first_discipline_isolated",
      label: "Primeira opção",
    },
    {
      type: "text",
      id: "second_discipline_isolated",
      label: "Segunda opção",
      text: "noRequired",
    },
    {
      type: "text",
      id: "third_discipline_isolated",
      label: "Terceira opção",
      text: "noRequired",
    },
    {
      type: "text",
      id: "fourth_discipline_isolated",
      label: "Quarta opção",
      text: "noRequired",
    },
  ];
  const [disciplines, setDisciplines] = useState([]);

  useEffect(async () => {
    managerService.getDisciplines().then((resp) => {
      resp = resp.filter((item) => item.discipline_semester === "OFERTADO");
      const disciplinas = [];
      disciplinas.push({ label: "Nenhuma", value: "" });
      resp.forEach((object) => {
        disciplinas.push({
          label: object.discipline_name,
          value: object.discipline_id,
        });
      });
      setDisciplines(disciplinas);
    });
  }, []);

  return (
    <div>
      {formsInput.map((topic) => (
        <div key={topic.title}>
          <div className="formsDI_box_title">
            <div className="formsDI_title">{topic.title}</div>
          </div>
          <div className="formsDI_box">
            {topic.items.map((item) => (
              <div className="formsDI_input">
                <StyledInput
                  type={item.type}
                  shrink={item.type === "date" ? true : undefined}
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
        <div className="formsDI_title">Escolha de disciplinas isoladas</div>
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
          Arquivos <p>(Tamanho máximo de cada arquivo: 1 MB, formato PDF)</p>
        </div>
      </div>
      <div className="formsDI_box">
        {formsFile.map((file) => (
          <div className="formsDI_input_file">
            <div className="formsDI_upload_text">{file.formFile}</div>
            <UploadInput
              files={files}
              setFiles={setFiles}
              fileName={file.fileName}
            />
          </div>
        ))}
      </div>
      <div className="formsDI_box_title">
        <div className="formsDI_title">Justificativa</div>
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
      {loading === true && error === false ? (
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
            Inscrever
          </button>
        </div>
      )}
    </div>
  );
}
export default Forms;
