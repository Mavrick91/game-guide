import { type ReactElement, useCallback, useMemo, useState } from 'react';

import { Collapse } from 'react-collapse';

import { type UsersFriends } from '../../../endpoints/user/getUsersFriends';
import { getPersonastateString } from '../../../utils/user';
import Button from '../Button';
import DisplayFriend from '../DisplayFriend';
import PlusLess from '../PlusLess';

interface Props {
  title: string | ReactElement;
  friends: UsersFriends[];
  defaultOpen?: boolean;
}
export default function FriendCollapse({
  title,
  friends,
  defaultOpen = false,
}: Props): ReactElement {
  const [isOpened, setIsOpened] = useState(defaultOpen);

  const toggleCollapse = useCallback(() => {
    setIsOpened(!isOpened);
  }, [isOpened]);

  const friendsSortedByStatus = useMemo(() => {
    return friends.sort((a, b) => {
      if (a.gameid && !b.gameid) return -1;

      return a.personastate - b.personastate;
    });
  }, [friends]);

  return (
    <div>
      <Button variant='collapse' onClick={toggleCollapse}>
        <PlusLess isActive={isOpened} />
        {title}
      </Button>
      <Collapse isOpened={isOpened}>
        <div className='no-scrollbar mt-3 flex max-h-52 flex-col gap-3 overflow-y-scroll'>
          {friendsSortedByStatus.map((friend) => (
            <DisplayFriend
              key={friend.steamid}
              status={getPersonastateString(friend.personastate)}
              friend={friend}
            />
          ))}
        </div>
      </Collapse>
    </div>
  );
}
