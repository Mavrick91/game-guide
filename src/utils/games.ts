import { type AllGames } from '../endpoints/games/getAllGames';

export function searchedGames(query: string, allGames: AllGames[]): AllGames[] {
  if (!query) return [];
  const queryTerms = query.toLowerCase().split(' ');

  return (allGames ?? [])
    .filter((game) =>
      queryTerms.every((term) =>
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

      if (startsWithInputA && !startsWithInputB) return -1;
      if (!startsWithInputA && startsWithInputB) return 1;
      return 0;
    })
    .sort((a, b) => a.name.length - b.name.length)
    .slice(0, 500);
}
