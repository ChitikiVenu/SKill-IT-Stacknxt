import { useEffect } from 'react';

// Shared Escape-to-close + body-scroll-lock behavior for dialog/modal components.
// Mirrors the pattern already used in EnrollmentModal/AuthModal so every
// overlay in the app behaves the same way for keyboard users.
export function useModalDismiss(open, onClose) {
  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => event.key === 'Escape' && onClose();
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);
}
