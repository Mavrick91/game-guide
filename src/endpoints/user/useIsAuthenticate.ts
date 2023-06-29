import { useQuery, type UseQueryResult } from '@tanstack/react-query';

import axios from '../../config/axios';

export default function useIsAuthenticate(): UseQueryResult<boolean> {
  return useQuery({
    queryKey: ['isAuthenticate'],
    queryFn: async () => {
      const res = await axios.get('/user/isAuthenticate');

      return res.data;
    },
  });
}
