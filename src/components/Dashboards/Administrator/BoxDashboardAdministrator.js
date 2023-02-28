import React, { useState, useEffect } from "react";
import Box from "../BoxDashboard";
import * as managerService from "../../../services/manager/managerService";

function BoxDashboardAdministrator() {
  const [candidates, setCandidates] = useState([]);
  const [processsSelective, setProcesssSelective] = useState([]);
  useEffect(async () => {
    const selectiveProcesses =
      await managerService.getAllSelectiveProcessPainels("process_type", [
        "ISOLADA",
        "MESTRADO",
        "DOUTORADO",
      ]);
    let totalCandidates = await managerService.getCandidates(
      "candidate_process_id",
      selectiveProcesses.map((selectiveProcess) => selectiveProcess.process_id)
    );

    totalCandidates = totalCandidates.filter((response) => {
      if (
        response.candidate_approval !== true &&
        response.candidate_deferment !== true
      ) {
        return true;
      }
      return false;
    });
    setCandidates(totalCandidates);
    setProcesssSelective(selectiveProcesses);
  }, []);

  return (
    <Box
      title="Processo Seletivo"
      subtitle="Contagem de Inscritos: "
      position="first"
      list={candidates}
      processes={processsSelective}
      type="adm"
    />
  );
}

export default BoxDashboardAdministrator;
