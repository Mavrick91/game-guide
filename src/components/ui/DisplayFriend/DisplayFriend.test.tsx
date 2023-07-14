import moment from 'moment/moment';

import DisplayFriend from './';
import { type UsersFriends } from '../../../endpoints/friends/getUsersFriends'; // Update this with the correct import path
import { screen, render } from '../../../test-utils';

const mockFriend: UsersFriends = {
  steamid: '1',
  communityvisibilitystate: 1,
  profilestate: 1,
  personaname: 'John Doe',
  profileurl: 'https://example.com/profile',
  avatar: 'https://example.com/avatar.png',
  avatarmedium: 'https://example.com/avatarmedium.png',
  avatarfull: 'https://example.com/avatarfull.png',
  avatarhash: 'hash',
  lastlogoff: Math.floor(Date.now() / 1000),
  personastate: 1,
  personastateflags: 1,
  friend_since: 1622489251,
};

describe('DisplayFriend', () => {
  test('renders user information correctly', () => {
    render(<DisplayFriend friend={mockFriend} status='Online' />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Online')).toBeInTheDocument();
  });

  test('renders the user avatar correctly', () => {
    render(<DisplayFriend friend={mockFriend} status='Online' />);

    expect(screen.getByRole('img', { name: /Avatar/i })).toHaveAttribute(
      'src',
      'https://example.com/avatar.png'
    );
  });

  test('renders correct personastate string', () => {
    mockFriend.personastate = 0;
    render(<DisplayFriend friend={mockFriend} status='Offline' />);
    expect(
      screen.getByText(moment(mockFriend.lastlogoff * 1000).fromNow())
    ).toBeInTheDocument();

    mockFriend.personastate = 1;
    render(<DisplayFriend friend={mockFriend} status='Online' />);
    expect(screen.getByText('Online')).toBeInTheDocument();

    mockFriend.personastate = 2;
    render(<DisplayFriend friend={mockFriend} status='Busy' />);
    expect(screen.getByText('Busy')).toBeInTheDocument();

    mockFriend.personastate = 3;
    render(<DisplayFriend friend={mockFriend} status='Away' />);
    expect(screen.getByText('Away')).toBeInTheDocument();

    mockFriend.personastate = 4;
    render(<DisplayFriend friend={mockFriend} status='Snooze' />);
    expect(screen.getByText('Snooze')).toBeInTheDocument();

    mockFriend.personastate = 5;
    render(<DisplayFriend friend={mockFriend} status='Looking to Trade' />);
    expect(screen.getByText('Looking to Trade')).toBeInTheDocument();

    mockFriend.personastate = 6;
    render(<DisplayFriend friend={mockFriend} status='Looking to Play' />);
    expect(screen.getByText('Looking to Play')).toBeInTheDocument();

    mockFriend.personastate = 7;
    render(<DisplayFriend friend={mockFriend} status='Unknown State' />);
    expect(screen.getByText('Unknown State')).toBeInTheDocument();
  });
});
