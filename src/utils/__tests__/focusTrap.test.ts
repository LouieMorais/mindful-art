// src/utils/__tests__/focusTrap.test.ts
import { trapFocus, cleanupTrap, restoreFocus } from '../focusTrap';

function createFixture() {
  const container = document.createElement('div');
  container.innerHTML = `
    <button id="a">A</button>
    <button id="b">B</button>
    <button id="c" disabled>C</button>
    <a id="d" href="#">D</a>
  `;
  document.body.appendChild(container);
  const a = container.querySelector<HTMLButtonElement>('#a')!;
  const b = container.querySelector<HTMLButtonElement>('#b')!;
  const d = container.querySelector<HTMLAnchorElement>('#d')!;
  return { container, a, b, d };
}

describe('focusTrap', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('moves initial focus to the first focusable within the container', () => {
    const { container, a } = createFixture();
    trapFocus(container);
    expect(document.activeElement).toBe(a);
    cleanupTrap(container);
  });

  it('keeps focus inside container when we manually move it forward', () => {
    const { container, a, b, d } = createFixture();
    trapFocus(container);
    expect(document.activeElement).toBe(a);

    // simulate user moving focus forward manually
    b.focus();
    expect(document.activeElement).toBe(b);

    d.focus();
    expect(document.activeElement).toBe(d);

    // wrap back to first
    a.focus();
    expect(document.activeElement).toBe(a);

    cleanupTrap(container);
  });

  it('keeps focus inside container when moving backward manually', () => {
    const { container, a, b, d } = createFixture();
    trapFocus(container);
    expect(document.activeElement).toBe(a);

    // simulate reverse order
    d.focus();
    expect(document.activeElement).toBe(d);

    b.focus();
    expect(document.activeElement).toBe(b);

    cleanupTrap(container);
  });

  it('cleanup removes listeners and restoreFocus returns focus to opener when provided', () => {
    const opener = document.createElement('button');
    document.body.appendChild(opener);
    opener.focus();
    expect(document.activeElement).toBe(opener);

    const { container, a } = createFixture();
    trapFocus(container);
    expect(document.activeElement).toBe(a);

    cleanupTrap(container);
    restoreFocus(opener);
    expect(document.activeElement).toBe(opener);
  });
});
