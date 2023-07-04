import {
  type ReactElement,
  type KeyboardEvent,
  useCallback,
  useDeferredValue,
  useMemo,
  useState,
} from 'react';

import SearchIcon from '@mui/icons-material/Search';
import { useQueryClient } from '@tanstack/react-query';

import { type AllGames } from '../../endpoints/user/getAllGames';

export default function SearchGame(): ReactElement {
  const [inputValue, setInputValue] = useState('');
  const deferredQuery = useDeferredValue(inputValue);

  const queryClient = useQueryClient();
  const allGames = queryClient.getQueryData<AllGames[]>(['allGames']);

  const searchedGames = useMemo(() => {
    if (!deferredQuery) return null;

    return allGames
      ?.filter((game) =>
        game.name.toLowerCase().includes(deferredQuery.toLowerCase())
      )
      .sort((a, b) => a.name.localeCompare(b.name))
      .slice(0, 10);
  }, [allGames, deferredQuery]);

  const handleKeyPress = useCallback(
    (event: KeyboardEvent<HTMLInputElement>): void => {
      if (event.key === 'Escape') {
        setInputValue('');
      }
    },
    []
  );

  return (
    <>
      {deferredQuery && (
        <div className='absolute inset-0 z-10 bg-[#161616] bg-opacity-80' />
      )}
      <div className='relative z-50 flex flex-col'>
        <div className='relative z-20 flex'>
          <div className='absolute left-5 top-1/2 -translate-y-1/2 transform'>
            <SearchIcon fontSize='large' />
          </div>
          <input
            className='grow rounded-xl border border-[#BEBEBE] bg-[#161616] py-4 pl-16'
            placeholder='Search a game...'
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            onKeyDown={handleKeyPress}
            onBlur={() => {
              setInputValue('');
            }}
          />
        </div>
        <div className='absolute inset-x-0 top-full z-20 mt-2 rounded-xl bg-[#2E2E2E] shadow-2xl drop-shadow-lg'>
          {searchedGames?.map((game) => {
            return (
              <div key={game.appid} className='px-6 py-4'>
                {game.name}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
