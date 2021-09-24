import React, { useState, useEffect } from 'react';
import BoxAdm from '../Inscritos/InscritosPS';
import BoxProf from '../Inscritos/InscritosIsoPS';
import StyledInput from '../StyledInput';
import { AllTitleTypes } from '../../utils/titleTypes';
import './BoxDashboard.scss';
import * as managerService from '../../services/manager/managerService';

function BoxDashboard({
  title, subtitle, list,
  type, processes, position,
  disciplineFilter,
}) {
  const initialState = {
    type: '',
  };
  const [showInput, setShowInput] = useState(false);
  const [dados, setDados] = useState(initialState);
  const [candidates, setCandidates] = useState();
  const handleChange = (value, field) => {
    setDados({ ...dados, [field]: value });
  };
  let processCount = 0;

  useEffect(async () => {
    if (type === 'adm' || type === 'prof') {
      setShowInput(true);
    }
  }, []);

  useEffect(async () => {
    if (dados.type) {
      const filteredCandidates = await managerService.getCandidatesWithDisciplineSituation(
        'candidate_grade',
        'NENHUMA DAS OPÇÕES',
        dados.type,
      );
      setCandidates(filteredCandidates);
    }
  }, [dados.type]);

  const counterByDiscipline = (positions) => {
    processCount = 0;
    candidates?.forEach((e) => {
      if (positions === 'first') {
        if (e.candidate_discipline[0].cd_dis_deferment === null) {
          processCount += 1;
        }
      } else if (positions === 'second') {
        if (e.candidate_discipline[0].cd_dis_deferment === true) {
          processCount += 1;
        }
      }
    });

    return processCount;
  };

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
                  if (position === 'first' && dados.type) {
                    if (candidates?.length === 0) {
                      return 0;
                    }
                    if (process.count_candidates === 0) {
                      return 0;
                    }
                    if (candidates?.length !== 0) {
                      return counterByDiscipline(position);
                    }
                    if (candidates?.length === processCount) {
                      return candidates.length;
                    }
                  }
                  if (position === 'second' && dados.type) {
                    if (candidates?.length === 0) {
                      return 0;
                    }
                    return counterByDiscipline(position);
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
              in
              setDados={handleChange}
            />
          </div>
        </div>
        <div className={type === 'prof' ? 'BdBoxProf' : 'BdBox'}>
          {position === 'first' && type === 'adm' && (
            <div className="BdDivGrid">
              {list.map((listItem) => {
                if (dados.type === listItem.selective_process.process_type) {
                  return <BoxAdm candidate={listItem} key={listItem.candidate_id} />;
                }
                if (dados.type === '') {
                  return <BoxAdm candidate={listItem} key={listItem.candidate_id} />;
                }
                return <div />;
              })}
            </div>
          )}
          {position === 'first' && type === 'prof' && dados.type && (
            <div className="BdDivGrid">
              {candidates?.map((element) => {
                if (element.candidate_discipline[0].cd_dis_deferment === null) {
                  return (
                    <BoxProf
                      candidate={element}
                      isoCandidates={candidates}
                      disciplineToDeferment={dados.type}
                      setIsoCandidates={setCandidates}
                      key={element.candidate_id}
                    />
                  );
                }
                return <div />;
              })}
            </div>
          )}
          {position === 'second' && dados.type && (
            <div className="BdDivGrid">
              {candidates?.map((listDeferItem) => {
                if (listDeferItem.candidate_discipline[0].cd_dis_deferment === true) {
                  return (
                    <BoxProf
                      candidate={listDeferItem}
                      isoCandidates={candidates}
                      disciplineToDeferment={dados.type}
                      setIsoCandidates={setCandidates}
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
