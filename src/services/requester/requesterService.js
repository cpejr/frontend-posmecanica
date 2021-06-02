import qs from 'querystring';
import httpClient from '../../hooks/httpClient';

export const getCandidates = (times, field, filter) => httpClient.get('/candidates', {
  params: {
    times,
    field,
    filter,
  },
  paramsSerializer: (params) => qs.stringify(params),
});

export const createCandidate = (candidate, selectiveProcessId) => httpClient.post(`/candidates/${selectiveProcessId}`, candidate);
export const getByIdCandidate = (candidateId) => httpClient.get(`/candidates/${candidateId}`);
export const deleteCandidate = (candidateId) => httpClient.delete(`/candidates/${candidateId}`);
export const updateCandidate = (candidate, candidateId) => httpClient.put(`/candidates/${candidateId}`, candidate);

export const createDiscipline = (discipline) => httpClient.post('/disciplines', discipline);

export const getSelectiveProcess = (times, field, filter) => httpClient.get('/selectiveProcesses', {
  params: {
    times,
    field,
    filter,
  },
  paramsSerializer: (params) => qs.stringify(params),
});

export const getSearchArea = (times, field, filter) => httpClient.get('/searchAreas', {
  params: {
    times,
    field,
    filter,
  },
});

export const Forgetpass = (newSenha, id) => httpClient.put(`/adms/${id}`, newSenha);

export const getByIdSelectiveProcess = (selectiveProcessId) => httpClient.get(`/selectiveProcesses/${selectiveProcessId}`);
export const getAllSelectiveProcess = (times) => httpClient.get('/selectiveProcesses/', {
  params: {
    times,
  },
});
export const login = (user) => httpClient.post('/login', user);

export const createProfessor = (professor) => httpClient.post('/professors', professor);
