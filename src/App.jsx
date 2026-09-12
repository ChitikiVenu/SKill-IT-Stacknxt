import { lazy, Suspense, useState } from 'react';
import { LoaderCircle } from 'lucide-react';
import { Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/common/ErrorBoundary';
import Footer from './components/layout/Footer';
import FloatingChatbot from './components/common/FloatingChatbot';
import FloatingWhatsAppButton from './components/common/FloatingWhatsAppButton';
import Navbar from './components/layout/Navbar';
import ScrollToTop from './components/common/ScrollToTop';
import LandingPage from './pages/LandingPage';

const AboutPage = lazy(() => import('./pages/AboutPage'));
const AuthModal = lazy(() => import('./components/auth/AuthModal'));
const BrochureCenterPage = lazy(() => import('./pages/BrochureCenterPage'));
const CertificationsPage = lazy(() => import('./pages/CertificationsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const CourseCatalogPage = lazy(() => import('./pages/CourseCatalogPage'));
const CourseDetailPage = lazy(() => import('./pages/CourseDetailPage'));
const CyberSecuritySubCoursePage = lazy(() => import('./pages/CyberSecuritySubCoursePage'));
const InsightsPage = lazy(() => import('./pages/InsightsPage'));
const InsightPostPage = lazy(() => import('./pages/InsightPostPage'));
const MockInterviewsPage = lazy(() => import('./pages/MockInterviewsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const ReferEarnPage = lazy(() => import('./pages/ReferEarnPage'));

const PageFallback = () => <div className="page-shell grid min-h-[50vh] place-items-center"><LoaderCircle size={28} className="animate-spin text-royal" /></div>;

export default function App() {
  const [authOpen, setAuthOpen] = useState(false);

  const openAuth = () => setAuthOpen(true);

  return (
    <div className="min-h-screen overflow-x-clip bg-white">
      <ScrollToTop />
      <Navbar onLogin={openAuth} />
      <ErrorBoundary>
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/courses" element={<CourseCatalogPage />} />
            <Route path="/courses/cyber-security/:subSlug" element={<CyberSecuritySubCoursePage />} />
            <Route path="/courses/:slug" element={<CourseDetailPage />} />
            <Route path="/brochures" element={<BrochureCenterPage />} />
            <Route path="/mock-interviews" element={<MockInterviewsPage />} />
            <Route path="/certifications" element={<CertificationsPage />} />
            <Route path="/insights" element={<InsightsPage />} />
            <Route path="/insights/:slug" element={<InsightPostPage />} />
            <Route path="/refer-and-earn" element={<ReferEarnPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
      <Footer />
      <Suspense fallback={null}>
        {authOpen && <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />}
      </Suspense>
      <FloatingWhatsAppButton />
      <FloatingChatbot />
    </div>
  );
}
