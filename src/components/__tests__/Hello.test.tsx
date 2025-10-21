// src/components/__tests__/Hello.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Hello } from '../Hello';

describe('Hello', () => {
  it('renders greeting', () => {
    render(<Hello name="Louie" />);
    expect(screen.getByText('Hello, Louie')).toBeInTheDocument();
  });
});
