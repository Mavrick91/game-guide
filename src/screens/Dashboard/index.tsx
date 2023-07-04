import { type ReactElement } from 'react';

import { type QueryClient } from '@tanstack/react-query';
import { useLoaderData } from 'react-router-dom';

import FriendsList from '../../components/FriendsList';
import GameLibrary from '../../components/GameLibrary';
import SearchGame from '../../components/SearchGame';
import getUsersFriends from '../../endpoints/friends/getUsersFriends';
import getGamesUserInfo from '../../endpoints/games/getGamesUserInfo';

export function loader(queryClient: QueryClient) {
  return async () => {
    const gamesPromise = queryClient.ensureQueryData(getGamesUserInfo());
    const friendsPromise = queryClient.ensureQueryData(getUsersFriends());

    const [games, friends] = await Promise.all([gamesPromise, friendsPromise]);

    return {
      games,
      friends,
    };
  };
}

export default function Dashboard(): ReactElement {
  const data = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loader>>
  >;

  return (
    <div className='flex h-full gap-10 text-white'>
      <div className='flex grow flex-col gap-5'>
        <SearchGame />
        <GameLibrary
          ownedGames={data.games.ownedGames}
          recentGames={data.games.playedRecently}
        />
      </div>
      <div>
        <FriendsList friends={data.friends} />
      </div>
    </div>
  );
}
