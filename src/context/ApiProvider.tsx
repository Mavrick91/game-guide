import {
  createContext,
  type ReactElement,
  type ReactNode,
  useContext,
  useMemo,
} from 'react';

import axios, { type AxiosInstance, type AxiosResponse } from 'axios';

const ApiContext = createContext<AxiosInstance | null>(null);

interface Props {
  children: ReactNode;
}

const transformResponse = (
  data: AxiosResponse['data']
): AxiosResponse['data'] => {
  if (data === '') {
    data = null;
  }
  return JSON.parse(data);
};

export default function ApiProvider({ children }: Props): ReactElement {
  const client = useMemo(() => {
    return axios.create({
      baseURL: 'http://localhost:4000',
      withCredentials: true,
      transformResponse: [transformResponse],
    });
  }, []);

  return <ApiContext.Provider value={client}>{children}</ApiContext.Provider>;
}

export const useApi = (): AxiosInstance => {
  const api = useContext(ApiContext);
  if (api == null) {
    throw new Error('useApi must be used within a ApiProvider');
  }
  return api;
};
