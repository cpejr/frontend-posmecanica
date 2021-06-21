/* eslint-disable no-debugger */
import React, { useState, useEffect } from 'react';
import Header from '../../components/Navbar';
import Footer from '../../components/Footer';
import StyledInput from '../../components/StyledInput';
import * as managerService from '../../services/manager/managerService';
import { AllTitleTypes } from '../../utils/titleTypes';
import './StudentList.scss';

function StudentList() {
  const [allCandidates, setAllCandidates] = useState([]);
  const [filterCandidates, setFilterCandidates] = useState([]);
  const [years, setYears] = useState([]);
  const [filterName, setFilterName] = useState();
  const [filterYear, setFilterYear] = useState();
  const [filterGraduation, setFilterGraduation] = useState();
  const [expandRightPanel, setExpandRightPanel] = useState(true);

  useEffect(async () => {
    const candidates = await managerService.getCandidates();
    let yearsFilters = [{ label: 'Nenhum filtro', value: '' }];
    let existentYears = candidates.map((candidate) => {
      const parseDate = new Date(candidate.selective_process.process_date_end).getUTCFullYear();
      const parseDateObj = { label: `${parseDate}`, value: `${parseDate}` };
      return parseDateObj;
    });
    existentYears = [...new Map(existentYears.map((item) => [item.label, item])).values()];
    yearsFilters = yearsFilters.concat(existentYears);
    setAllCandidates(candidates);
    setFilterCandidates(candidates);
    setYears(yearsFilters);
  }, []);

  useEffect(() => {
    let initialCandidates = allCandidates;
    if (filterName) {
      initialCandidates = initialCandidates.filter(
        (candidate) => candidate.candidate_name.toLowerCase().includes(filterName.toLowerCase()),
      );
    }
    if (filterYear) {
      initialCandidates = initialCandidates.filter((candidate) => (
        new Date(candidate.selective_process.process_date_end)
          .getUTCFullYear()
          .toString() === filterYear
      ));
    }
    if (filterGraduation) {
      initialCandidates = initialCandidates.filter((candidate) => (
        candidate.selective_process.process_type.toLowerCase() === filterGraduation.toLowerCase()
      ));
    }
    setFilterCandidates(initialCandidates);
  }, [filterName, filterYear, filterGraduation]);

  const handleFilterNameChange = (value) => {
    setFilterName(value);
  };
  const handleFilterYearChange = (value) => {
    setFilterYear(value);
  };
  const handleFilterGraduationChange = (value) => {
    setFilterGraduation(value);
  };

  return (
    <div className="studentList-Root">
      <Header expandRightPanel={expandRightPanel} setExpandRightPanel={setExpandRightPanel} />
      <div className="studentList-Content">
        <div className="studentList-Filters">
          <StyledInput
            type="text"
            id="filter-name"
            label="Nome"
            width="16rem"
            dados={filterName}
            setDados={handleFilterNameChange}
          />
          <StyledInput
            type="number"
            id="filter-year"
            label="Ano"
            width="16rem"
            field={years}
            select
            dados={filterYear}
            setDados={handleFilterYearChange}
          />
          <StyledInput
            type="text"
            id="filter-graduation"
            label="Graduação"
            width="16rem"
            field={AllTitleTypes}
            select
            dados={filterGraduation}
            setDados={handleFilterGraduationChange}
          />
        </div>
        {filterCandidates.map((candidate) => <div>{candidate.candidate_name}</div>)}
      </div>
      <Footer />
    </div>
  );
}

export default StudentList;
