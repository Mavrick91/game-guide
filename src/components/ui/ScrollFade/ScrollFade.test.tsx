import ScrollFade from './';
import { act, render } from '../../../test-utils';

describe('ScrollFade', () => {
  it('renders without crashing', () => {
    render(<ScrollFade active={true} />);
  });

  it('adds the mask style when the parent is scrolled', () => {
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      configurable: true,
      value: 400,
    });
    Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
      configurable: true,
      value: 600,
    });

    const scrollEvent = new Event('scroll');
    const { container } = render(
      <div style={{ height: '200px', overflow: 'auto' }}>
        <div style={{ height: '400px' }}>
          <ScrollFade active={true} />
          <div>test</div>
        </div>
      </div>
    );

    act(() => {
      (container.firstChild?.firstChild as HTMLElement).dispatchEvent(
        scrollEvent
      );
    });

    expect(
      (container.firstChild?.firstChild as HTMLElement).style.mask
    ).not.toBe('');
  });

  it('does not add the mask style when not active', () => {
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      configurable: true,
      value: 400,
    });
    Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
      configurable: true,
      value: 400,
    });

    const { container } = render(
      <div style={{ height: '200px', overflow: 'auto' }}>
        <div style={{ height: '400px' }}>
          <ScrollFade active={false} />
        </div>
      </div>
    );

    expect((container.firstChild?.firstChild as HTMLElement).style.mask).toBe(
      ''
    );
  });
});
