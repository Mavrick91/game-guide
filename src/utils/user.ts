export const getProfileVisibility = (
  communityvisibilitystate: number
): string => {
  if (communityvisibilitystate === 1) return 'Private';
  if (communityvisibilitystate === 3) return 'Public';

  throw new Error('Invalid communityvisibilitystate');
};

export type PersonaState =
  | 'Offline'
  | 'Online'
  | 'Busy'
  | 'Away'
  | 'Snooze'
  | 'Looking to Trade'
  | 'Looking to Play'
  | 'Unknown State';

export function getPersonastateString(personastate: number): PersonaState {
  if (personastate === 0) {
    return 'Offline';
  } else if (personastate === 1) {
    return 'Online';
  } else if (personastate === 2) {
    return 'Busy';
  } else if (personastate === 3) {
    return 'Away';
  } else if (personastate === 4) {
    return 'Snooze';
  } else if (personastate === 5) {
    return 'Looking to Trade';
  } else if (personastate === 6) {
    return 'Looking to Play';
  } else return 'Unknown State';
}
