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

export const login = (user) => httpClient.post('/login', user);
