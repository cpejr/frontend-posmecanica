/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';
import StyledInput from '../StyledInput';
import * as managerService from '../../services/manager/managerService';
import './BoxResult.scss';
import DisciplinesResult from '../DisciplinesResult';

function BoxResult({
  subtitle, title,
  type, processes, position,
  disciplineFilter,
}) {
  const initialState = {
    type: '',
  };
  const [showInput, setShowInput] = useState(false);
  const [dados, setDados] = useState(initialState);
  const [candidates, setCandidates] = useState();
  const [loading, setLoading] = useState(false);
  const [empty, setEmpty] = useState(false);
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
    setEmpty(false);
    if (dados.type) {
      setLoading(true);
      const filteredCandidates = await managerService.getCandidatesWithDisciplineSituation(
        'candidate_process_id',
        processes[0].process_id,
        dados.type,
      );

      setLoading(false);
      setCandidates(filteredCandidates);
      let verify;
      if (position === 'first') {
        verify = filteredCandidates
          ?.every((resp) => resp.candidate_discipline[0].cd_dis_deferment === true);
      } else {
        verify = filteredCandidates
          ?.every((resp) => resp.candidate_discipline[0].cd_dis_deferment === null);
      }
      if (filteredCandidates?.length === 0 || verify === true) {
        setEmpty(true);
      }
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

  return (
    <div className="BoxResult">
      <div className="BoxResult-Father">
        <div className="BoxResult-Title">
          <div className={showInput ? (!dados.type ? 'Result-InputReal' : 'Result-InputRealNoIcon') : 'Result-Input'}>
            <StyledInput
              type="text"
              id="type"
              label="Selecione uma disciplina"
              field={disciplineFilter}
              select
              background="transparent"
              dados={dados}
              in
              setDados={handleChange}
            />
          </div>
          <div className="BoxResult-SubTitleContent">
            <div className="BoxResult-SubTitle-names">
              {title}
            </div>
            <div className="BoxResult-SubTitle-total">
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
          </div>
        </div>
        <div className="Result-Indices">
          <p>NOME</p>
          <p>CPF</p>
        </div>
        <div className={type === 'prof' ? (
          loading ? 'BdBoxProfLoaderTrue' : 'BdBoxProf'
        ) : (
          loading ? 'BdBoxLoaderTrue' : 'BdBox'
        )}
        >
          {dados.type && loading === true && (
            <div className="BdDivGridLoader">
              <CircularProgress size={32} color="inherit" className="LoaderProfCandidates" />
            </div>
          )}
          {!dados.type && (
            <div className="BdDivGridNoDisciplineSelected">
              <p>~ Selecione uma disciplina ~</p>
            </div>
          )}
          {empty === true && (
            <div className="BdDivGridNoDisciplineSelected">
              <p>~ Não há candidatos para essa disciplina ~</p>
            </div>
          )}

          {position === 'first' && dados.type && loading === false && (
            <div className="ResultDiv-Grid">
              {candidates?.map((element) => {
                if (element.candidate_discipline[0].cd_dis_deferment === null) {
                  return (
                    <DisciplinesResult
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
          {position === 'second' && dados.type && loading === false && (
            <div className="ResultDiv-Grid">
              {candidates?.map((listDeferItem) => {
                if (listDeferItem.candidate_discipline[0].cd_dis_deferment === true) {
                  return (
                    <DisciplinesResult
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

export default BoxResult;
