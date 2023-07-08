import axios from '../../config/axios';
import { type CustomQuery } from '../../types/useQuery';

interface PriceOverviewSchema {
  final_formatted: string;
  initial_formatted: string;
  discount_percent: number;
  final: number;
  initial: number;
  currency: string;
}

export interface AllGames {
  appID: number;
  name: string;
  is_free: boolean;
  price_overview: PriceOverviewSchema;
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
