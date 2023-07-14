import { act, type RenderResult } from '@testing-library/react';
import type userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

import CustomNavLink from './';
import { render, screen } from '../../../test-utils';

function renderNavLink(
  props = {}
): RenderResult & { user: ReturnType<typeof userEvent.setup> } {
  const routes = [
    {
      path: '/',
      element: (
        <CustomNavLink to='/test' {...props}>
          Test Link
        </CustomNavLink>
      ),
    },
    {
      path: '/test',
      element: <div>Test page</div>,
    },
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: ['/', '/test'],
    initialIndex: 0,
  });

  return render(<RouterProvider router={router} />);
}

describe('CustomNavLink', () => {
  it('renders the link with the correct text', () => {
    renderNavLink();

    expect(screen.getByText('Test Link')).toBeInTheDocument();
  });

  it('navigates to the correct path when clicked', async () => {
    const { user } = renderNavLink();

    await act(async () => {
      await user.click(screen.getByText('Test Link'));
    });

    expect(screen.getByText('Test page')).toBeInTheDocument();
  });
});
