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

export const getSearchArea = (times) => httpClient.get('/searchAreas', {
  params: {
    times,
  },
});

export const login = (user) => httpClient.post('/login', user);

export const deleteCandidate = (candidateId) => httpClient.delete(`/candidates/${candidateId}`);
