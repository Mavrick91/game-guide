import { type ReactElement } from 'react';

import { type QueryClient } from '@tanstack/react-query';
import { useLoaderData } from 'react-router-dom';

import FriendsList from '../../components/FriendsList';
import GameLibrary from '../../components/GameLibrary';
import getGamesUserInfo from '../../endpoints/user/getGamesUserInfo';
import getUsersFriends from '../../endpoints/user/getUsersFriends';

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
    <div className='flex flex-col gap-5 text-white'>
      <div className='flex gap-10'>
        <GameLibrary
          ownedGames={data.games.ownedGames}
          recentGames={data.games.playedRecently}
        />
        <FriendsList friends={data.friends} />
      </div>
    </div>
  );
}
