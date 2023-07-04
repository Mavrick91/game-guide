import axios from '../../config/axios';
import { type CustomQuery } from '../../types/useQuery';

export interface UsersFriends {
  steamid: string;
  communityvisibilitystate: number;
  profilestate: number;
  personaname: string;
  profileurl: string;
  avatar: string;
  avatarmedium: string;
  avatarfull: string;
  avatarhash: string;
  lastlogoff: number;
  personastate: number;
  realname?: string;
  primaryclanid?: string;
  timecreated?: number;
  personastateflags: number;
  loccountrycode?: string;
  gameextrainfo?: string;
  gameid?: string;
  friend_since: number;
}

export default function getUsersFriends(): CustomQuery<UsersFriends[]> {
  return {
    queryKey: ['friends'],
    queryFn: async () => {
      const { data } = await axios.get<UsersFriends[]>('/friends');
      return data;
    },
  };
}
