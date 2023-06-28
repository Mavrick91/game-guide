export const getProfileVisibility = (
  communityvisibilitystate: number
): string => {
  if (communityvisibilitystate === 1) return 'Private';
  if (communityvisibilitystate === 3) return 'Public';

  throw new Error('Invalid communityvisibilitystate');
};
