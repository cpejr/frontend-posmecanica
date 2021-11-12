import * as requesterService from '../requester/requesterService';

const isFailureStatus = (result) => !result || result.status >= 400;

export const getCandidates = async (field, filter) => {
  let times = 0;
  let response;
  let allCandidates = [];
  do {
    response = await requesterService.getCandidates(times, field, filter);
    if (isFailureStatus(response)) throw new Error('Problem with api response');
    allCandidates = allCandidates.concat(response.data);
    times += 1;
  } while (response.data.length > 0);
  return allCandidates;
};

export const getByIdCandidate = async (candidateId) => {
  const response = await requesterService.getByIdCandidate(candidateId);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
  return response.data;
};

export const getUserFiles = async (candidateId, fileName) => {
  const response = await requesterService.getUserFiles(candidateId, fileName);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
  return response.data;
};

export const getAllCandidateDiscipline = async (field, filter) => {
  const times = 0;
  const response = await requesterService.getCandidateDiscipline(times, field, filter);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
  return response.data;
};

export const updateByIdDisciplineDeferment = async (deferment, candidateId, disciplineId) => {
  const response = await requesterService.updateByIdDisciplineDeferment(
    deferment,
    candidateId,
    disciplineId,
  );
  if (isFailureStatus(response)) throw new Error('Problem with api response');
  return response.data;
};

export const getByIdDisciplineDeferment = async (firstFilter, secondFilter) => {
  const response = await requesterService.getByIdDisciplineDeferment(firstFilter, secondFilter);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
  return response.data;
};

export const getByIdDisciplineDefermentCandidateSituation = async (filter, situation) => {
  const response = await requesterService
    .getByIdDisciplineDefermentCandidateSituation(filter, situation);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
  return response.data;
};

export const createQualification = async (qualification, qualiStudId) => {
  const response = await requesterService.createQualification(qualification, qualiStudId);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
  return response.data.id;
};

export const getByStudentQualification = async (qualiStudId) => {
  const response = await requesterService.getByStudentQualification(qualiStudId);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
  return response.data;
};

export const deleteQualification = async (qualiStudId) => {
  const response = await requesterService.deleteQualification(qualiStudId);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
  return response.data.id;
};

export const createDefense = async (defense, defenseStudId) => {
  const response = await requesterService.createDefense(defense, defenseStudId);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
  return response.data.id;
};

export const getByStudentDefense = async (defenseStudId) => {
  const response = await requesterService.getByStudentDefense(defenseStudId);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
  return response.data;
};

export const deleteDefense = async (defenseStudId) => {
  const response = await requesterService.deleteDefense(defenseStudId);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
  return response.data.id;
};

export const createCandidate = async (candidate, selectiveProcessId) => {
  candidate.candidate_date_inscrition = new Date();
  const response = await requesterService.createCandidate(candidate, selectiveProcessId);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
  return response.data.id;
};

export const createCandidateISO = async (candidate, selectiveProcessId) => {
  candidate.candidate_date_inscrition = new Date();
  const response = await requesterService.createCandidate(candidate, selectiveProcessId);
  const {
    first_discipline_isolated: firstDisciplineIsolated,
    second_discipline_isolated: secondDisciplineIsolated,
    third_discipline_isolated: thirdDisciplineIsolated,
    fourth_discipline_isolated: fourthDisciplineIsolated,
  } = candidate;
  const disciplines = [
    { cd_dis_id: firstDisciplineIsolated },
    { cd_dis_id: secondDisciplineIsolated },
    { cd_dis_id: thirdDisciplineIsolated },
    { cd_dis_id: fourthDisciplineIsolated }];
  const notNullableDisciplines = [];
  disciplines.map((id) => {
    if (id.cd_dis_id !== '') {
      notNullableDisciplines.push(id);
    }
    return notNullableDisciplines;
  });
  await requesterService
    .createCandidateDiscipline(response.data.id, notNullableDisciplines);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
  return response.data.id;
};

export const updateCandidate = async (candidate, id) => {
  const response = await requesterService.updateCandidate(candidate, id);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
};

