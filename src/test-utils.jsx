import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const AllTheProviders = ({ children }) => {
  return children;
};

const customRender = (ui, options) => {
  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: AllTheProviders, ...options }),
  };
};

export * from '@testing-library/react';

export { customRender as render };
