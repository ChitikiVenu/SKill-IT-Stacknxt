import { useEffect, useRef } from 'react';

// Guards against "setState after unmount" when an async submit (enroll/lead
// capture/etc.) resolves after the user has already closed the modal that
// triggered it.
//
// The effect re-arms `current = true` on every mount (not just the initial
// ref value) because React StrictMode's dev-only mount→cleanup→remount cycle
// would otherwise run this effect's cleanup once immediately, permanently
// stranding the ref at `false` before the component ever really unmounts.
export function useMountedRef() {
  const mountedRef = useRef(true);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);
  return mountedRef;
}
