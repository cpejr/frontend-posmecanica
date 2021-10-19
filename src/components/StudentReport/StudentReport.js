import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { InputAdornment, TextField } from '@material-ui/core';
import { useToasts } from 'react-toast-notifications';
import MenuItem from '@material-ui/core/MenuItem';
import typeAproval from '../../utils/typeAproval';
import '../Document/Document.scss';
import * as managerService from '../../services/manager/managerService';
import GenericModal from '../../utils/GenericModal';

function StudentReport({
  children,
  type,
  path,
  text,
  location,
}) {
  const history = useHistory();
  if (location.state == null) {
    window.location = '/login';
  }
  const { addToast } = useToasts();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDadosModal, setShowDadosModal] = useState(false);
  const [showAprovalModal, setShowAprovalModal] = useState(false);
  const [aproval, setAproval] = useState();
  const [days, setDays] = useState();
  const [quantidade, setQuantidade] = useState();
  const [valor, setValor] = useState();
  const handleClickReports = async () => {
    const student = await managerService.getByIdStudent(location.state.stud_id);
    if (path === 'declaracao') {
      setShowDadosModal(true);
      const studentProps = [
        {
          name: location.state.candidate_name,
          register: student.stud_registration,
          grade: location.state.candidate_grade,
          inscrition: location.state.candidate_date_inscrition,
          scholarship: location.state.candidate_scholarship,
          amount: quantidade,
          value: valor,
          currentDate: new Date(),
        },
      ];
      history.push({
        pathname: `/painel/administrator/relatorios/${path}`,
        state: { detail: studentProps },
      });
    } else if (path === 'escolha-membro') {
      setShowConfirmModal(true);
      const qualification = await managerService.getByStudentQualification(location.state.stud_id);
      if (!qualification) {
        addToast('O candidato não possui qualificação!', { appearance: 'error' });
      } else {
        const qualiProps = [
          {
            studName: qualification.quali_stud_name,
            title: qualification.quali_title,
            type: qualification.quali_type,
            qualiDays: days,
            place: qualification.quali_place,
            hour: qualification.quali_hour,
            date: qualification.quali_date,
            bank: student.stud_bank,
            advisor: student.stud_prof_advisor,
            currentDate: new Date(),
          },
        ];
        history.push({
          pathname: `/painel/administrator/relatorios/${path}`,
          state: { detail: qualiProps },
        });
      }
    } else {
      const defense = await managerService.getByStudentDefense(location.state.stud_id);
      if (!defense) {
        addToast('O candidato não possui defesa!', { appearance: 'error' });
      } else {
        if (path === 'ata-completa') {
          setShowAprovalModal(true);
        }
        const defenseProps = [
          {
            studName: defense.defense_stud_name,
            title: defense.defense_title,
            type: defense.defense_type,
            place: defense.defense_place,
            hour: defense.defense_hour,
            date: defense.defense_date,
            bank: student.stud_bank,
            advisor: student.stud_prof_advisor,
            number: defense.defense_protocol,
            register: student.stud_registration,
            aprovad: aproval,
            searchArea: location.state.candidate_concentration_area,
            currentDate: new Date(),
          },
        ];
        history.push({
          pathname: `/painel/administrator/relatorios/${path}`,
          state: { detail: defenseProps },
        });
      }
    }
  };
  const handleCloseClick = () => {
    setShowConfirmModal(false);
    setShowDadosModal(false);
    setShowAprovalModal(false);
  };
  const handleConfirmClick = async () => {
    handleClickReports();
  };
  const handleVerifyReport = async () => {
    if (path === 'escolha-membro') {
      setShowConfirmModal(true);
    } else if (path === 'declaracao' && location.state.candidate_scholarship === true) {
      setShowDadosModal(true);
    } else if (path === 'ata-completa') {
      setShowAprovalModal(true);
    } else {
      handleClickReports();
    }
  };
  return (
    <div className="Document-externalDiv">
      <div className="Document-icon">
        {children}
      </div>
      {text === 'Report'
        && (
          <button type="button" onClick={() => handleVerifyReport()} className="Document-type">
            {type}
          </button>
        )}
      {showConfirmModal && (
        <GenericModal
          handleCloseClick={handleCloseClick}
          handleConfirmClick={handleConfirmClick}
        >
          Defina o prazo para entrega final da defesa decidida pela banca.
          <TextField
            id="outlined-number"
            label="Dias"
            type="number"
            style={{ marginTop: '20px' }}
            onChange={(e) => setDays(e.target.value)}
          />
        </GenericModal>
      )}
      {showDadosModal && (
        <GenericModal
          handleCloseClick={handleCloseClick}
          handleConfirmClick={handleConfirmClick}
        >
          Defina a quantidade de bolsas recebidas pelo aluno(a) e seu respectivo valor.
          <TextField
            id="outlined-number"
            label="Quantidade"
            type="number"
            style={{ marginTop: '20px' }}
            onChange={(e) => setQuantidade(e.target.value)}
          />
          <TextField
            id="outlined-adornment-amount"
            label="Valor"
            InputProps={{
              startAdornment: <InputAdornment position="start">R$</InputAdornment>,
            }}
            style={{ marginTop: '20px' }}
            onChange={(e) => setValor(e.target.value)}
          />
        </GenericModal>
      )}
      {showAprovalModal && (
        <GenericModal
          handleCloseClick={handleCloseClick}
          handleConfirmClick={handleConfirmClick}
        >
          Defina o resultado final do aluno(a).
          <TextField
            id="outlined-select-currency"
            label="Resultado"
            select
            style={{ marginTop: '20px' }}
            onChange={(e) => setAproval(e.target.value)}
          >
            {typeAproval.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </GenericModal>
      )}
    </div>
  );
}
export default StudentReport;
