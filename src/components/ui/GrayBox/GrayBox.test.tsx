import '@testing-library/jest-dom/extend-expect';
import GrayBox from './';
import { screen, render } from '../../../test-utils'; // adjust the import path if needed

describe('GrayBox component', () => {
  it('renders children and default className', () => {
    render(<GrayBox>Test Content</GrayBox>);
    const grayBoxElement = screen.getByText('Test Content');
    expect(grayBoxElement).toBeInTheDocument();
    expect(grayBoxElement).toHaveClass('rounded-xl');
    expect(grayBoxElement).toHaveClass('bg-[#2E2E2E]');
    expect(grayBoxElement).toHaveClass('p-6');
    expect(grayBoxElement).toHaveClass('transition-colors');
    expect(grayBoxElement).toHaveClass('duration-300');
  });

  it('renders children and custom className', () => {
    render(<GrayBox className='custom-class'>Test Content</GrayBox>);
    const grayBoxElement = screen.getByText('Test Content');
    expect(grayBoxElement).toBeInTheDocument();
    expect(grayBoxElement).toHaveClass('custom-class');
  });
});
