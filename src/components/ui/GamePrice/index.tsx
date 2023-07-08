import { type ReactElement } from 'react';

import { type PriceOverview } from '../../../endpoints/games/getAllGames';

interface Props {
  priceOverview?: PriceOverview;
}

export default function GamePrice({ priceOverview }: Props): ReactElement {
  if (!priceOverview) {
    return <div />;
  }
  if (priceOverview.discount_percent === 0) {
    return <div className='font-semibold'>{priceOverview.final_formatted}</div>;
  }
  return (
    <div className='flex items-center'>
      <del className='mr-2 text-gray-500'>
        {priceOverview.initial_formatted}
      </del>
      <div className='font-semibold'>{priceOverview.final_formatted}</div>
    </div>
  );
}
