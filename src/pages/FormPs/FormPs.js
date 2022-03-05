/*eslint-disable*/

import React, { useState, useEffect } from "react";
import moment from 'moment'
import "./FormPs.scss";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import SiteHeader from "../../components/SiteHeader";
import Forms from "../../components/Forms";
import * as managerService from "../../services/manager/managerService";
import formsInput from "../../utils/formsPs";

function FormPs() {
  const initialState = {
    candidate_name: "",
    candidate_cpf: "",
    candidate_identity: "",
    candidate_expedition: "",
    candidate_nationality: "",
    candidate_civil_state: "",
    candidate_birth: "",
    candidate_race: "",
    candidate_gender: "",
    candidate_voter_title: "",
    candidate_zone_title: "",
    candidate_section_title: "",
    candidate_street: "",
    candidate_adress_num: "",
    candidate_city: "",
    candidate_state: "",
    candidate_country: "",
    candidate_cep: "",
    candidate_email: "",
    candidate_phone_number: "",
    candidate_university: "",
    candidate_graduation: "",
    candidate_grade_date_begin: "",
    candidate_grade_date_end: "",
    candidate_grade: "",
    candidate_mother_name: "",
    candidate_father_name: "",
    candidate_grade_obtained: "",
    candidate_study_regimen: "",
    candidate_scholarship: "",
    candidate_concentration_area: "",
    candidate_PcD: "",
  };
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [exit, setExit] = useState(false);
  const [error, setError] = useState(false);
  const [hasSelectiveProcess, setHasSelectiveProcess] = useState(false);
  const history = useHistory();
  const { addToast } = useToasts();

  useEffect(async () => {
    const selectiveProcessesMestrado =
      await managerService.getActualSelectiveProcess(
        "process_type",
        "MESTRADO"
      );
    const selectiveProcessesDoutorado =
      await managerService.getActualSelectiveProcess(
        "process_type",
        "DOUTORADO"
      );
    if (
      selectiveProcessesMestrado.length === 0 &&
      selectiveProcessesDoutorado.length === 0
    ) {
      history.push("/");
    } else {
      setHasSelectiveProcess(true);
    }
  }, []);

  const verify = (dados) => {
    // verifica se é brasileiro homem e é candidato a doutorado
    if ((dados.candidate_nationality.toLowerCase().trim() === 'brasileira'
    || dados.candidate_nationality.toLowerCase().trim() === 'brasileiro') && dados.candidate_gender === 'masculino'
    && dados.candidate_grade === 'DOUTORADO' && files.length >= 12) {
      return true;
    }
    // verifica se é brasileiro homem e é candidato a mestrado
    else if ((dados.candidate_nationality.toLowerCase().trim() === 'brasileira'
      || dados.candidate_nationality.toLowerCase().trim() === 'brasileiro') && dados.candidate_gender === 'masculino'
      && dados.candidate_grade !== 'DOUTORADO' && files.length >= 10) {
      return true;
    }
    // verifica se é brasileiro mulher ou outro e é candidato a doutorado
    else if ((dados.candidate_nationality.toLowerCase().trim() === 'brasileira'
      || dados.candidate_nationality.toLowerCase().trim() === 'brasileiro') && dados.candidate_gender !== 'masculino'
      && dados.candidate_grade === 'DOUTORADO' && files.length >= 11) {
      return true;
    }
    // verifica se é brasileiro mulher ou outro e é candidato a mestrado
    else if ((dados.candidate_nationality.toLowerCase().trim() === 'brasileira'
      || dados.candidate_nationality.toLowerCase().trim() === 'brasileiro') && dados.candidate_gender !== 'masculino'
      && dados.candidate_grade !== 'DOUTORADO' && files.length >= 9) {
      return true;
    }
    // verifica se é estrangeiro e é candidato a doutorado
    else if ((dados.candidate_nationality.toLowerCase().trim() !== 'brasileira'
      && dados.candidate_nationality.toLowerCase().trim() !== 'brasileiro')
      && dados.candidate_grade === 'DOUTORADO' && files.length >= 11) {
      return true;
    }
    // verifica se é estrangeiro e é candidato a mestrado
    else if ((dados.candidate_nationality.toLowerCase().trim() !== 'brasileira'
      && dados.candidate_nationality.toLowerCase().trim() !== 'brasileiro')
      && dados.candidate_grade !== 'DOUTORADO' && files.length >= 9) {
      return true;
    }
    return false;
  }

  const handleClick = async (e, dados) => {
    e.preventDefault();
    if (
      dados.candidate_name.length >= 1 &&
      dados.candidate_cpf.length >= 1 &&
      dados.candidate_identity.length >= 1 &&
      dados.candidate_expedition !== "" &&
      dados.candidate_mother_name !== "" &&
      dados.candidate_father_name !== "" &&
      dados.candidate_nationality.length >= 1 &&
      dados.candidate_civil_state.length >= 1 &&
      dados.candidate_birth.length >= 1 &&
      dados.candidate_race.length >= 1 &&
      dados.candidate_gender.length >= 1 &&
      dados.candidate_voter_title.length >= 1 &&
      dados.candidate_zone_title !== "" &&
      dados.candidate_section_title !== "" &&
      dados.candidate_street !== "" &&
      dados.candidate_grade !== "" &&
      dados.candidate_city !== "" &&
      dados.candidate_state !== "" &&
      dados.candidate_adress_num !== "" &&
      dados.candidate_district !== "" &&
      dados.candidate_grade_date_begin !== "" &&
      dados.candidate_grade_date_end !== "" &&
      dados.candidate_country.length >= 1 &&
      dados.candidate_cep.length >= 1 &&
      dados.candidate_email.length >= 1 &&
      dados.candidate_phone_number.length >= 1 &&
      dados.candidate_university !== "" &&
      dados.candidate_grade_obtained !== "" &&
      dados.candidate_study_regimen !== "" &&
      dados.candidate_scholarship !== "" &&
      dados.candidate_concentration_area !== "" &&
      dados.candidate_PcD !== "" 
    ) {
      document.getElementById('botao').disabled = true;
      dados.candidate_birth = moment(dados.candidate_birth).format();
      dados.candidate_grade_date_begin = moment(dados.candidate_grade_date_begin).format();
      dados.candidate_grade_date_end = moment(dados.candidate_grade_date_end).format();
      dados.candidate_date_inscrition = moment(dados.candidate_date_inscrition).format();

      const selectiveProcesses = await managerService.getActualSelectiveProcess(
        "process_type",
        dados.candidate_grade
      );
      if (selectiveProcesses.length !== 0) {
        try {
          const id = await managerService.createCandidate(
            dados,
            selectiveProcesses[0].process_id
          );
          const infoSelectiveProcess = await managerService.getByIdSelectiveProcess(selectiveProcesses[0].process_id);
          let quantity = infoSelectiveProcess.candidate_quantity + 1;
          setLoading(true);
          await managerService.updateSelectiveProcess({ candidate_quantity: quantity, }, selectiveProcesses[0].process_id);
          for (const file of files) {
            const data = new FormData();
            data.append("file", file.file);
            await managerService.uploadFile(data, id, file.name);
          };
          setExit(true);
        } catch {
          addToast("Erro ao cadastrar candidato, confira se suas informações estão corretas!", { appearance: "error" });
          document.getElementById('botao').disabled = false;
          setLoading(false);
          setError(true);
          return;
        }
      } else {
        addToast("Processo seletivo não encontrado!", { appearance: "error" });
      }
    } else {
      if (!verify(dados)) {
        addToast("Insira todos os arquivos!", { appearance: "error" });
        document.getElementById('botao').disabled = false;
        setError(true);
      } else {
        addToast("Preencha todos os campos!", { appearance: "error" });
        document.getElementById('botao').disabled = false;
        setError(true);
      }
    }
  };
  return (
    <div className="screen-ps">
      {hasSelectiveProcess && (
        <>
          <SiteHeader />
          <h1> Inscrição Processo Seletivo:</h1>
          <Forms
            initialState={initialState}
            formsInput={formsInput}
            files={files}
            loading={loading}
            setFiles={setFiles}
            handleClick={handleClick}
            error={error}
            exit={exit}
          />
        </>
      )}

    </div>
  );
}
export default FormPs;
