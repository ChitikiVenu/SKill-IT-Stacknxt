import {lazy, Suspense, useEffect, useRef, useState} from 'react';
import {useLocation} from 'react-router-dom';
import Seo from '../components/common/Seo';
import ScrollLeadModal from '../components/common/ScrollLeadModal';
import {faqs} from '../data/content';
import {
    educationalOrganizationJsonLd,
    faqPageJsonLd,
} from '../data/structuredData';
import AccreditationsSection from '../sections/AccreditationsSection';
import HeroSection from '../sections/HeroSection';
import VideoSection from '../sections/VideoSection';

const AlumniSection = lazy(() => import('../sections/AlumniSection'));
const CareerMatcherSection = lazy(
    () => import('../sections/CareerMatcherSection'),
);
const CertificatesSection = lazy(
    () => import('../sections/CertificatesSection'),
);
const CoursesSection = lazy(() => import('../sections/CoursesSection'));
const FaqSection = lazy(() => import('../sections/FaqSection'));
const PlacementPartnersMarquee = lazy(
    () => import('../components/course/PlacementPartnersMarquee'),
);
const ReviewsSection = lazy(() => import('../sections/ReviewsSection'));
const SuccessStoriesSection = lazy(
    () => import('../sections/SuccessStoriesSection'),
);

const SectionFallback = () => (
    <div className='page-shell py-20'>
        <div className='h-40 animate-pulse rounded-[28px] bg-mist' />
    </div>
);

const SEO_DESCRIPTION =
    'Skill IT Education is a Hyderabad-based EdTech platform offering job-ready Cyber Security, AI Engineer, Data Science, SOC Analyst, and Generative AI courses with live mentorship, labs, and placement support.';

const SCROLL_LEAD_STORAGE_KEY = 'skillit_scroll_lead_shown';

export default function LandingPage() {
    const {hash} = useLocation();
    const scrollTriggerRef = useRef(null);
    const [scrollLeadOpen, setScrollLeadOpen] = useState(false);

    useEffect(() => {
        // Supabase OAuth redirects (detectSessionInUrl) land back on "/" with the session tokens
        // appended as a URL hash fragment (e.g. "#access_token=...&token_type=bearer"), which isn't
        // a valid CSS selector and would throw in document.querySelector below. Only chase hashes
        // that actually look like an anchor id.
        if (!hash || !/^#[\w-]+$/.test(hash)) return undefined;
        let timeoutId;
        let attempts = 0;
        const tryScroll = () => {
            const target = document.querySelector(hash);
            if (target) {
                target.scrollIntoView({behavior: 'instant', block: 'start'});
                return;
            }
            attempts += 1;
            if (attempts < 60) timeoutId = window.setTimeout(tryScroll, 50);
        };
        tryScroll();
        return () => window.clearTimeout(timeoutId);
    }, [hash]);

    useEffect(() => {
        if (sessionStorage.getItem(SCROLL_LEAD_STORAGE_KEY)) return undefined;
        const node = scrollTriggerRef.current;
        if (!node) return undefined;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
                    sessionStorage.setItem(SCROLL_LEAD_STORAGE_KEY, '1');
                    setScrollLeadOpen(true);
                    observer.disconnect();
                }
            },
            {threshold: 0},
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    return (
        <main>
            <Seo
                title='Cyber Security, AI Engineer, Data Science, SOC Analyst & GenAI Courses'
                description={SEO_DESCRIPTION}
                path='/'
                jsonLd={[educationalOrganizationJsonLd(), faqPageJsonLd(faqs)]}
            />
            <HeroSection />
            <AccreditationsSection />
            <div ref={scrollTriggerRef} aria-hidden='true' />
            <Suspense fallback={<SectionFallback />}>
                <div className='page-shell py-4'>
                    <PlacementPartnersMarquee />
                </div>
                <VideoSection />
                <CoursesSection />
                <CertificatesSection />
                <CareerMatcherSection />
                <ReviewsSection />
                <SuccessStoriesSection />
                <AlumniSection />
                <FaqSection />
            </Suspense>
            <ScrollLeadModal
                open={scrollLeadOpen}
                onClose={() => setScrollLeadOpen(false)}
            />
        </main>
    );
}
