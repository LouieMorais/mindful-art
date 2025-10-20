// src/components/common/__tests__/Portal.test.tsx
import { render, screen, cleanup } from '@testing-library/react';
import Portal from '../Portal';

function Child() {
  return <div data-testid="inside-portal">Portalled</div>;
}

describe('Portal', () => {
  afterEach(() => {
    cleanup(); // proper React cleanup
  });

  it('renders children into the document', () => {
    render(
      <Portal>
        <Child />
      </Portal>
    );
    const node = screen.getByTestId('inside-portal');
    expect(node).toBeInTheDocument();
    expect(document.body.contains(node)).toBe(true);
  });
});
