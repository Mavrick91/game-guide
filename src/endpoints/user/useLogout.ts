import { useMutation, type UseMutationResult } from '@tanstack/react-query';

import axios from '../../config/axios';

export default function useLogout(): UseMutationResult {
  return useMutation({
    mutationFn: async () => {
      await axios.post('/user/logout');
    },
    onSettled: () => {
      window.location.reload();
    },
  });
}
