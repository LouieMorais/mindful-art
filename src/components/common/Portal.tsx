// src/components/common/Portal.tsx
import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';

export default function Portal({ children }: { children: ReactNode }) {
  return createPortal(children, document.body);
}
