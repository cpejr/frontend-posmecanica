import * as requesterService from '../requester/requesterService';

const isFailureStatus = (result) => !result || result.status >= 400;

export const getCandidates = async (field, filter) => {
  const times = 0;
  const response = await requesterService.getCandidates(times, field, filter);

  if (isFailureStatus(response)) throw new Error('Problem with api response');

  return response.data;
};

export const getSelectiveProcess = async (field, filter) => {
  const times = 0;
  const response = await requesterService.getSelectiveProcess(times, field, filter);

  if (isFailureStatus(response)) throw new Error('Problem with api response');
  const filteredProcess = response.data.find(
    (object) => {
      const initialDate = new Date(object.process_date_begin);
      const finalDate = new Date(object.process_date_end);
      return initialDate <= new Date() && finalDate > new Date();
    },
  );
  return filteredProcess;
};

export const login = async (user) => {
  const response = await requesterService.login(user);
  if (isFailureStatus(response)) throw new Error('Problem with api response');
  const userStorage = {
    name: response.data.user.name,
    email: response.data.user.email,
    type: response.data.user.type,
    acessToken: response.data.accessToken,
  };
  localStorage.setItem('user', JSON.stringify(userStorage));
  window.location.href = '/';
};
