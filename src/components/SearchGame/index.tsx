import {
  type KeyboardEvent,
  type ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import SearchIcon from '@mui/icons-material/Search';
import { useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

import { type AllGames } from '../../endpoints/games/getAllGames';
import useClickOutside from '../../hooks/useClickOutside';
import useDebounce from '../../hooks/useDebounce';
import { searchedGames } from '../../utils/games';

export default function SearchGame(): ReactElement {
  const [inputValue, setInputValue] = useState('');
  const [gameFiltered, setGameFiltered] = useState<AllGames[]>([]);
  const clickRef = useRef<HTMLDivElement | null>(null);
  const queryClient = useQueryClient();
  const allGames = queryClient.getQueryData<AllGames[]>(['allGames']);

  useClickOutside(clickRef, () => {
    setInputValue('');
    setGameFiltered([]);
  });

  const handleKeyPress = useCallback(
    (event: KeyboardEvent<HTMLInputElement>): void => {
      if (event.key === 'Escape') {
        setInputValue('');
        setGameFiltered([]);
      }
    },
    []
  );

  const searched = useCallback(
    (query: string) => {
      if (!query) {
        setGameFiltered([]);
        return;
      }
      const result = searchedGames(query, allGames ?? []);
      setGameFiltered(result);
    },
    [allGames]
  );

  const debouncedSearch = useDebounce(searched, 200);

  useEffect(() => {
    debouncedSearch(inputValue);
  }, [inputValue, debouncedSearch]);

  return (
    <>
      {inputValue && (
        <div className='absolute inset-0 z-10 bg-[#161616] bg-opacity-80' />
      )}
      <div className='relative z-50 flex flex-col' ref={clickRef}>
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
          />
        </div>
        {inputValue && (
          <div className='no-scrollbar absolute inset-x-0 top-full z-20 mt-2 max-h-80 overflow-y-scroll rounded-xl bg-[#2E2E2E] shadow-2xl drop-shadow-lg'>
            {gameFiltered?.map((game, index) => (
              <Link to={`/games/${game.appid}`} key={index} tabIndex={0}>
                <div className='hover flex items-center justify-between px-6 py-4 transition-colors duration-200 ease-in-out hover:bg-purple-hover active:bg-purple-active'>
                  <div>{game.name}</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
