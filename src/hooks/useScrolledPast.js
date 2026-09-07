import { useEffect, useState } from 'react';

// Floating action buttons (WhatsApp, chat) sit at fixed screen corners, so at page-load
// scroll position they can land directly on top of a section's own full-width button —
// this is what was covering the hero's "Explore Full Cyber Security Curriculum" button on
// phones. Keeping them hidden until the visitor has scrolled a little way down every page
// avoids that overlap everywhere, not just on the homepage hero.
export default function useScrolledPast(fraction = 0.5) {
  const [scrolledPast, setScrolledPast] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolledPast(window.scrollY > window.innerHeight * fraction);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [fraction]);

  return scrolledPast;
}
