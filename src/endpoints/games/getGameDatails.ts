import axios from '../../config/axios';
import { type CustomQuery } from '../../types/useQuery';

export interface GamesDetails {
  appnews: {
    appid: number;
    newsitems: Array<{
      'gid': string;
      'title': string;
      'url': string;
      'is_external_url': boolean;
      'author': string;
      'contents': string;
      'feedlabel': string;
      'date': number;
      'feedname': string;
      'feed_type': 1;
      'appid': number;
    }>;
    count: number;
  };
}

export default function getGameDetails(
  gameId: string
): CustomQuery<GamesDetails> {
  return {
    queryKey: ['game', gameId],
    queryFn: async () => {
      const { data } = await axios.get<GamesDetails>(`/games/${gameId}`);
      return data;
    },
  };
}
