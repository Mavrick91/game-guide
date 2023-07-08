import { useQuery } from '@tanstack/react-query';

import axios from '../../config/axios';

export default function useLogout(): () => void {
  const { refetch } = useQuery({
    queryKey: ['logout'],
    queryFn: async () => {
      try {
        await axios.get('/user/logout');
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    },
    enabled: false,
  });

  function handleLogout(): void {
    refetch()
      .then(() => null)
      .catch((error) => {
        console.log(error);
      });
  }

  return handleLogout;
}
