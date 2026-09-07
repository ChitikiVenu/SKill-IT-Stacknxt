import { createContext, lazy, Suspense, useContext, useMemo, useRef, useState } from 'react';

const BrochureGateContext = createContext(null);
const LEAD_CAPTURED_KEY = 'isLeadCaptured';

const BrochureLeadModal = lazy(() => import('../components/course/BrochureLeadModal'));

export function BrochureGateProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [courseInterest, setCourseInterest] = useState('');
  const pendingDownloadRef = useRef(null);

  const value = useMemo(() => ({
    requestDownload: (downloadFn, interest = '') => {
      if (sessionStorage.getItem(LEAD_CAPTURED_KEY) === 'true') {
        downloadFn();
        return;
      }
      pendingDownloadRef.current = downloadFn;
      setCourseInterest(interest);
      setOpen(true);
    },
  }), []);

  const handleCaptured = () => {
    sessionStorage.setItem(LEAD_CAPTURED_KEY, 'true');
    setOpen(false);
    pendingDownloadRef.current?.();
    pendingDownloadRef.current = null;
  };

  return (
    <BrochureGateContext.Provider value={value}>
      {children}
      <Suspense fallback={null}>
        {open && <BrochureLeadModal open={open} courseInterest={courseInterest} onClose={() => setOpen(false)} onCaptured={handleCaptured} />}
      </Suspense>
    </BrochureGateContext.Provider>
  );
}

export function useBrochureGate() {
  const context = useContext(BrochureGateContext);
  if (!context) throw new Error('useBrochureGate must be used within a BrochureGateProvider.');
  return context;
}
