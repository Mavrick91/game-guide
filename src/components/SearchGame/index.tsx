import {
  type KeyboardEvent,
  type ReactElement,
  useCallback,
  useState,
} from 'react';

import SearchIcon from '@mui/icons-material/Search';

import PopupAllGames from '../ui/PopupAllGames';

export default function SearchGame(): ReactElement {
  const [inputValue, setInputValue] = useState('');

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
      {inputValue && (
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
        <PopupAllGames input={inputValue} />
      </div>
    </>
  );
}
