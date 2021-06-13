import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import StyledInput from '../../components/StyledInput';
import SelectiveProcess from '../../components/SelectiveProcess';
import * as managerService from '../../services/manager/managerService';
import Semeters from '../../Utils/semesters';

const semeters = Semeters;

function SelectiveProcessDisIsolated() {
  const initialState = {
    semester: '',
  };

  const [dados, setDados] = useState(initialState);
  const [period, setPeriod] = useState('');
  const [disIsolated, setDisIsolated] = useState([]);

  useEffect(async () => {
    if (dados.semester === '') {
      setPeriod(`${dados.semester}`);
    } else {
      setPeriod(`: ${dados.semester}`);
    }
  }, [dados]);

  useEffect(async () => {
    const selectiveProcess = await managerService.getAllSelectiveProcess();
    const newArray = selectiveProcess.filter((process) => process.process_type === 'ISOLADA');
    setDisIsolated(newArray);
  }, []);

  return (
    <div className="SP-externalDiv">
      <Navbar />
      <div className="SP-screen">
        <div className="SP-title">
          Processos Seletivos de Disciplinas Isoladas
        </div>
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
              setDados={setDados}
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
            {disIsolated.map((discipline, process) => (
              <SelectiveProcess
                name={discipline.discipline_name}
                type={process.process_type}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SelectiveProcessDisIsolated;
