import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import StyledInput from '../../components/StyledInput';
import SelectiveProcess from '../../components/SelectiveProcess';
import './SelectiveProcesses.scss';
import Semeters from '../../Utils/semesters';

const semeters = Semeters;

function SelectiveProcesses() {
  const initialState = {
    semester: '',
  };
  const [dados, setDados] = useState(initialState);
  const [period, setPeriod] = useState('');
  useEffect(async () => {
    if (dados.semester === '') {
      setPeriod(` ${dados.semester}`);
    } else {
      setPeriod(`: ${dados.semester}`);
    }
  }, [dados]);
  return (
    <div className="SP-externalDiv">
      <Navbar />
      <div className="SP-screen">
        <div className="SP-title">
          Processos Seletivos
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
            <SelectiveProcess name="Processo 2021/1" type="Mestrado" progress="Em andamento" />
            <SelectiveProcess name="Processo 2021/1" type="Doutorado" progress="Finalizado" />
            <SelectiveProcess name="Processo 2021/1" type="Mestrado" progress="Em andamento" />
            <SelectiveProcess name="Processo 2021/1" type="Doutorado" progress="Finalizado" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SelectiveProcesses;
