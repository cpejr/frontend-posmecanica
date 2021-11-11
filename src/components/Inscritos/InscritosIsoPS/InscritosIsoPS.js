import React, { useState, useEffect } from 'react';
import { IconContext } from 'react-icons/lib';
import { BiUserCircle } from 'react-icons/bi';
import Button from '@material-ui/core/Button';
import { useToasts } from 'react-toast-notifications';
import InfoModal from '../../../pages/SentDocuments/InfoModal';
import DeferirModal from '../../../utils/DeferirModal';
import * as managerService from '../../../services/manager/managerService';
import './InscritosIsoPS.scss';

function InscritosIsoPS({
  isoCandidates, setIsoCandidates, candidate, disciplineToDeferment,
}) {
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showConfirmModalCandidate, setShowConfirmModalCandidate] = useState(false);
  const [buttonName, setButtonName] = useState();
  const [label, setLabel] = useState();
  const [showCandidate, setShowCandidate] = useState(true);
  const [object, setObject] = useState([]);
  const { addToast } = useToasts();

  const handleClickClose = () => {
    setShowInfoModal(false);
    setShowConfirmModalCandidate(false);
  };

  const totalApprovalCandidate = async () => {
    candidate.candidate_scholarship = false;
    await managerService.updateByIdDisciplineDeferment({
      cd_dis_deferment: true,
    }, candidate.candidate_id, disciplineToDeferment);
    await managerService.createStudent(candidate);
    await managerService.updateCandidate({
      candidate_deferment: true,
    }, candidate.candidate_id);
    setShowCandidate(false);
  };

  const deleteCandidate = async () => {
    await managerService.denyCandidate(candidate.candidate_id);
    const removeCandidate = isoCandidates.filter(
      (person) => person.candidate_id !== candidate.candidate_id,
    );
    setIsoCandidates(removeCandidate);
  };

  const verifyPriority = async (defermentTrue, cd) => {
    if ((defermentTrue?.some((item) => item.cd_dis_id === cd.first_discipline_isolated) === true
      && defermentTrue?.some((item) => item.cd_dis_id === cd.second_discipline_isolated) === true)
      || (defermentTrue?.some((item) => item.cd_dis_id === cd.first_discipline_isolated) === true
        && defermentTrue?.some((item) => item.cd_dis_id === cd.third_discipline_isolated) === true)
      || (defermentTrue?.some((item) => item.cd_dis_id === cd.second_discipline_isolated) === true
        && defermentTrue?.some((item) => item.cd_dis_id === cd.third_discipline_isolated) === true)
    ) {
      return true;
    }
    return false;
  };

  const verifySituation = async () => {
    const response1 = await managerService.getByIdDisciplineDefermentCandidateSituation(
      candidate.candidate_id,
      true,
    );
    const response2 = await managerService.getByIdDisciplineDefermentCandidateSituation(
      candidate.candidate_id,
      false,
    );
    const pendding = candidate.disciplines.length - response1.length - response2.length;
    if (pendding === 0) {
      return true;
    }
    return false;
  };

  const buildObject = (candidateId, disciplineId) => {
    const line = {};

    Promise.all([
      managerService.getByIdDiscipline(disciplineId),
      managerService.getByIdDisciplineDeferment(candidateId, disciplineId),
      managerService.getProfByDisciplineId(disciplineId),
    ]).then((response) => {
      line.disciplineName = response[0].discipline_name;
      line.candidateDisciplineDeferment = response[1][0].cd_dis_deferment;
      line.professorName = response[2].prof_name;
    });
    setObject((previousState) => [...previousState, line]);
  };

  const handleClickConfirmClick = async () => {
    if (buttonName === 'Deferir') {
      if (candidate.disciplines.length === 1) {
        totalApprovalCandidate();
      }
      if (candidate.disciplines.length === 2 || candidate.disciplines.length === 3) {
        await managerService.updateByIdDisciplineDeferment({
          cd_dis_deferment: true,
        }, candidate.candidate_id, disciplineToDeferment);
        verifySituation().then((res) => {
          if (res === true) {
            totalApprovalCandidate();
          }
        });
        setShowCandidate(false);
      }
      if (candidate.disciplines.length === 4) {
        await managerService.updateByIdDisciplineDeferment({
          cd_dis_deferment: true,
        }, candidate.candidate_id, disciplineToDeferment);
        setShowCandidate(false);
        const response = await managerService.getByIdDisciplineDefermentCandidateSituation(
          candidate.candidate_id, true,
        );
        if (response.length === 4) {
          verifyPriority(response, candidate).then((res) => {
            if (res === true) {
              managerService.updateByIdDisciplineDeferment({
                cd_dis_deferment: false,
              }, candidate.candidate_id, candidate.fourth_discipline_isolated);
              setShowCandidate(false);
              totalApprovalCandidate();
            }
          });
        }
        verifySituation().then((res) => {
          if (res === true) {
            totalApprovalCandidate();
          }
        });
      }
      addToast('Candidato deferido com sucesso!', { appearance: 'success' });
    } else {
      await managerService.updateByIdDisciplineDeferment({
        cd_dis_deferment: false,
      }, candidate.candidate_id, disciplineToDeferment);
      setShowCandidate(null);
      managerService.getByIdDisciplineDefermentCandidateSituation(candidate.candidate_id, false)
        .then((resp) => {
          if ((candidate.disciplines.length === 2 && resp.length === 2)
            || (candidate.disciplines.length === 3 && resp.length === 3)
            || (candidate.disciplines.length === 4 && resp.length === 4)
            || (candidate.disciplines.length === 1)) {
            deleteCandidate();
            setShowCandidate(null);
          } else {
            verifySituation().then((res) => {
              if (res === true) {
                candidate.candidate_scholarship = false;
                managerService.updateByIdDisciplineDeferment({
                  cd_dis_deferment: false,
                }, candidate.candidate_id, disciplineToDeferment);
                managerService.createStudent(candidate);
                managerService.updateCandidate({
                  candidate_deferment: true,
                }, candidate.candidate_id);
                setShowCandidate(null);
              }
            });
          }
        });
      addToast('Candidato indeferido com sucesso!', { appearance: 'success' });
    }
    setShowConfirmModalCandidate(false);
  };

  const handleClick = async (e) => {
    if (e.currentTarget.id === 'Deferir') {
      setButtonName('Deferir');
      setLabel('Deseja deferir esse candidato?');
    } else {
      setButtonName('Indeferir');
      setLabel('Deseja indeferir esse candidato?');
    }
    setShowConfirmModalCandidate(true);
  };

  useEffect(() => {
    setObject('');
    buildObject(candidate.candidate_id, candidate.first_discipline_isolated);
    if (candidate.second_discipline_isolated) {
      buildObject(candidate.candidate_id, candidate.second_discipline_isolated);
    }
    if (candidate.third_discipline_isolated) {
      buildObject(candidate.candidate_id, candidate.third_discipline_isolated);
    }
    if (candidate.fourth_discipline_isolated) {
      buildObject(candidate.candidate_id, candidate.fourth_discipline_isolated);
    }
  }, []);

  useEffect(() => {
    setShowCandidate(true);
  }, [disciplineToDeferment]);

  return (
    <div className="isoPsListItem" id={candidate.candidate_id}>
      <div className="isoPsDivItem">
        <IconContext.Provider value={{ size: 50 }}>
          <BiUserCircle className="isoPsIcon" />
        </IconContext.Provider>
        <p>{candidate.candidate_name}</p>
      </div>
      {showCandidate === true && candidate.candidate_discipline[0].cd_dis_deferment === null
        && (
          <div className="isoPsDivButtons">
            <Button className="isoPsConfirmButton" id="Deferir" onClick={(e) => handleClick(e)} variant="contained">Deferir</Button>
            <Button className="isoPsDenyButton" id="Indeferir" onClick={(e) => handleClick(e)} variant="contained">Indeferir</Button>
          </div>
        )}
      {(showCandidate === false || candidate.candidate_discipline[0].cd_dis_deferment === true)
        && (
          <div className="isoPsDivButtons">
            <div className="isoPsDivButtonsDeferido">
              <Button className="isoPsDefermentStatus" id="Deferido" variant="contained">Deferido</Button>
            </div>
          </div>
        )}
      {showCandidate === null
        && (
          <div className="isoPsDivButtons">
            <div className="isoPsDivButtonsDeferido" />
          </div>
        )}
      <div className="divButtonSituationStudent">
        <button type="button" className="buttonSituationStudent" onClick={() => setShowInfoModal(true)}>Ver situação do aluno</button>
      </div>
      {showInfoModal && (
        <InfoModal
          painelADM={0}
          disciplinaInfo={object}
          conteudo={candidate}
          close={handleClickClose}
          className="isoPsLinkButton"
        />
      )}
      {showConfirmModalCandidate && (
        <DeferirModal
          label={label}
          handleCloseClick={handleClickClose}
          handleConfirmClick={handleClickConfirmClick}
          className="confirmCandidateButton"
        />
      )}
    </div>
  );
}

export default InscritosIsoPS;
