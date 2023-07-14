import FlagDisplay from './';
import { screen, render } from '../../../test-utils';

describe('FlagDisplay', () => {
  test('renders correct flag', () => {
    const { container } = render(<FlagDisplay countryCode='US' />);
    expect(container.innerHTML).toContain('<g fill="none">');
  });

  test('renders "Flag not found" when flag does not exist', () => {
    render(<FlagDisplay countryCode='XYZ' />);
    const messageElement = screen.getByText('Flag not found');
    expect(messageElement).toBeInTheDocument();
  });
});
