import { useQuery, type UseQueryResult } from '@tanstack/react-query';

import axios from '../../config/axios';
import { type UserResponse } from '../../types/user';

export default function useGetUser(): UseQueryResult<UserResponse> {
  return useQuery<UserResponse>({
    queryKey: ['user', 'me'],
    queryFn: async () => {
      const res = await axios.get('/user/me');

      return res.data;
    },
  });
}
