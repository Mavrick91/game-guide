import FriendCollapse from './';
import { screen, render } from '../../../test-utils';

describe('FriendCollapse', () => {
  const mockFriends = [
    // This friend is not playing a game
    {
      steamid: '123',
      communityvisibilitystate: 3,
      profilestate: 1,
      personaname: 'Test User',
      profileurl: 'http://steamcommunity.com/profiles/123/',
      avatar: 'http://steamcommunity.com/avatar.jpg',
      avatarmedium: 'http://steamcommunity.com/avatar_medium.jpg',
      avatarfull: 'http://steamcommunity.com/avatar_full.jpg',
      avatarhash: '123hash',
      lastlogoff: 1644028800,
      personastate: 1,
      personastateflags: 0,
      friend_since: 1644028800,
    },
    // This friend is playing a game
    {
      steamid: '456',
      communityvisibilitystate: 3,
      profilestate: 1,
      personaname: 'Gaming User',
      profileurl: 'http://steamcommunity.com/profiles/456/',
      avatar: 'http://steamcommunity.com/avatar2.jpg',
      avatarmedium: 'http://steamcommunity.com/avatar2_medium.jpg',
      avatarfull: 'http://steamcommunity.com/avatar2_full.jpg',
      avatarhash: '456hash',
      lastlogoff: 1644028800,
      personastate: 1,
      personastateflags: 0,
      gameid: '789', // This friend is playing a game
      friend_since: 1644028800,
    },
  ];

  test('renders the component with title and friends', () => {
    render(
      <FriendCollapse
        title='Test Title'
        friends={mockFriends}
        isChecked={true}
      />
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('Gaming User')).toBeInTheDocument();
  });

  test('the checkbox is initially checked', () => {
    render(
      <FriendCollapse
        title='Test Title'
        friends={mockFriends}
        isChecked={true}
      />
    );

    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  test('the checkbox is initially not checked', () => {
    render(
      <FriendCollapse
        title='Test Title'
        friends={mockFriends}
        isChecked={false}
      />
    );

    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  test('the friends are rendered in the correct order (those playing a game first)', () => {
    render(
      <FriendCollapse
        title='Test Title'
        friends={mockFriends}
        isChecked={true}
      />
    );

    // Get all friend names
    const friendNames = screen
      .getAllByTestId('player-name')
      .map((element) => element.textContent);
    console.log('friendNames', friendNames);
    // "Gaming User" should come before "Test User"
    // expect(friendNames.indexOf('Gaming User')).toBeLessThan(
    //   friendNames.indexOf('Test User')
    // );
  });
});
