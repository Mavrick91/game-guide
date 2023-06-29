import axios from '../../config/axios';
import { type CustomQuery } from '../../types/useQuery';

export interface GamesLight {
  appid: number;
  name: string;
  playtime_forever: string;
  img_logo_url: string;
}
export interface GamesData {
  ownedGames: GamesLight[];
  playedRecently: GamesLight[];
}

export default function getGamesUserInfo(): CustomQuery<GamesData> {
  return {
    queryKey: ['games'],
    queryFn: async () => {
      const { data } = await axios.get<GamesData>('/user/games');
      return data;
    },
  };
}
