import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import LoadingSpinner from '../LoadingSpinner';

it('LoadingSpinner has no detectable a11y violations', async () => {
  const { container } = render(<LoadingSpinner />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
