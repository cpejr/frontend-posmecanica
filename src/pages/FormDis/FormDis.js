import React, { useState, useEffect } from 'react';
import './FormDis.scss';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import SiteHeader from '../../components/SiteHeader';
import Forms from '../../components/FormsDI';
import * as managerService from '../../services/manager/managerService';
import formsInput from '../../utils/formsIsoDis';

function FormDis() {
  const initialState = {
    candidate_name: '',
    candidate_cpf: '',
    candidate_identity: '',
    candidate_expedition: '',
    candidate_nationality: '',
    candidate_civil_state: '',
    candidate_birth: '',
    candidate_race: '',
    candidate_gender: '',
    candidate_voter_title: '',
    candidate_zone_title: '',
    candidate_section_title: '',
    candidate_street: '',
    candidate_adress_num: '',
    candidate_city: '',
    candidate_state: '',
    candidate_country: '',
    candidate_cep: '',
    candidate_email: '',
    candidate_phone_number: '',
    candidate_university: '',
    candidate_graduation: '',
    candidate_grade_date_begin: '',
    candidate_grade_date_end: '',
    candidate_pGraduate_university: '',
    candidate_ufmg_active_serv: '',
    candidate_ufmg_retired_serv: '',
    first_discipline_isolated: '',
    second_discipline_isolated: '',
    third_discipline_isolated: '',
  };
  const [files, setFiles] = useState([]);
  const history = useHistory();
  const { addToast } = useToasts();

  useEffect(async () => {
    const selectiveProcesses = await managerService.getActualSelectiveProcess('process_type', 'ISOLADA');
    if (selectiveProcesses.length === 0) {
      history.push('login');
    }
  }, []);

  const handleClick = async (e, dados) => {
    e.preventDefault();
    if (dados.candidate_name.length > 3 && dados.candidate_cpf.length > 3
      && dados.candidate_identity.length > 3 && dados.candidate_expedition.length !== ''
      && dados.candidate_nationality.length > 3 && dados.candidate_civil_state.length > 3
      && dados.candidate_birth.length > 3 && dados.candidate_race.length > 3
      && dados.candidate_gender.length > 3 && dados.candidate_voter_title.length > 3
      && dados.candidate_zone_title.length !== '' && dados.candidate_section_title.length !== ''
      && dados.candidate_street.length !== '' && dados.candidate_pGraduate_university.length !== ''
      && dados.candidate_ufmg_active_serv.length !== '' && dados.candidate_ufmg_retired_serv.length !== ''
      && dados.candidate_city.length > 3 && dados.candidate_state.length > 3
      && dados.candidate_country.length > 3 && dados.candidate_cep.length > 3
      && dados.candidate_email.length > 3 && dados.candidate_phone_number.length > 3
      && dados.candidate_university.length > 3 && dados.candidate_graduation.length > 3
      && files.length === 4 && dados.first_discipline_isolated !== ''
      && dados.second_discipline_isolated !== '' && dados.third_discipline_isolated !== ''
      && dados.first_discipline_isolated !== dados.second_discipline_isolated
      && dados.first_discipline_isolated !== dados.third_discipline_isolated
      && dados.second_discipline_isolated !== dados.third_discipline_isolated) {
      const selectiveProcesses = await managerService.getActualSelectiveProcess('process_type', 'ISOLADA');
      const id = await managerService.createCandidate(
        dados, selectiveProcesses[0].process_id,
      );
      files.forEach(async (file) => {
        const data = new FormData();
        data.append('file', file.file);
        await managerService.uploadFile(data, id, file.name);
      });
      addToast('Cadastro realizado com sucesso!', { appearance: 'success' });
    } else if (dados.first_discipline_isolated !== ''
    && dados.second_discipline_isolated !== ''
    && dados.third_discipline_isolated !== ''
    && (dados.first_discipline_isolated === dados.second_discipline_isolated
    || dados.first_discipline_isolated === dados.third_discipline_isolated
    || dados.second_discipline_isolated === dados.third_discipline_isolated)) {
      addToast('Preencha com disciplinas diferentes!', { appearance: 'error' });
    } else {
      addToast('Preencha todos os dados!', { appearance: 'error' });
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
        setFiles={setFiles}
        handleClick={handleClick}
      />
    </div>
  );
}
export default FormDis;
