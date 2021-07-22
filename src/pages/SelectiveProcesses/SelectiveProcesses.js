import React, { useState, useEffect } from 'react';
import Footer from '../../components/Footer';
import StyledInput from '../../components/StyledInput';
import SelectiveProcess from '../../components/SelectiveProcess';
import * as managerService from '../../services/manager/managerService';
import './SelectiveProcesses.scss';
import Semeters from '../../utils/semesters';
import SiteHeader from '../../components/SiteHeader';

const semeters = Semeters;

function SelectiveProcesses() {
  const initialState = {
    semester: '',
  };
  const [dados, setDados] = useState(initialState);
  const [period, setPeriod] = useState('');
  const [processMestrado, setProcessMestrado] = useState([]);
  const [processDoutorado, setProcessDoutorado] = useState([]);
  useEffect(async () => {
    if (dados.semester === '') {
      setPeriod(`${dados.semester}`);
    } else {
      setPeriod(`: ${dados.semester}`);
    }
  }, [dados]);
  useEffect(async () => {
    const selectiveProcess = await managerService.getAllSelectiveProcess();
    let newArray = selectiveProcess.filter((process) => process.process_type === 'MESTRADO');
    setProcessMestrado(newArray);
    newArray = selectiveProcess.filter((process) => process.process_type === 'DOUTORADO');
    setProcessDoutorado(newArray);
  }, []);
  const handleChange = (value, field) => {
    setDados({ ...dados, [field]: value });
  };

  return (
    <div className="SP-externalDiv">
      <SiteHeader />
      <div className="SP-screen">
        <div className="SP-title">
          Processos Seletivos
        </div>
        <div className="subTitle-line" />
        <div className="SP-filter">
          <div className="SP-subtitle">
            Filtrar por tempo
          </div>
          <div className="SP-filterBox">
            <StyledInput
              type="text"
              id="semester"
              label="Semestre"
              width="16rem"
              field={semeters}
              select
              dados={dados}
              setDados={handleChange}
            />
          </div>
        </div>
        <div className="SP-box">
          <div className="SP-topBar">
            <div className="SP-barTitle">
              Período
              {period}
            </div>
          </div>
          <div className="SP-bottomBar">
            {processMestrado.map((process, key) => (
              <SelectiveProcess
                name={process.process_name}
                type={process.process_type}
                progress="Em andamento"
                chave={key}
              />
            ))}
            {processDoutorado.map((process) => (
              <SelectiveProcess
                name={process.process_name}
                type={process.process_type}
                id={process.process_id}
                progress="Finalizado"
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SelectiveProcesses;