export const denyCandidate = async (candidateId) => {
  const response = await requesterService.deleteCandidate(candidateId);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
};

export const uploadFile = async (file, candidateId, fileName) => {
  const response = await requesterService.uploadFile(file, candidateId, fileName);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
};

export const uploadThesis = async (file, candidateId, thesisName) => {
  const response = await requesterService.uploadThesis(file, candidateId, thesisName);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
};

export const createDiscipline = async (discipline, profId) => {
  const response = await requesterService.createDiscipline(discipline);
  const disciplineId = [{ pd_dis_id: response.data.id }];
  const { prof_id: professorId } = profId;
  await requesterService.createProfessorDiscipline(professorId, disciplineId);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
  return response.data;
};
export const sendResetEmail = async (email) => {
  const teste = JSON.parse(email);
  const response = await requesterService.sendResetEmail(teste);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
  return response;
};

export const getDisciplines = async (field, filter) => {
  let times = 0;
  let response;
  let allDisciplines = [];
  do {
    response = await requesterService.getDisciplines(times, field, filter);
    if (isFailureStatus(response)) throw new Error('Problem with api response');
    allDisciplines = allDisciplines.concat(response.data);
    times += 1;
  } while (response.data.length > 0);
  return allDisciplines;
};

export const getByIdDiscipline = async (disciplineId) => {
  const response = await requesterService.getByIdDiscipline(disciplineId);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
  return response.data;
};

export const updateDiscipline = async (discipline, disciplineId) => {
  const response = await requesterService.updateDiscipline(discipline, disciplineId);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
};

export const login = async (user) => {
  const response = await requesterService.login(user);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
  const usuario = response.data.user;
  const fields = Object.keys(usuario).find((field) => field.includes('id'));
  const id = usuario[fields];
  const userStorage = {
    name: response.data.user.name,
    email: response.data.user.email,
    type: response.data.user.type,
    acessToken: response.data.accessToken,
    id,
  };
  localStorage.setItem('user', JSON.stringify(userStorage));
  window.location.href = `/painel/${response.data.user.type}`;
};

export const createProfessor = async (professor) => {
  const response = await requesterService.createProfessor(professor);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
};

export const getProfByDisciplineId = async (disciplineId) => {
  const response = await requesterService.getProfByDisciplineId(disciplineId);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
  return response.data;
};

export const getAllProfessors = async () => {
  const times = 0;
  const response = await requesterService.getProfessor(times);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
  return response.data;
};

export const getAllProfessorDiscipline = async (field, filter) => {
  const times = 0;
  const response = await requesterService.getProfessorDiscipline(times, field, filter);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
  return response.data;
};

export const getSearchArea = async (field, filter) => {
  const times = 0;
  const response = await requesterService.getSearchArea(times, field, filter);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
};

export const getAllSearchAreas = async () => {
  const times = 0;
  const response = await requesterService.getSearchArea(times);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
  return response.data;
};

export const createSelectiveProcess = async (selectiveProcess) => {
  const response = await requesterService.createSelectiveProcess(selectiveProcess);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
};

export const verifySelectiveProcess = async (field, dados) => {
  const times = 0;
  const response = await requesterService.getSelectiveProcess(times, field, dados.process_type);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
  const filteredProcess = response.data.filter(
    (object) => {
      const initialDate = new Date(object.process_date_begin);
      const finalDate = new Date(object.process_date_end);
      const actualInitialDate = new Date(dados.process_date_begin);
      const actualFinalDate = new Date(dados.process_date_end);
      // condição para não criar
      return (actualInitialDate >= initialDate && actualInitialDate <= finalDate)
        || (actualFinalDate >= initialDate && actualFinalDate <= finalDate)
        || (actualInitialDate <= initialDate && actualFinalDate >= finalDate);
    },
  );
  return filteredProcess;
};

export const getActualSelectiveProcess = async (field, filter) => {
  const times = 0;
  const response = await requesterService.getSelectiveProcess(times, field, filter);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
  const filteredProcess = response.data.filter(
    (object) => {
      const initialDate = new Date(object.process_date_begin);
      const finalDate = new Date(object.process_date_end);
      return initialDate <= new Date() && finalDate > new Date();
    },
  );
  return filteredProcess;
};

