import AX, { type AxiosResponse } from 'axios';

const transformResponse = (
  data: AxiosResponse['data']
): AxiosResponse['data'] => {
  if (data === '') {
    data = null;
  }
  return JSON.parse(data);
};

const axios = AX.create({
  baseURL: 'http://localhost:4000',
  withCredentials: true,
  transformResponse: [transformResponse],
});

export default axios;
