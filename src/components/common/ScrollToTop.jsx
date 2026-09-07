import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

// React Router keeps the browser's scroll position across route changes. Without this, navigating
// to a shorter page while scrolled down lands you wherever that pixel offset clamps to (often the
// footer). Hash links (in-page anchors) are left alone so LandingPage's own anchor-scroll can run.
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash]);

  return null;
}
