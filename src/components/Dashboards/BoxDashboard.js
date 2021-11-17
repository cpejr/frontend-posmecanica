/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';
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
  const [candidates, setCandidates] = useState([]);
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
        'candidate_grade',
        'NENHUMA DAS OPÇÕES',
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

  function count() {
    processCount = 0;
    if (!dados.type) {
      processes.forEach((element) => {
        processCount += element.count_candidates;
      });
      return processCount;
    }
    processes.forEach((element) => {
      if (element.process_type === dados.type) {
        processCount += element.count_candidates;
      }
    });
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
                {() => {
                  if (position === 'first' && dados.type) {
                    if (candidates?.length === 0) {
                      return 0;
                    }
                    return counterByDiscipline(position);
                  }
                  if (position === 'second' && dados.type) {
                    if (candidates?.length === 0) {
                      return 0;
                    }
                    return counterByDiscipline(position);
                  }
                  return <div />;
                }}
              </div>
            )}
            {type === 'adm' && (
              <div className="BdSubTitle">
                {subtitle}
                {count()}
              </div>
            )}
          </div>
          <div className={showInput ? 'BdInputReal' : 'BdInput'}>
            <StyledInput
              type="text"
              id="type"
              label={type === 'prof' ? 'Selecione uma disciplina' : 'Processo seletivo'}
              field={type === 'prof' ? disciplineFilter : AllTitleTypes}
              select
              background="transparent"
              dados={dados}
              in
              setDados={handleChange}
            />
          </div>
        </div>
        <div className={type === 'prof' ? (
          loading ? 'BdBoxProfLoaderTrue' : 'BdBoxProf'
        ) : (
          loading ? 'BdBoxLoaderTrue' : 'BdBox'
        )}
        >
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
          {type === 'prof' && dados.type && loading === true && (
            <div className="BdDivGridLoader">
              <CircularProgress size={32} color="inherit" className="LoaderProfCandidates" />
            </div>
          )}
          {type === 'prof' && !dados.type && (
            <div className="BdDivGridNoDisciplineSelected">
              <p>~ Selecione uma disciplina ~</p>
            </div>
          )}
          {type === 'prof' && empty === true && (
            <div className="BdDivGridNoDisciplineSelected">
              <p>~ Não há candidatos para essa disciplina ~</p>
            </div>
          )}

          {position === 'first' && type === 'prof' && dados.type && loading === false && (
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
          {position === 'second' && dados.type && loading === false && (
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
