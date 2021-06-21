import React, { useState, useEffect } from 'react';
import Header from '../../components/Navbar';
import Footer from '../../components/Footer';
import StyledInput from '../../components/StyledInput';
import * as managerService from '../../services/manager/managerService';
import './StudentList.scss';

function StudentList() {
  const [candidates, setCandidates] = useState([]);
  const [expandRightPanel, setExpandRightPanel] = useState(true);
  useEffect(async () => {
    const allCandidates = await managerService.getCandidates();
    setCandidates(allCandidates);
  }, []);

  return (
    <div className="studentList-Root">
      <Header expandRightPanel={expandRightPanel} setExpandRightPanel={setExpandRightPanel} />
      <div className="studentList-Content">
        <StyledInput
          type="text"
          id="semester"
          label="Semestre"
          width="16rem"
          field={semeters}
          dados={dados}
          setDados={handleChange}
        />
        <StyledInput
          type="text"
          id="semester"
          label="Semestre"
          width="16rem"
          field={semeters}
          select
          dados={dados}
          setDados={handleChange}
        />
        <StyledInput
          type="text"
          id="semester"
          label="Semestre"
          width="16rem"
          field={semeters}
          select
          dados={dados}
          setDados={handleChange}
        />
        {candidates.map((candidate) => <div>{candidate.candidate_name}</div>)}
      </div>
      <Footer />
    </div>
  );
}

export default StudentList;
