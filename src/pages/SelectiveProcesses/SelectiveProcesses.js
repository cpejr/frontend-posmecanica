/* eslint-disable no-unused-vars */
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
  const [allProcessMestrado, setAllProcessMestrado] = useState([]);
  const [filterProcessMestrado, setFilterProcessMestrado] = useState([]);
  const [allProcessDoutorado, setAllProcessDoutorado] = useState([]);
  const [filterProcessDoutorado, setFilterProcessDoutorado] = useState([]);
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
    setAllProcessMestrado(newArray);
    setFilterProcessMestrado(newArray);
    newArray = selectiveProcess.filter((process) => process.process_type === 'DOUTORADO');
    setAllProcessDoutorado(newArray);
    setFilterProcessDoutorado(newArray);
  }, []);

  useEffect(() => {
    let initialProcessMestrado = allProcessMestrado;
    let initialProcessDoutorado = allProcessDoutorado;
    if (period !== '') {
      initialProcessMestrado = initialProcessMestrado.filter((semester) => (
        semester.process_date_begin === period
      ));
      initialProcessDoutorado = initialProcessDoutorado.filter((semester) => (
        semester.process_date_begin === period
      ));
    }
    setFilterProcessMestrado(initialProcessMestrado);
    setFilterProcessDoutorado(initialProcessDoutorado);
  }, [period]);
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
              width="20em"
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
            {filterProcessMestrado.map((process, key) => (
              <SelectiveProcess
                name={process.process_name}
                // type={process.process_type}
                progress="Em andamento"
                chave={key}
              />
            ))}
            {filterProcessDoutorado.map((process) => (
              <SelectiveProcess
                name={process.process_name}
                // type={process.process_type}
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
