// src/utils/focusTrap.ts
const cleanupMap = new WeakMap<HTMLElement, () => void>();

export function trapFocus(container: HTMLElement): void {
  const focusable = getFocusable(container);
  const first = focusable[0] ?? container;
  const last = focusable[focusable.length - 1] ?? container;

  const onKeydown = (e: KeyboardEvent): void => {
    if (e.key !== 'Tab') return;
    if (document.activeElement === null) return;

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  container.addEventListener('keydown', onKeydown);
  cleanupMap.set(container, () => container.removeEventListener('keydown', onKeydown));

  first.focus();
}

export function cleanupTrap(container: HTMLElement): void {
  const c = cleanupMap.get(container);
  if (c) c();
}

export function restoreFocus(el: HTMLElement | null): void {
  if (el) el.focus();
}

function getFocusable(root: HTMLElement): HTMLElement[] {
  const selectors = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'textarea:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ];
  return Array.from(root.querySelectorAll<HTMLElement>(selectors.join(','))).filter(
    (n) => !n.hasAttribute('disabled') && n.getAttribute('aria-hidden') !== 'true'
  );
}
