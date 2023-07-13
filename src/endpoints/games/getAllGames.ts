import axios from '../../config/axios';
import { type CustomQuery } from '../../types/useQuery';

export interface AllGames {
  appid: number;
  name: string;
}

export default function getAllGames(): CustomQuery<AllGames[]> {
  return {
    queryKey: ['allGames'],
    queryFn: async () => {
      const { data } = await axios.get<AllGames[]>('/games/all-games');

      return data;
    },
    staleTime: Infinity,
  };
}
