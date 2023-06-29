import { type ReactElement } from 'react';

import { type QueryClient } from '@tanstack/react-query';
import { useLoaderData } from 'react-router-dom';

import GameLibrary from '../../components/GameLibrary';
import getGamesUserInfo from '../../endpoints/user/getGamesUserInfo';

export function loader(queryClient: QueryClient) {
  return async () => {
    return await queryClient.ensureQueryData(getGamesUserInfo());
  };
}

export default function Dashboard(): ReactElement {
  const data = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loader>>
  >;

  return (
    <div className='flex flex-col gap-5 text-white'>
      <GameLibrary
        ownedGames={data.ownedGames}
        recentGames={data.playedRecently}
      />
    </div>
  );
}
