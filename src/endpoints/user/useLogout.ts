import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import { useApi } from '../../context/ApiProvider'

export default function useLogout(): UseMutationResult {
  const axios = useApi()

  return useMutation({
    mutationFn: async() => {
      await axios.get('/user/logout')
    },
    onSettled: () => {
      window.location.reload()
    }
  })
}
