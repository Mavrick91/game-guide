import { type QueryClient } from '@tanstack/react-query';
import { redirect } from 'react-router-dom';

import axios from '../../config/axios';

export const action = (queryClient: QueryClient) => {
  return async (): Promise<Response> => {
    await axios.post('/user/logout');

    await queryClient.invalidateQueries(['isAuthenticate']);

    return redirect('/');
  };
};
