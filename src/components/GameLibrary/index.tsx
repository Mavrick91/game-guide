import React, {
  useCallback,
  useMemo,
  useState,
  type ReactElement,
} from 'react';

import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import StoreIcon from '@mui/icons-material/Store';
import { Link } from 'react-router-dom';

import { type GamesLight } from '../../endpoints/games/getGamesUserInfo';
import Button from '../ui/Button';
import GrayBox from '../ui/GrayBox';
import ScrollFade from '../ui/ScrollFade';

enum Tabs {
  OWNED_GAMES = 1,
  RECENTLY_PLAYED,
}

interface GameLibraryProps {
  ownedGames: GamesLight[];
  recentGames: GamesLight[];
}

interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  icon: ReactElement;
  label: string;
}

function TabButton({
  isActive,
  onClick,
  icon,
  label,
}: TabButtonProps): ReactElement {
  return (
    <Button
      onClick={onClick}
      className='flex flex-nowrap items-center text-xl font-bold'
      active={isActive}
    >
      {icon}
      <span>{label}</span>
    </Button>
  );
}

export default function GameLibrary({
  ownedGames,
  recentGames,
}: GameLibraryProps): ReactElement {
  const [activeTabIndex, setActiveTabIndex] = useState(Tabs.OWNED_GAMES);

  const handleClickTab = useCallback((tab: Tabs) => {
    setActiveTabIndex(tab);
  }, []);

  const games = useMemo(() => {
    return activeTabIndex === Tabs.OWNED_GAMES ? ownedGames : recentGames;
  }, [activeTabIndex, ownedGames, recentGames]);

  return (
    <div className='flex grow flex-col gap-3'>
      <div className='flex items-center justify-start gap-6'>
        <div className='flex items-center gap-6'>
          <TabButton
            isActive={activeTabIndex === Tabs.OWNED_GAMES}
            onClick={() => {
              handleClickTab(Tabs.OWNED_GAMES);
            }}
            icon={<StoreIcon />}
            label='Games owned'
          />
          <TabButton
            isActive={activeTabIndex === Tabs.RECENTLY_PLAYED}
            onClick={() => {
              handleClickTab(Tabs.RECENTLY_PLAYED);
            }}
            icon={<SportsEsportsIcon />}
            label='Recently played'
          />
        </div>
      </div>
      <div className='no-scrollbar flex h-80 flex-col space-y-3 overflow-y-scroll'>
        <ScrollFade active={activeTabIndex === Tabs.OWNED_GAMES} />

        {games.map((game) => (
          <Link key={game.appid} to={'/'}>
            <GrayBox className='hover:bg-purple-hover active:bg-purple-active'>
              <div className='flex items-center gap-5 text-base font-medium text-white'>
                <img src={game.logoUrl} alt={game.name} width={32} />
                <div>
                  <h1>{game.name}</h1>
                </div>
              </div>
            </GrayBox>
          </Link>
        ))}
        {games.length === 0 && (
          <GrayBox className='flex h-80 items-center justify-center'>
            <span>You have not played any games during the last 2 weeks</span>
          </GrayBox>
        )}
      </div>
    </div>
  );
}
