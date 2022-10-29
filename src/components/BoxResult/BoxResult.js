/* eslint-disable camelcase */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';
import StyledInput from '../StyledInput';
import * as managerService from '../../services/manager/managerService';
import './BoxResult.scss';
import DisciplinesResult from '../DisciplinesResult';

function BoxResult({
  subtitle, title,
  type, processes,
  disciplineFilter,
}) {
  const allDisciplinesKey = 'all';
  const initialState = {
    type: '',
  };

  const [dados, setDados] = useState(initialState);
  const [candidates, setCandidates] = useState();
  const [disciplineCandidates, setDisciplineCandidates] = useState({});
  const [loading, setLoading] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [disciplines, setDisciplines] = useState(disciplineFilter);
  const handleChange = (value, field) => {
    setDados({ ...dados, [field]: value });
  };

  useEffect(async () => {
    if (!disciplineFilter.length || !processes.length) return;

    setLoading(true);
    setEmpty(false);

    const requests = disciplineFilter.map(({ value }) => managerService.getAllCandidateDiscipline('cd_dis_id', value));
    const allDefermentedCandidatesByDiscipline = await Promise.all(requests);

    const proccessAllCandidates = (await managerService.getCandidates('candidate_process_id', processes[0]?.process_id))
      .reduce((acc, { candidate_id, candidate_name, candidate_cpf }) => {
        acc[candidate_id] = { candidate_id, candidate_name, candidate_cpf };
        return acc;
      }, {});

    const processDefermentedCandidatesByDiscipline = allDefermentedCandidatesByDiscipline
      .reduce((acc, defermentedCandidates, idx) => {
        const { label: name, value: id } = disciplineFilter[idx];

        const disciplineDefermentedCandidates = defermentedCandidates
          .reduce((discipline, {
            cd_candidate_id,
            cd_dis_deferment,
          }) => {
            if (
              Object.keys(proccessAllCandidates).includes(cd_candidate_id)
              && cd_dis_deferment
            ) {
              discipline.push({
                discipline_name: name,
                ...proccessAllCandidates[cd_candidate_id],
              });
            }
            return discipline;
          }, []);

        acc[id] = disciplineDefermentedCandidates;
        return acc;
      }, {});

    const allProcessDefermentedCandidates = Object.values(processDefermentedCandidatesByDiscipline)
      .reduce((acc, discipline) => [...acc, ...discipline], []);
    processDefermentedCandidatesByDiscipline[allDisciplinesKey] = allProcessDefermentedCandidates;
    setDisciplineCandidates(processDefermentedCandidatesByDiscipline);

    const allDisciplinesOption = { label: 'TODAS AS DISCIPLINAS', value: initialState.type };
    setDisciplines([allDisciplinesOption, ...disciplineFilter]);

    setLoading(false);
  }, [disciplineFilter, processes]);

  useEffect(() => {
    if (!Object.keys(disciplineCandidates).length) return;

    const disciplineId = dados.type || allDisciplinesKey;
    const filteredCandidates = disciplineCandidates[disciplineId];

    setCandidates(filteredCandidates);
    setEmpty(!filteredCandidates?.length);
  }, [dados.type, disciplineCandidates]);

  return (
    <div className="BoxResult">
      <div className="BoxResult-Father">
        <div className="BoxResult-Title">
          <div className={!dados.type ? 'Result-InputReal' : 'Result-InputRealNoIcon'}>
            <StyledInput
              type="text"
              id="type"
              label="Selecione uma disciplina"
              field={disciplines}
              select
              background="transparent"
              setDados={handleChange}
            />
          </div>
          <div className="BoxResult-SubTitleContent">
            <div className="BoxResult-SubTitle-names">
              {title}
            </div>
            <div className="BoxResult-SubTitle-total">
              {subtitle}
              {candidates?.length || 0}
            </div>
          </div>
        </div>
        <div className="Result-Indices">
          <p>NOME</p>
          <p>CPF</p>
          <p>DISCIPLINA</p>
        </div>
        <div className={type === 'prof' ? (
          loading ? 'BdBoxProfLoaderTrue' : 'BdBoxProf'
        ) : (
          loading ? 'BdBoxLoaderTrue' : 'BdBox'
        )}
        >
          {loading && (
            <div className="BdDivGridLoader">
              <CircularProgress color="inherit" size={32} className="LoaderProfCandidates" />
            </div>
          )}
          {empty && (
            <div className="BdDivGridNoDisciplineSelected">
              <p>~ Não há candidatos para essa disciplina ~</p>
            </div>
          )}
          {!loading && (
            <div className="ResultDiv-Grid">
              {candidates
                ?.sort((prev, next) => prev.candidate_name.localeCompare(next.candidate_name))
                ?.map((listDeferItem) => (
                  <DisciplinesResult
                    candidate={listDeferItem}
                    isoCandidates={candidates}
                    disciplineToDeferment={dados.type}
                    setIsoCandidates={setCandidates}
                    key={listDeferItem.candidate_id + listDeferItem.discipline_name}
                  />
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BoxResult;
