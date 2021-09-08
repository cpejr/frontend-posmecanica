/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../../components/Footer';
import StyledInput from '../../components/StyledInput';
import SelectiveProcess from '../../components/SelectiveProcess';
import SPInfoModal from '../SentDocuments/SPInfoModal';
import * as managerService from '../../services/manager/managerService';
import './SelectiveProcesses.scss';
import Semeters from '../../utils/semesters';
import SiteHeader from '../../components/SiteHeader';

const semeters = Semeters;
const initialStateData = {
  process_type: '',
  process_name: '',
  process_date_begin: '',
  process_date_end: '',
};

function SelectiveProcesses() {
  const history = useHistory();
  const initialState = {
    semester: '',
  };
  const [showSPInfoModal, setShowSPInfoModal] = useState(false);
  const [dados, setDados] = useState(initialState);
  const [period, setPeriod] = useState('');
  const [allProcessMestrado, setAllProcessMestrado] = useState([]);
  const [filterProcessMestrado, setFilterProcessMestrado] = useState([]);
  const [allProcessDoutorado, setAllProcessDoutorado] = useState([]);
  const [filterProcessDoutorado, setFilterProcessDoutorado] = useState([]);
  const [allProcessIsolada, setAllProcessIsolada] = useState([]);
  const [filterProcessIsolada, setFilterProcessIsolada] = useState([]);
  const [data, setData] = useState(initialStateData);

  function verificationIsOpen(process) {
    const beginDate = new Date(process.process_date_begin);
    const endDate = new Date(process.process_date_end);
    const currentDate = new Date();
    if (currentDate >= beginDate && currentDate <= endDate) {
      return 'Em andamento';
    }
    return 'Finalizado';
  }
  const handleClickClose = () => {
    setShowSPInfoModal(false);
  };
  const handleClickOpen = () => {
    if (showSPInfoModal === true) {
      setShowSPInfoModal(false);
    } else {
      setShowSPInfoModal(true);
    }
  };
  const handleClickRedirect = () => {
    history.push('painel/professor');
  };

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
    newArray = selectiveProcess.filter((process) => process.process_type === 'ISOLADA');
    setAllProcessIsolada(newArray);
    setFilterProcessIsolada(newArray);
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
                infoPS={process}
                id={process.process_id}
                progress={verificationIsOpen(process)}
                setData={setData}
                handleClickOpen={handleClickOpen}
                chave={key}
              />
            ))}
            {filterProcessDoutorado.map((process) => (
              <SelectiveProcess
                infoPS={process}
                id={process.process_id}
                setData={setData}
                handleClickOpen={handleClickOpen}
                progress={verificationIsOpen(process)}
              />
            ))}
            {filterProcessIsolada.map((process) => (
              <SelectiveProcess
                infoPS={process}
                id={process.process_id}
                setData={setData}
                handleClickOpen={handleClickOpen}
                progress={verificationIsOpen(process)}
              />
            ))}
          </div>
          {showSPInfoModal && (
          <SPInfoModal
            conteudo={data}
            close={handleClickClose}
            redirect={handleClickRedirect}
            className="PSLinkButton"
          />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SelectiveProcesses;
