import React, { useState, useEffect } from 'react';
import BoxAdm from '../Inscritos/InscritosPS';
import BoxProf from '../Inscritos/InscritosIsoPS';
import StyledInput from '../StyledInput';
import { AllTitleTypes } from '../../utils/titleTypes';
import './BoxDashboard.scss';

function BoxDashboard({
  title, subtitle, list,
  type, isoCandidates, setIsoCandidates,
  processes, position, disciplineFilter,
}) {
  const initialState = {
    type: '',
  };
  const [showInput, setShowInput] = useState(false);
  useEffect(async () => {
    if (type === 'adm' || type === 'prof') {
      setShowInput(true);
    }
  }, []);
  const [dados, setDados] = useState(initialState);
  const handleChange = (value, field) => {
    setDados({ ...dados, [field]: value });
  };
  let processCount = 0;
  let finalCount = 0;

  function count() {
    processCount = 0;
    if (type === 'adm') {
      processes.forEach((element) => {
        processCount += element.count_candidates;
      });
      return processCount;
    }
    if (position === 'first') {
      list.forEach((e) => {
        if (e.candidate_deferment === false) {
          processCount += 1;
        }
      });
    }
    if (position === 'second') {
      list.forEach((e) => {
        if (e.candidate_deferment === true) {
          processCount += 1;
        }
      });
    }
    return processCount;
  }

  return (
    <div className="BdMenu">
      <div className="BdTitle">
        {title}
      </div>
      <div className="BdBoxFather">
        <div className="BdBoxTitle">
          <div className="BdTitleNumber">
            {type === 'prof' && (
              <div className="BdSubTitle">
                {subtitle}
                {processes.map((process) => {
                  if (position === 'first') {
                    if (list.length === 0) {
                      return 0;
                    }
                    if (process.count_candidates === 0) {
                      return 0;
                    }
                    if (list.length !== 0) {
                      list.forEach((e) => {
                        if (e.candidate_deferment === true) {
                          processCount += 1;
                        }
                      });
                    }
                    if (list.length === processCount) {
                      return list.length;
                    }
                    finalCount = list.length - processCount;
                    return finalCount;
                  }
                  if (position === 'second') {
                    if (list.length === 0) {
                      return 0;
                    }
                    list.forEach((e) => {
                      if (e.candidate_deferment === true) {
                        processCount += 1;
                      }
                    });
                    return processCount;
                  }
                  return <div />;
                })}
              </div>
            )}
            {type === 'adm' && (
              <div className="BdSubTitle">
                {subtitle}
                {(dados.type !== '' && type === 'adm') ? (
                  processes.map((process) => {
                    if (process.process_type === dados.type) {
                      return process.count_candidates;
                    }
                    return <div />;
                  })) : count()}
              </div>
            )}
          </div>
          <div className={showInput ? 'BdInputReal' : 'BdInput'}>
            <StyledInput
              type="text"
              id="type"
              label="Título"
              field={type === 'prof' ? disciplineFilter : AllTitleTypes}
              select
              background="transparent"
              dados={dados}
              setDados={handleChange}
            />
          </div>
        </div>
        <div className="BdBox">
          {position === 'first' && (
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
                if (type === 'prof') {
                  if (listItem.candidate_deferment === false) {
                    return (
                      <BoxProf
                        candidate={listItem}
                        isoCandidates={isoCandidates}
                        setIsoCandidates={setIsoCandidates}
                        key={listItem.candidate_id}
                      />
                    );
                  }
                  return <div />;
                }
                return <div />;
              })}
            </div>
          )}
          {position === 'second' && (
            <div className="BdDivGrid">
              {list.map((listDeferItem) => {
                if (listDeferItem.candidate_deferment === true) {
                  return (
                    <BoxProf
                      candidate={listDeferItem}
                      isoCandidates={isoCandidates}
                      setIsoCandidates={setIsoCandidates}
                      key={listDeferItem.candidate_id}
                    />
                  );
                }
                return <div />;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BoxDashboard;
