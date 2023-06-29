import { useQuery, type UseQueryResult } from '@tanstack/react-query';

import axios from '../../config/axios';

export default function useIsAuthenticated(): UseQueryResult<boolean> {
  return useQuery({
    queryKey: ['isAuthenticate'],
    queryFn: async () => {
      const res = await axios.get('/user/isAuthenticated');

      return res.data;
    },
  });
}
