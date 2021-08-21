import React, { useState } from 'react';
import './FormPs.scss';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import SiteHeader from '../../components/SiteHeader';
import Forms from '../../components/Forms';
import * as managerService from '../../services/manager/managerService';
import formsInput from '../../utils/formsPs';

function FormPs() {
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
  };
  const [files, setFiles] = useState([]);
  const history = useHistory();
  const { addToast } = useToasts();

  const handleClick = async (e, dados) => {
    e.preventDefault();
    if (dados.candidate_name.length > 3 && dados.candidate_cpf.length > 3
      && dados.candidate_identity.length > 3 && dados.candidate_expedition !== ''
      && dados.candidate_nationality.length > 3 && dados.candidate_civil_state.length > 3
      && dados.candidate_birth.length > 3 && dados.candidate_race.length > 3
      && dados.candidate_gender.length > 3 && dados.candidate_voter_title.length > 3
      && dados.candidate_zone_title !== '' && dados.candidate_section_title !== ''
      && dados.candidate_street !== '' && dados.candidate_grade !== ''
      && dados.candidate_city !== '' && dados.candidate_state !== ''
      && dados.candidate_adress_num !== '' && dados.candidate_district !== ''
      && dados.candidate_grade_date_begin > 3 && dados.candidate_grade_date_end > 3
      && dados.candidate_country.length > 3 && dados.candidate_cep.length > 3
      && dados.candidate_email.length > 3 && dados.candidate_phone_number.length > 3
      && dados.candidate_university !== '' && dados.candidate_graduation.length > 3
      && files.length === 4) {
      const selectiveProcesses = await managerService.getActualSelectiveProcess('process_type', dados.candidate_grade);
      if (selectiveProcesses.length !== 0) {
        const id = await managerService.createCandidate(dados, selectiveProcesses[0].process_id);
        files.forEach(async (file) => {
          const data = new FormData();
          data.append('file', file.file);
          await managerService.uploadFile(data, id, file.name);
        });
        history.push('/');
        addToast('Cadastro realizado com sucesso!', { appearance: 'success' });
      } else {
        addToast('Processo seletivo não encontrado!', { appearance: 'error' });
      }
    } else {
      addToast('Preencha todos os campos!', { appearance: 'error' });
    }
  };
  return (
    <div className="screen-ps">
      <SiteHeader />
      <h1> Inscrição Processo Seletivo:</h1>
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
export default FormPs;
