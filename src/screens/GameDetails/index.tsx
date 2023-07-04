import { type ReactElement } from 'react';

import { type LoaderFunctionArgs } from '@remix-run/router/utils';
import { type QueryClient } from '@tanstack/react-query';
import { redirect, useLoaderData } from 'react-router-dom';

import getGameDatails, {
  type GamesDetails,
} from '../../endpoints/games/getGameDatails';

export function loader(queryClient: QueryClient) {
  return async ({ params }: LoaderFunctionArgs) => {
    try {
      if (params.gameId)
        return await queryClient.ensureQueryData(getGameDatails(params.gameId));
    } catch {
      return redirect('/');
    }
  };
}

export default function GameDetails(): ReactElement {
  const data = useLoaderData() as GamesDetails;
  console.log('🚀 ~ data', data.appnews.count);

  return <div>GameDetails</div>;
}
