import {
  createContext,
  type ReactElement,
  type ReactNode,
  useContext
} from 'react'
import useGetUser from '../endpoints/user/useGetUser'
import { type UserResponse } from '../types/user'
import { RingLoader } from 'react-spinners'

type UserContextType = UserResponse | null | undefined

const UserContext = createContext<UserContextType>(null)

interface Props {
  children: ReactNode
}
export default function UserProvider ({ children }: Props): ReactElement {
  const { data: user, isLoading } = useGetUser()

  if (isLoading) { return <div className="flex items-center justify-center h-full"><RingLoader color="#7865AE" size={200}/></div> }

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

export const useUser = (): UserContextType => useContext(UserContext)