export const getAllSelectiveProcess = async () => {
  const times = 0;
  const response = await requesterService.getSelectiveProcess(times);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
  return response.data;
};

export const getByIdSelectiveProcess = async (selectiveProcessId) => {
  const response = await requesterService.getByIdSelectiveProcess(selectiveProcessId);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
  return response.data;
};

export const updateSelectiveProcess = async (selectiveProcess, selectiveProcessId) => {
  const response = await requesterService
    .updateSelectiveProcess(selectiveProcess, selectiveProcessId);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
};

export const getStudents = async (field, filter) => {
  let times = 0;
  let response;
  let allStudents = [];
  do {
    response = await requesterService.getStudents(times, field, filter);
    if (isFailureStatus(response)) throw new Error('Problem with api response');
    allStudents = allStudents.concat(response.data);
    times += 1;
  } while (response.data.length > 0);
  return allStudents;
};

export const updateStudent = async (student, id) => {
  const response = await requesterService.updateStudent(student, id);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
};

export const createStudent = async (student) => {
  const { disciplines } = student;
  if (disciplines.length > 0) {
    let sdId;
    const sdIdArray = [];
    let verify = false;

    const candidateDiscipline = await requesterService
      .getByIdDisciplineDefermentCandidateSituation(student.candidate_id, true);
    if (disciplines.length === 4) {
      if (candidateDiscipline.data.length === 3) {
        sdIdArray.push({ sd_dis_id: student.first_discipline_isolated });
        sdIdArray.push({ sd_dis_id: student.second_discipline_isolated });
        sdIdArray.push({ sd_dis_id: student.third_discipline_isolated });
        verify = true;
      }
    } else {
      sdId = candidateDiscipline?.data?.map((sd) => ({ sd_dis_id: sd.cd_dis_id }));
    }

    const {
      candidate_scholarship: studScholarship,
      candidate_email: email,
      candidate_name: name,
    } = student;
    const response = await requesterService.createStudent(student, studScholarship, email, name);
    if (disciplines.length === 4 && verify === true) {
      await requesterService.createStudentDiscipline(response.data.id, sdIdArray);
    } else {
      await requesterService.createStudentDiscipline(response.data.id, sdId);
    }
    if (isFailureStatus(response)) throw new Error('Problem with api response');
  } else {
    const {
      candidate_email: email,
      candidate_name: name,
      candidate_scholarship: studScholarship,
    } = student;
    const response = await requesterService.createStudent(student, studScholarship, email, name);
    if (isFailureStatus(response)) throw new Error('Problem with api response');
  }
};

export const deleteStudent = async (studentId) => {
  const response = await requesterService.deleteStudent(studentId);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
};

export const getByIdStudent = async (studentId) => {
  const response = await requesterService.getByIdStudent(studentId);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
  return response.data;
};

export const getCandidatesWithDisciplineSituation = async (field, filter, pageFilter) => {
  let times = 0;
  let response;
  let allCandidates = [];
  do {
    response = await requesterService.getCandidates(times, field, filter);
    if (isFailureStatus(response)) throw new Error('Problem with api response');
    allCandidates = allCandidates.concat(response.data);
    times += 1;
  } while (response.data.length > 0);

  const process = await getActualSelectiveProcess('process_type', 'ISOLADA');
  const processFilter = allCandidates
    .filter((resp) => resp.candidate_process_id === process[0].process_id);

  const filteredCandidates = processFilter
    .filter((resp) => resp.disciplines.some(
      (element) => element.discipline_id === pageFilter,
    ) === true);

  // eslint-disable-next-line no-restricted-syntax
  for (const data of filteredCandidates) {
    const candidateDiscipline = await requesterService.getByIdDisciplineDeferment(
      data.candidate_id,
      pageFilter,
    );
    data.candidate_discipline = candidateDiscipline.data;
  }

  return filteredCandidates;
};
