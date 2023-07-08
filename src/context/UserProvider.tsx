import {
  createContext,
  type ReactElement,
  type ReactNode,
  useContext,
} from 'react';

import useGetUser from '../endpoints/user/useGetUser';
import useLogout from '../endpoints/user/useLogout';
import { type UserResponse } from '../types/user';

type UserContextType = UserResponse | null | undefined;

const UserContext = createContext<UserContextType>(null);

interface Props {
  children: ReactNode;
}
export default function UserProvider({ children }: Props): ReactElement | null {
  const { data: user, isLoading, isError } = useGetUser();
  const logout = useLogout();

  if (isLoading) {
    return <div />;
  }
  if (isError) {
    logout();
    return null;
  }

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export const useUser = (): UserResponse => {
  const context = useContext(UserContext);

  if (context == null) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
};
