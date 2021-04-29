/* eslint-disable no-debugger */
import React, { useState, useEffect } from 'react';
import { IconContext } from 'react-icons/lib';
import { BiUserCircle } from 'react-icons/bi';
import Button from '@material-ui/core/Button';
import Pagination from '@material-ui/lab/Pagination';
import './BoxDashboardProfesssor.scss';
import * as managerService from '../../../services/manager/managerService';

function BoxDashboardProfesssor() {
  const limit = 5;
  const [candidates, setCandidates] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [page, setPage] = useState(1);
  const [index, setIndex] = useState(0);

  useEffect(async () => {
    const selectiveProcess = await managerService.getSelectiveProcess('process_type', 'ISOLADA');
    const isolatedCandidates = await managerService.getCandidates('candidate_process_id', selectiveProcess.candidate_process_id);
    setCandidates(isolatedCandidates);
  }, []);
  useEffect(() => {
    setFilteredStudents(candidates.slice(0, 5));
  }, [candidates]);
  useEffect(() => {
    setFilteredStudents(candidates.slice(index, limit * page));
  }, [page]);

  const calculatePages = () => {
    const division = parseInt(candidates.length / 5, 10);
    return candidates.length % 5 === 0 ? division : division + 1;
  };
  const nextPage = (e, value) => {
    if (value > page) {
      setIndex((value - 1) * 5);
    } else {
      setIndex(index - 5);
    }
    setPage(value);
  };

  const handleClick = (e) => {
    console.log(e, e.target, e.target.id);
  };

  return (
    <div className="professorMenu">
      <div className="professorTitle">
        Matrículas Isoladas Realizadas:
      </div>
      <div>
        <div className="professorBox">
          <div className="profBoxTitle">
            Alunos:
          </div>
          <div className="divGrid">
            <div>
              {filteredStudents.map((candidate, key) => (
                <div className="listItem" id={key}>
                  <div className="divItem">
                    <IconContext.Provider value={{ size: 60 }}>
                      <BiUserCircle className="icon" />
                    </IconContext.Provider>
                    {candidate.candidate_name}
                  </div>
                  <div className="divButtons">
                    <Button className="confirmButton" id="Deferir" onClick={handleClick} variant="contained">Deferir</Button>
                    <Button className="denyButton" id="Indeferir" onClick={handleClick} variant="contained">Indeferir</Button>
                  </div>
                  <a
                    href="https://www.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="linkButton"
                  >
                    Ver situação do aluno
                  </a>
                </div>
              ))}
            </div>
            <Pagination
              onChange={(e, value) => nextPage(e, value)}
              count={calculatePages()}
              page={page}
              size="small"
              shape="rounded"
              className="pagination"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BoxDashboardProfesssor;
