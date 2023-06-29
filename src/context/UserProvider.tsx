import {
  createContext,
  type ReactElement,
  type ReactNode,
  useContext,
} from 'react';

import useGetUser from '../endpoints/user/useGetUser';
import { type UserResponse } from '../types/user';

type UserContextType = UserResponse | null | undefined;

const UserContext = createContext<UserContextType>(null);

interface Props {
  children: ReactNode;
}
export default function UserProvider({ children }: Props): ReactElement {
  const { data: user, isLoading, isError } = useGetUser();

  if (isLoading) {
    return <div />;
  }

  return (
    <UserContext.Provider value={isError ? null : user}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = (): UserResponse => {
  const context = useContext(UserContext);

  if (context == null) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
};
