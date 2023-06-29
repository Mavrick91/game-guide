import axios from '../../config/axios';
import { type CustomQuery } from '../../types/useQuery';

export default function isAuthenticate(): CustomQuery<boolean> {
  return {
    queryKey: ['isAuthenticate'],
    queryFn: async () => {
      const res = await axios.get('/user/isAuthenticate');

      return res.data;
    },
    cacheTime: 0,
  };
}
