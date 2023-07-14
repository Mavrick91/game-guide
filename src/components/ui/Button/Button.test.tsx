import Button from '.';
import { render } from '../../../test-utils';

describe('Button', () => {
  it('should render the button', () => {
    const { container } = render(<Button />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders with default props', () => {
    const { getByRole } = render(<Button />);
    const button = getByRole('button');

    expect(button).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const handleClick = jest.fn();
    const { getByRole, user } = render(<Button onClick={handleClick} />);
    const button = getByRole('button');

    await user.click(button);

    expect(handleClick).toHaveBeenCalled();
  });

  it('applies custom classes', () => {
    const { getByRole } = render(<Button className='custom-class' />);
    const button = getByRole('button');

    expect(button).toHaveClass('custom-class');
  });

  it('applies the "ghost" variant classes', () => {
    const { getByRole } = render(<Button variant='ghost' />);
    const button = getByRole('button');

    expect(button).toHaveClass('bg-transparent');
    expect(button).toHaveClass('w-full');
    expect(button).toHaveClass('justify-start');
  });

  it('applies the "black" variant classes', () => {
    const { getByRole } = render(<Button variant='black' />);
    const button = getByRole('button');

    expect(button).toHaveClass('text-white');
    expect(button).toHaveClass('rounded-xl');
    expect(button).toHaveClass('bg-black');
    expect(button).toHaveClass('active:bg-[#0A0A0A]');
    expect(button).toHaveClass('hover:bg-[#141414]');
  });

  it('applies the "small" size classes', () => {
    const { getByRole } = render(<Button size='small' />);
    const button = getByRole('button');

    expect(button).toHaveClass('text-sm');
    expect(button).toHaveClass('py-1');
    expect(button).toHaveClass('px-2');
  });

  it('applies the "medium" size classes', () => {
    const { getByRole } = render(<Button size='medium' />);
    const button = getByRole('button');

    expect(button).toHaveClass('text-base');
    expect(button).toHaveClass('py-2');
    expect(button).toHaveClass('px-7');
    expect(button).toHaveClass('font-semibold');
  });

  it('applies the "active" classes', () => {
    const { getByRole } = render(<Button active />);
    const button = getByRole('button');

    expect(button).toHaveClass('text-purple-pop');
  });

  it('applies the "inactive" classes', () => {
    const { getByRole } = render(<Button active={false} />);
    const button = getByRole('button');

    expect(button).toHaveClass('opacity-50');
  });
});
