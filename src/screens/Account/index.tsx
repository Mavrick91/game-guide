import { type ReactElement } from 'react';

import Divider from '../../components/Divider';

export default function Account(): ReactElement {
  return (
    <div className='flex'>
      <h1 className='text-xl font-bold text-white'>Information Account</h1>
      <Divider />
    </div>
  );
}
