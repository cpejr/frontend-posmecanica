/*eslint-disable*/
import React, { useState, useEffect } from "react";
import "./FormDis.scss";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import SiteHeader from "../../components/SiteHeader";
import Forms from "../../components/FormsDI";
import * as managerService from "../../services/manager/managerService";
import formsInput from "../../utils/formsIsoDis";

function FormDis() {
  const initialState = {
    candidate_name: "",
    candidate_cpf: "",
    candidate_identity: "",
    candidate_expedition: "",
    candidate_nationality: "",
    candidate_civil_state: "",
    candidate_birth: "",
    candidate_mother_name: "",
    candidate_father_name: "",
    candidate_race: "",
    candidate_gender: "",
    candidate_voter_title: "",
    candidate_zone_title: "",
    candidate_section_title: "",
    candidate_street: "",
    candidate_district: "",
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
    candidate_pGraduate_university: "",
    candidate_pGraduation_course: "",
    candidate_ufmg_active_serv: "",
    candidate_ufmg_retired_serv: "",
    first_discipline_isolated: "",
    second_discipline_isolated: "",
    third_discipline_isolated: "",
    fourth_discipline_isolated: "",
    candidate_justify: "",
  };
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(false);
  const history = useHistory();
  const { addToast } = useToasts();

  useEffect(async () => {
    const selectiveProcesses = await managerService.getActualSelectiveProcess(
      "process_type",
      "ISOLADA"
    );
    if (selectiveProcesses.length === 0) {
      // history.push("/");
    }
  }, []);

  const handleClick = async (e, dados) => {
    dados.candidate_grade = "NENHUMA DAS OPÇÕES";

    e.preventDefault();
    if (
      dados.candidate_name.length >= 1 &&
      dados.candidate_cpf.length >= 1 &&
      dados.candidate_identity.length >= 1 &&
      dados.candidate_expedition !== "" &&
      dados.candidate_nationality.length >= 1 &&
      dados.candidate_mother_name.length >= 1 &&
      dados.candidate_father_name.length >= 1 &&
      dados.candidate_civil_state.length >= 1 &&
      dados.candidate_birth !== "" &&
      dados.candidate_race.length >= 1 &&
      dados.candidate_gender.length >= 1 &&
      dados.candidate_voter_title.length >= 1 &&
      dados.candidate_zone_title !== "" &&
      dados.candidate_section_title !== "" &&
      dados.candidate_street !== "" &&
      dados.candidate_pGraduate_university !== "" &&
      dados.candidate_pGraduation_course !== "" &&
      dados.candidate_ufmg_active_serv !== "" &&
      dados.candidate_ufmg_retired_serv !== "" &&
      dados.candidate_city !== "" &&
      dados.candidate_state !== "" &&
      dados.candidate_district !== "" &&
      dados.candidate_state !== "" &&
      dados.candidate_adress_num !== "" &&
      dados.candidate_country.length >= 1 &&
      dados.candidate_cep.length >= 1 &&
      dados.candidate_grade_date_begin !== "" &&
      dados.candidate_grade_date_end !== "" &&
      dados.candidate_email.length >= 1 &&
      dados.candidate_phone_number.length >= 1 &&
      dados.candidate_university !== "" &&
      dados.candidate_graduation.length >= 1 &&
      files.length === 5 &&
      (dados.first_discipline_isolated &&
      dados.first_discipline_isolated !== dados.second_discipline_isolated &&
      dados.first_discipline_isolated !== dados.third_discipline_isolated &&
      dados.first_discipline_isolated !== dados.fourth_discipline_isolated) ||
      (dados.second_discipline_isolated &&
      dados.second_discipline_isolated !== dados.first_discipline_isolated &&
      dados.second_discipline_isolated !== dados.third_discipline_isolated &&
      dados.second_discipline_isolated !== dados.fourth_discipline_isolated) ||
      (dados.third_discipline_isolated &&
      dados.third_discipline_isolated !== dados.first_discipline_isolated &&
      dados.third_discipline_isolated !== dados.second_discipline_isolated &&
      dados.third_discipline_isolated !== dados.fourth_discipline_isolated) ||
      (dados.fourth_discipline_isolated &&
      dados.fourth_discipline_isolated !== dados.first_discipline_isolated &&
      dados.fourth_discipline_isolated !== dados.second_discipline_isolated &&
      dados.fourth_discipline_isolated !== dados.third_discipline_isolated)
     
    ) {
      const selectiveProcesses = await managerService.getActualSelectiveProcess(
        "process_type",
        "ISOLADA"
      );
      if (selectiveProcesses.length !== 0) {
        const id = await managerService.createCandidateISO(
          dados,
          selectiveProcesses[0].process_id
        );
        files.forEach(async (file) => {
          const data = new FormData();
          data.append("file", file.file);
          await managerService.uploadFile(data, id, file.name);
        });
        history.push("/");
        addToast("Cadastro realizado com sucesso!", { appearance: "success" });
      } else {
        addToast("O processo seletivo selecionado não está aberto!", {
          appearance: "error",
        });
      }
    } else if (
      (dados.first_discipline_isolated &&
        (dados.first_discipline_isolated === dados.second_discipline_isolated ||
        dados.first_discipline_isolated === dados.third_discipline_isolated ||
        dados.first_discipline_isolated === dados.fourth_discipline_isolated)) ||
      (dados.second_discipline_isolated &&
        (dados.second_discipline_isolated === dados.first_discipline_isolated ||
        dados.second_discipline_isolated === dados.third_discipline_isolated ||
        dados.second_discipline_isolated === dados.fourth_discipline_isolated)) ||
      (dados.third_discipline_isolated &&
        (dados.third_discipline_isolated === dados.first_discipline_isolated ||
        dados.third_discipline_isolated === dados.second_discipline_isolated ||
        dados.third_discipline_isolated === dados.fourth_discipline_isolated)) ||
      (dados.fourth_discipline_isolated &&
        (dados.fourth_discipline_isolated === dados.first_discipline_isolated ||
        dados.fourth_discipline_isolated === dados.second_discipline_isolated ||
        dados.fourth_discipline_isolated === dados.third_discipline_isolated))
    ) {
      addToast("Preencha com disciplinas diferentes!", { appearance: "error" });
    } else {
      addToast("Preencha todos os dados!", { appearance: "error" });
      setError(true);
    }
  };

  return (
    <div className="form_dis_screen">
      <SiteHeader />
      <h1> Inscrição:</h1>
      <Forms
        initialState={initialState}
        formsInput={formsInput}
        files={files}
        error={error}
        setFiles={setFiles}
        handleClick={handleClick}
      />
    </div>
  );
}
export default FormDis;
