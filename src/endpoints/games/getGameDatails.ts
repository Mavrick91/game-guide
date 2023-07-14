import axios from '../../config/axios';
import { type CustomQuery } from '../../types/useQuery';

interface NewsItem {
  gid: string;
  title: string;
  url: string;
  is_external_url: boolean;
  author: string;
  contents: string;
  feedlabel: string;
  date: number;
  feedname: string;
  feed_type: number;
  appid: number;
  tags?: string[];
}

export interface AppNews {
  appid: number;
  newsitems: NewsItem[];
  count: number;
}

export default function getGameDetails(gameId: string): CustomQuery<AppNews> {
  return {
    queryKey: ['game', gameId],
    queryFn: async () => {
      const { data } = await axios.get<AppNews>(`/games/${gameId}`);
      return data;
    },
  };
}
