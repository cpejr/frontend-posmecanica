import * as requesterService from '../requester/requesterService';

const isFailureStatus = (result) => !result || result.status >= 400;

export const forgetPass = async (user, id) => {
  const newSenha = { adm_defaultPassword: user };
  const response = await requesterService.Forgetpass(newSenha, id);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
  window.location.href = '/login';
};

export const getCandidates = async (field, filter) => {
  const times = 0;
  const response = await requesterService.getCandidates(times, field, filter);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
  return response.data;
};

export const getByIdCandidate = async (candidateId) => {
  const response = await requesterService.getByIdCandidate(candidateId);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
  return response.data;
};

export const createCandidate = async (candidate, selectiveProcessId) => {
  candidate.candidate_date_inscrition = new Date();
  const response = await requesterService.createCandidate(candidate, selectiveProcessId);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
};

export const updateCandidate = async (candidate, id) => {
  const response = await requesterService.updateCandidate(candidate, id);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
};

export const denyCandidate = async (candidateId) => {
  const response = await requesterService.deleteCandidate(candidateId);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
};

export const createDiscipline = async (discipline) => {
  const response = await requesterService.createDiscipline(discipline);
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

export const getSearchArea = async (field, filter) => {
  const times = 0;
  const response = await requesterService.getSearchArea(times, field, filter);
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

export const getByIdSelectiveProcess = async (selectiveProcessId) => {
  const response = await requesterService.getByIdSelectiveProcess(selectiveProcessId);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
  return response.data;
};

export const getAllSelectiveProcess = async () => {
  const times = 0;
  const response = await requesterService.getSelectiveProcess(times);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
  return response.data;
};
