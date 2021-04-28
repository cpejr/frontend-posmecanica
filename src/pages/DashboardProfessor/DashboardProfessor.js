import React, { useState, useEffect } from 'react';
import { BiBeer } from 'react-icons/bi';
import Menu from '../../components/Menu';
import BoxDashboardProfessor from '../../components/Dashboards/Professor';

function DashboardProfessor() {
  const inputProps = [
    {
      icon: <BiBeer />,
      text: 'Inbox',
    },
    {
      icon: <BiBeer />,
      text: 'Starred',
    },
    {
      icon: <BiBeer />,
      text: 'Send email',
    },
    {
      icon: <BiBeer />,
      text: 'Drafts',
    },
  ];
  const students = ['Yasmim', 'Bryan', 'Paulo', 'Nando', 'Mauad', 'Teste', 'Teste', 'Yasmim', 'Bryan', 'Paulo', 'Nando', 'Mauad', 'Teste', 'Teste'];
  const limit = 5;
  const [filteredStudents, setFilteredStudents] = useState(students.slice(0, 5));
  const [page, setPage] = useState(1);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    setFilteredStudents(students.slice(index, limit * page));
  }, [page]);

  const RightPanelContent = (
    <BoxDashboardProfessor
      students={students}
      filteredStudents={filteredStudents}
      page={page}
      setPage={setPage}
      index={index}
      setIndex={setIndex}
    />
  );
  return (
    <div style={{ height: '100%' }}>
      <Menu RightPanelContent={RightPanelContent} inputProps={inputProps} />
    </div>
  );
}

export default DashboardProfessor;
