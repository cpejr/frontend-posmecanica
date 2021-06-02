import httpClient from '../../hooks/httpClient';

export const getCandidates = (times, field, filter) => httpClient.get('/candidates', {
  params: {
    times,
    field,
    filter,
  },
});

export const getSelectiveProcess = (times, field, filter) => httpClient.get('/selectiveProcesses', {
  params: {
    times,
    field,
    filter,
  },
});

export const getSearchArea = (times, field, filter) => httpClient.get('/searchAreas', {
  params: {
    times,
    field,
    filter,
  },
});

export const getByIdSelectiveProcess = (selectiveProcessId) => httpClient.get(`/selectiveProcesses/${selectiveProcessId}`);
export const getAllSelectiveProcess = (times) => httpClient.get('/selectiveProcesses/', {
  params: {
    times,
  },
});
export const login = (user) => httpClient.post('/login', user);
export const createCandidate = (candidate, selectiveProcessId) => httpClient.post(`/candidates/${selectiveProcessId}`, candidate);
export const createProfessor = (professor) => httpClient.post('/professors', professor);
export const getByIdCandidate = (candidateId) => httpClient.get(`/candidates/${candidateId}`);
export const deleteCandidate = (candidateId) => httpClient.delete(`/candidates/${candidateId}`);
