import { useMemo } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { type AllGames } from '../endpoints/user/getAllGames';

export default function useSearchedGames(
  query: string
): AllGames[] | undefined {
  const queryClient = useQueryClient();
  const allGames = queryClient.getQueryData<AllGames[]>(['allGames']);

  return useMemo(() => {
    if (!query) return [];

    const queryTerms = query.toLowerCase().split(' ');

    return allGames
      ?.filter((game) =>
        queryTerms.every((term: string) =>
          new RegExp(term, 'i').test(game.name.toLowerCase())
        )
      )
      .sort((a, b) => {
        const startsWithInputA = a.name
          .toLowerCase()
          .startsWith(query.toLowerCase());
        const startsWithInputB = b.name
          .toLowerCase()
          .startsWith(query.toLowerCase());

        if (startsWithInputA && !startsWithInputB) {
          return -1;
        } else if (!startsWithInputA && startsWithInputB) {
          return 1;
        } else {
          return 0;
        }
      })
      .sort((a, b) => a.name.length - b.name.length)
      .slice(0, 500);
  }, [allGames, query]);
}
