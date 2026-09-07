import { LogOut, TriangleAlert } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function LogoutConfirmModal({ open, onConfirm, onCancel }) {
  const cancelRef = useRef(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    cancelRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onCancel();
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = dialogRef.current?.querySelectorAll('button');
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onCancel]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onMouseDown={(event) => event.target === event.currentTarget && onCancel()}
    >
      <section
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="logout-confirm-title"
        aria-describedby="logout-confirm-message"
        className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-6 text-white shadow-2xl"
      >
        <div className="flex items-start gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-red-500/15 text-red-400">
            <TriangleAlert size={20} />
          </span>
          <div>
            <h2 id="logout-confirm-title" className="font-display text-lg font-extrabold">Confirm Logout</h2>
            <p id="logout-confirm-message" className="mt-1.5 text-sm leading-6 text-slate-300">Are you sure you want to log out of your account?</p>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            ref={cancelRef}
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-slate-600 px-4 py-2.5 text-sm font-bold text-slate-100 transition hover:bg-slate-800"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-red-500"
          >
            <LogOut size={16} /> Yes, Logout
          </button>
        </div>
      </section>
    </div>,
    document.body,
  );
}
