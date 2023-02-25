import React, { useState } from "react";
import "./Document.scss";
import * as managerService from "../../services/manager/managerService";
import { useToasts } from "react-toast-notifications";

function SentDocuments({ children, candidate, type, handleClick, text }) {
  const { addToast } = useToasts();

  const handleClickShowDocs = async () => {
    let fileName;
    switch (type) {
      case "Identidade":
        fileName = "identidade";
        break;

      case "CPF":
        fileName = "cpf";
        break;

      case "Diploma de Graduação":
        fileName = "diploma";
        break;

      case "Comprovante de Endereço":
        fileName = "endereco";
        break;

      case "GRU":
        fileName = "gru";
        break;

      case "Histórico Escolar":
        fileName = "historico";
        break;

      case "Histórico":
        fileName = "historico";
        break;

      case "Certidão de Nascimento ou Casamento":
        fileName = "certidao";
        break;

      case "Curriculum Vitae":
        fileName = "curriculum";
        break;

      case "Currículo Lattes":
        fileName = "curriculum";
        break;

      case "Proficiência em Língua Inglesa":
        fileName = "proficiencia";
        break;

      case "Proficiência":
        fileName = "proficiencia";
        break;

      case "Plano de Doutorado":
        fileName = "plano";
        break;

      case "Comprovante de Mestrado":
        fileName = "mestrado";
        break;

      case "Formulários para Indígenas (arquivo único)":
        fileName = "indigenas";
        break;

      case "Formulários para pessoas com deficiência (arquivo único)":
        fileName = "deficiencia";
        break;

      case "Certidão de Quitação Eleitoral":
        fileName = "eleitoral";
        break;

      case "Comprovante de Obrigações Militares":
        fileName = "militares";
        break;

      case "Páginas do Visto de Entrada no Brasil":
        fileName = "visto";
        break;
    }
    const url = await managerService.getUserFiles(candidate, fileName);
    if (url.length === 0) {
      addToast("Esse documento não foi enviado pelo candidato.", {
        appearance: "error",
      });
    }
    window.open(`${url[0].url}`);
  };
  return (
    <div className="Document-externalDiv">
      <div className="Document-icon">{children}</div>
      {text === "Form" && (
        <button
          type="button"
          onClick={() => handleClick()}
          className="Document-type"
        >
          {type}
        </button>
      )}
      {text === "Docs" && (
        <button
          type="button"
          onClick={() => handleClickShowDocs(candidate, type)}
          className="Document-type"
        >
          {type}
        </button>
      )}
    </div>
  );
}
export default SentDocuments;
