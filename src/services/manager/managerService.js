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

export const createCandidate = async (candidate, selectiveProcessId) => {
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
  } = candidate;
  const disciplines = [{ cd_dis_id: firstDisciplineIsolated },
    { cd_dis_id: secondDisciplineIsolated },
    { cd_dis_id: thirdDisciplineIsolated }];
  await requesterService
    .createCandidateDiscipline(response.data.id, disciplines);
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

export const createDiscipline = async (discipline) => {
  const response = await requesterService.createDiscipline(discipline);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
  return response.data;
};
export const sendResetEmail = async (email) => {
  const teste = JSON.parse(email);
  const response = await requesterService.sendResetEmail(teste);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
  window.location.href = '/login';
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
  const sdId = disciplines.map((sd) => ({ sd_dis_id: sd.discipline_id }));
  const { stud_scholarship: studScholarship } = student;

  const response = await requesterService.createStudent(student, studScholarship);
  await requesterService.createStudentDiscipline(response.data.id, sdId);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
};

export const getByIdStudent = async (studentId) => {
  const response = await requesterService.getByIdStudent(studentId);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
  return response.data;
};
