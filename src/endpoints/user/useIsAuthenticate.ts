import { useQuery, type UseQueryResult } from '@tanstack/react-query';

import { useApi } from '../../context/ApiProvider';

export default function useIsAuthenticate(): UseQueryResult<boolean> {
  const axios = useApi();

  return useQuery({
    queryKey: ['isAuthenticate'],
    queryFn: async () => {
      const res = await axios.get('/user/isAuthenticate');

      return res.data;
    },
  });
}
