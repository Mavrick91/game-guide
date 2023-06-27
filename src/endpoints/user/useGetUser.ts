import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { useApi } from '../../context/ApiProvider'
import { type UserError, type UserResponse } from '../../types/user'

export default function useGetUser(): UseQueryResult<UserResponse | null, UserError> {
  const axios = useApi()

  return useQuery<UserResponse | null, UserError>({
    queryKey: ['user', 'me'],
    queryFn: async() => {
      const res = await axios.get('/user/me')

      return res.data
    }
  })
}
