import React, { useState, useEffect } from 'react';
import BoxAdm from '../Inscritos/InscritosPS';
import BoxProf from '../Inscritos/InscritosIsoPS';
import StyledInput from '../StyledInput';
import TitleType from '../../Utils/titleTypes';
import './BoxDashboard.scss';

const titleType = TitleType;

function BoxDashboard({
  title, subtitle, list, type, isoCandidates, setIsoCandidates, processes,
}) {
  const initialState = {
    type: '',
  };
  const [showInput, setShowInput] = useState(false);
  useEffect(async () => {
    if (type === 'adm') {
      setShowInput(true);
    }
  }, []);
  const [dados, setDados] = useState(initialState);
  const handleChange = (value, field) => {
    setDados({ ...dados, [field]: value });
  };
  // Função para contar número de candidato dos ps. É usada na linha 49
  function count() {
    let processCount = 0;
    processes.forEach((element) => {
      if (element.process_type === 'DOUTORADO' || element.process_type === 'MESTRADO') { processCount += element.count_candidates; }
    });
    return processCount;
  }

  return (
    <div className="BdMenu">
      <div className="BdTitle">
        {title}
      </div>
      <div>
        <div className="BdBox">
          <div className="BdBoxTitle">
            <div className="BdTitleNumber">
              <div className="BdSubTitle">
                {subtitle}
                {dados.type !== ''
                  ? (
                    processes.map((process) => {
                      if (process.process_type === dados.type) {
                        return process.count_candidates;
                      }
                      return <div />;
                    })) : count()}
              </div>
            </div>
            <div className={showInput ? 'BdInputReal' : 'BdInput'}>
              <StyledInput
                type="text"
                id="type"
                label="Título"
                width="16rem"
                field={titleType}
                select
                background="transparent"
                dados={dados}
                setDados={handleChange}
              />
            </div>
          </div>
          <div className="BdDivGrid">
            {list.map((listItem) => {
              if (type === 'adm') {
                if (dados.type === listItem.selective_process.process_type) {
                  return <BoxAdm candidate={listItem} key={listItem.candidate_id} />;
                }
                if (dados.type === '') {
                  return <BoxAdm candidate={listItem} key={listItem.candidate_id} />;
                }
                return <div />;
              }
              return (
                <BoxProf
                  candidate={listItem}
                  isoCandidates={isoCandidates}
                  setIsoCandidates={setIsoCandidates}
                  key={listItem.candidate_id}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BoxDashboard;
