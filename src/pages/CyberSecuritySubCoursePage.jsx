import { motion } from 'framer-motion';
import { CheckCircle2, ChevronRight } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import Seo from '../components/common/Seo';
import SpecializationJourney from '../components/course/SpecializationJourney';
import {
  achievementSnapshotStages,
  getCyberSecurityJourneyBySlug,
  jobReadyProfileSteps,
  learningFlowStages,
  projectPresentationFlow,
} from '../data/cyberSecurityJourneys';
import { getCourseTrackBySlug, getCyberSecuritySubCourseBySlug } from '../data/coursesData';
import { breadcrumbJsonLd, faqPageJsonLd } from '../data/structuredData';
import NotFoundPage from './NotFoundPage';

export default function CyberSecuritySubCoursePage() {
  const { subSlug } = useParams();
  const course = getCyberSecuritySubCourseBySlug(subSlug);
  const parentTrack = getCourseTrackBySlug('cyber-security');
  const journey = getCyberSecurityJourneyBySlug(subSlug);

  if (!course || !parentTrack || !journey) return <NotFoundPage />;

  const path = `/courses/cyber-security/${course.slug}`;

  return (
    <main>
      <Seo
        title={journey.metaTitle}
        description={journey.metaDescription}
        path={path}
        jsonLd={[
          breadcrumbJsonLd([
            { name: 'Courses', path: '/courses' },
            { name: 'Cyber Security', path: '/courses/cyber-security' },
            { name: course.title, path },
          ]),
          faqPageJsonLd(journey.faqs),
        ]}
      />

      <div className={`bg-gradient-to-br ${journey.tint} px-5 pb-12 pt-28 text-white sm:px-8 sm:pt-32`}>
        <motion.div
          className="page-shell"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs font-bold text-white/80">
            <Link to="/courses" className="hover:text-white">Courses</Link>
            <ChevronRight size={13} />
            <Link to="/courses/cyber-security" className="hover:text-white">Cyber Security</Link>
            <ChevronRight size={13} />
            <span className="text-white">{course.title}</span>
          </nav>
          <span className="mt-4 inline-block rounded-full bg-white/20 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wide">
            Cyber Security specialisation · Hyderabad
          </span>
          <h1 className="mt-4 max-w-3xl font-display text-3xl font-black leading-tight sm:text-5xl">
            {course.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/90 sm:text-lg">{course.tagline}</p>
        </motion.div>
      </div>

      <div className="page-shell">
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="pt-12"
        >
          <span className="eyebrow">What you'll learn</span>
          <p className="mt-4 max-w-3xl text-base leading-7 text-muted">{course.blurb}</p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {course.bullets.map((item) => (
              <li key={item} className="flex gap-2.5 rounded-2xl bg-mist p-4 text-sm leading-6 text-slate-700">
                <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-royal" />
                {item}
              </li>
            ))}
          </ul>
        </motion.section>

        <SpecializationJourney
          course={course}
          journey={journey}
          parentTrack={parentTrack}
          learningFlowStages={learningFlowStages}
          jobReadyProfileSteps={jobReadyProfileSteps}
          projectPresentationFlow={projectPresentationFlow}
          achievementSnapshotStages={achievementSnapshotStages}
        />
      </div>
    </main>
  );
}
