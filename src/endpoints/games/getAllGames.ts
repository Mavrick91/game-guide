import axios from '../../config/axios';
import { type CustomQuery } from '../../types/useQuery';

export interface AllGames {
  appid: number;
  name: string;
}

interface GamesAPI {
  applist: {
    apps: AllGames[];
  };
}
export default function getAllGames(): CustomQuery<AllGames[]> {
  return {
    queryKey: ['allGames'],
    queryFn: async () => {
      const { data } = await axios.get<GamesAPI>('/games/all-games');

      return data.applist.apps.filter((game) => game.name);
    },
    staleTime: Infinity,
  };
}
