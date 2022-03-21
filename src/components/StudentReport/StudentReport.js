import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { InputAdornment, TextField } from '@material-ui/core';
import { useToasts } from 'react-toast-notifications';
import MenuItem from '@material-ui/core/MenuItem';
import typeAproval from '../../utils/typeAproval';
import '../Document/Document.scss';
import * as managerService from '../../services/manager/managerService';
import GenericModal from '../../utils/GenericModal';
import OptionsModal from '../../utils/OptionsModal';

function StudentReport({
  children,
  type,
  path,
  text,
  location,
}) {
  const history = useHistory();
  if (location.state == null) {
    window.location = '/';
  }
  const { addToast } = useToasts();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDadosModal, setShowDadosModal] = useState(false);
  const [showEndModal, setShowEndModal] = useState(false);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [showOptionsModal2, setShowOptionsModal2] = useState(false);
  const [showAprovalModal, setShowAprovalModal] = useState(false);
  const [negative1, setNegative1] = useState(false);
  const [negative2, setNegative2] = useState(false);
  const [aproval, setAproval] = useState();
  const [days, setDays] = useState();
  const [date, setDate] = useState('');
  const [year, setYear] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [valor, setValor] = useState('');
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
          dateEnd: date,
          years: year,
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
    setShowOptionsModal(false);
    setShowOptionsModal2(false);
    setShowEndModal(false);
    setDate('');
  };
  const handleConfirmClick = async () => {
    handleClickReports();
  };
  const handleVerifyReport = async () => {
    if (path === 'escolha-membro') {
      setShowConfirmModal(true);
    } else if (path === 'declaracao' && date === '' && negative1 === false) {
      setShowOptionsModal(true);
    } else if (path === 'declaracao' && location.state.candidate_scholarship === true && negative2 === false) {
      setShowOptionsModal2(true);
    } else if (path === 'ata-completa') {
      setShowAprovalModal(true);
    } else {
      handleClickReports();
    }
  };
  const handleContinueClick = async () => {
    setShowOptionsModal(false);
    setShowEndModal(true);
  };
  const handleContinueClick2 = async () => {
    setShowOptionsModal2(false);
    setShowDadosModal(true);
  };
  const handleContinueConfirmClick = async () => {
    setShowEndModal(false);
    handleVerifyReport();
  };
  const handleNegativeClick1 = async () => {
    setNegative1(true);
    setShowOptionsModal(false);
    handleVerifyReport();
  };
  const handleNegativeClick2 = async () => {
    setNegative2(true);
    setShowOptionsModal2(false);
    handleVerifyReport();
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
      {showOptionsModal && (
        <OptionsModal
          handleCloseClick={handleCloseClick}
          handleConfirmClick={handleContinueClick}
          handleNegativeClick={handleNegativeClick1}
        >
          Deseja incluir previsão de término?
        </OptionsModal>
      )}
      {showOptionsModal2 && (
        <OptionsModal
          handleCloseClick={handleCloseClick}
          handleConfirmClick={handleContinueClick2}
          handleNegativeClick={handleNegativeClick2}
        >
          Deseja incluir declaração de bolsista?
        </OptionsModal>
      )}
      {showEndModal && (
        <GenericModal
          handleCloseClick={handleCloseClick}
          handleConfirmClick={handleContinueConfirmClick}
        >
          Insira o tempo de duração e a data da previsão do término.
          <TextField
            id="outlined-number"
            label="Anos"
            type="number"
            style={{ marginTop: '20px' }}
            onChange={(e) => setYear(e.target.value)}
          />
          <TextField
            id="outlined-date"
            label="Data"
            type="date"
            style={{ marginTop: '20px' }}
            onChange={(e) => setDate(e.target.value)}
          />
        </GenericModal>
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
