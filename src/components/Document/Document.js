import React from 'react';
import { useHistory } from 'react-router-dom';
import './Document.scss';
import * as managerService from '../../services/manager/managerService';

function SentDocuments({
  children,
  candidate,
  type,
  path,
  handleClick,
  text,
  location,
}) {
  const history = useHistory();
  const handleClickShowDocs = async () => {
    const url = await managerService.getUserFiles(candidate, type);
    window.open(`${url[0].url}`);
  };
  const handleClickReports = async () => {
    const qualification = await managerService.getByStudentQualification(location.state.stud_id);
    const student = await managerService.getByIdStudent(location.state.stud_id);
    const qualiProps = [
      {
        studName: qualification.quali_stud_name,
        title: qualification.quali_title,
        type: qualification.quali_type,
        place: qualification.quali_place,
        hour: qualification.quali_hour,
        date: qualification.quali_date,
        bank: student.stud_bank,
        advisor: student.stud_advisor,
      },
    ];
    history.push({
      pathname: `/painel/administrator/relatorios/${path}`,
      state: { detail: qualiProps },
    });
  };
  return (
    <div className="Document-externalDiv">
      <div className="Document-icon">
        {children}
      </div>
      {text === 'Form'
        && (
          <button type="button" onClick={() => handleClick()} className="Document-type">
            {type}
          </button>
        )}
      {text === 'Docs'
        && (
          <button type="button" onClick={() => handleClickShowDocs(candidate, type)} className="Document-type">
            {type}
          </button>
        )}
      {text === 'Report'
        && (
          <button type="button" onClick={() => handleClickReports()} className="Document-type">
            {type}
          </button>
        )}
    </div>
  );
}
export default SentDocuments;
