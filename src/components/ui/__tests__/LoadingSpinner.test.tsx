// src/components/ui/__tests__/LoadingSpinner.test.tsx
import { render, screen } from '@testing-library/react';
import LoadingSpinner from '../LoadingSpinner';

describe('LoadingSpinner', () => {
  it('exposes a polite status for assistive tech', () => {
    render(<LoadingSpinner />);
    const status = screen.getByRole('status');
    expect(status).toBeInTheDocument();

    // Accept either visible text or an accessible name
    const accName = status.getAttribute('aria-label') || status.textContent || '';
    expect(accName.toLowerCase()).toContain('load');
    expect(status.getAttribute('aria-live') ?? 'polite').toBe('polite');
  });
});
