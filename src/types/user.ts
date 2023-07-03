export interface UserResponse {
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
  primaryclanid: string;
  timecreated: number;
  personastateflags: number;
  loccountrycode: string;
  locstatecode: string;
  loccityid: number;
  iat: number;
  exp: number;
}

export enum SESSION_STATUS {
  OFFLINE,
  ONLINE,
  BUSY,
  AWAY,
  SNOOZE,
  LOOKING_TO_TRADE,
}
