import React, { useState, useEffect } from 'react';
import BoxAdm from '../Inscritos/InscritosPS';
import BoxProf from '../Inscritos/InscritosIsoPS';
import StyledInput from '../StyledInput';
import { TitleTypes, AllTitleTypes } from '../../utils/titleTypes';
import './BoxDashboard.scss';

function BoxDashboard({
  title, subtitle, list,
  type, isoCandidates, setIsoCandidates,
  processes, listDefer, position,
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
      listDefer.forEach((e) => {
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
                {(dados.type !== '')
                  ? (
                    processes.map((process) => {
                      if (process.process_type === dados.type) {
                        if (position === 'first') {
                          list.forEach((e) => {
                            if (e.candidate_deferment === true
                              && e.selective_process.process_type === dados.type) {
                              processCount += 1;
                            }
                          });
                          if (process.count_candidates === 0) {
                            return 0;
                          }
                          if (process.count_candidates === processCount) {
                            return process.count_candidates;
                          }
                          finalCount = process.count_candidates - processCount;
                          return finalCount;
                        }
                        if (position === 'second') {
                          listDefer.forEach((e) => {
                            if (e.candidate_deferment === true
                              && e.selective_process.process_type === dados.type) {
                              processCount += 1;
                            }
                          });
                          if (process.count_candidates === 0) {
                            return 0;
                          }
                          return processCount;
                        }
                      }
                      return <div />;
                    })) : count()}
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
              width="16rem"
              field={type === 'prof' ? AllTitleTypes : TitleTypes}
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
                  if (dados.type === listItem.selective_process.process_type) {
                    return (
                      <BoxProf
                        candidate={listItem}
                        isoCandidates={isoCandidates}
                        setIsoCandidates={setIsoCandidates}
                        key={listItem.candidate_id}
                      />
                    );
                  }
                  if (dados.type === '') {
                    return (
                      <BoxProf
                        candidate={listItem}
                        isoCandidates={isoCandidates}
                        setIsoCandidates={setIsoCandidates}
                        key={listItem.candidate_id}
                      />
                    );
                  }
                }
                return <div />;
              }
              return <div />;
            })}
          </div>
          )}
          {position === 'second' && (
          <div className="BdDivGrid">
            {listDefer.map((listDeferItem) => {
              if (listDeferItem.candidate_deferment === true) {
                if (dados.type === listDeferItem.selective_process.process_type) {
                  return (
                    <BoxProf
                      candidate={listDeferItem}
                      isoCandidates={isoCandidates}
                      setIsoCandidates={setIsoCandidates}
                      key={listDeferItem.candidate_id}
                    />
                  );
                }
                if (dados.type === '') {
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
