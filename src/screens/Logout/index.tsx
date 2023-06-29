import { redirect } from 'react-router-dom';

import axios from '../../config/axios';

export const action = async (): Promise<Response> => {
  await axios.post('user/logout');
  return redirect('/login');
};
