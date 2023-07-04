import { type ReactElement, useDeferredValue } from "react";

import useSearchedGames from "../../hooks/useSearchedGames";

export default function PopupAllGames({ input }: { input: string }): ReactElement {
  const deferredQuery = useDeferredValue(input);
  const searchedGames = useSearchedGames(deferredQuery);

  return (
    <div className='no-scrollbar absolute inset-x-0 top-full z-20 mt-2 max-h-80 overflow-y-scroll rounded-xl bg-[#2E2E2E] shadow-2xl drop-shadow-lg'>
      {searchedGames?.map((game) => (
        <div key={game.appid} className='px-6 py-4'>
          {game.name}
        </div>
      ))}
    </div>
  );
}
