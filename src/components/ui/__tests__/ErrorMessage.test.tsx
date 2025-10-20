// src/components/ui/__tests__/ErrorMessage.test.tsx
import { render, screen } from '@testing-library/react';
import ErrorMessage from '../ErrorMessage';

describe('ErrorMessage', () => {
  it('renders the message inside an ARIA alert', () => {
    render(<ErrorMessage message="Something went wrong" />);
    const alert = screen.getByRole('alert');
    expect(alert).toHaveTextContent('Something went wrong');
  });
});
