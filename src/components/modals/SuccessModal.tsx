// src/components/modals/SuccessModal.tsx
import { useEffect, useRef } from 'react';
import { trapFocus, restoreFocus } from '../../utils/focusTrap';

interface Props {
  title: string;
  message: string;
  onClose: () => void;
}

export default function SuccessModal({ title, message, onClose }: Props) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const openerRef = useRef<HTMLElement | null>(document.activeElement as HTMLElement);

  useEffect(() => {
    const node = dialogRef.current;
    const opener = openerRef.current; // capture at mount time
    if (node) trapFocus(node);
    return () => {
      if (node) restoreFocus(opener);
    };
  }, []);

  return (
    <div ref={dialogRef} role="dialog" aria-labelledby="success-title" aria-modal="true">
      <h2 id="success-title">{title}</h2>
      <p aria-live="polite">{message}</p>
      <button type="button" onClick={onClose}>
        Close
      </button>
    </div>
  );
}
