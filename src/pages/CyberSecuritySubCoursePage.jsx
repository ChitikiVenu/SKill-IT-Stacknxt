import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import Seo from '../components/common/Seo';
import { getCourseTrackBySlug, getCyberSecuritySubCourseBySlug } from '../data/coursesData';
import NotFoundPage from './NotFoundPage';

export default function CyberSecuritySubCoursePage() {
  const { subSlug } = useParams();
  const course = getCyberSecuritySubCourseBySlug(subSlug);
  const parentTrack = getCourseTrackBySlug('cyber-security');

  if (!course || !parentTrack) return <NotFoundPage />;

  return (
    <main>
      <Seo
        title={course.title}
        description={course.blurb}
        path={`/courses/cyber-security/${course.slug}`}
      />

      <div className={`bg-gradient-to-br ${parentTrack.tint} px-5 pb-12 pt-28 text-white sm:px-8 sm:pt-32`}>
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
            Cyber Security specialisation
          </span>
          <h1 className="mt-4 max-w-3xl font-display text-3xl font-black leading-tight sm:text-5xl">
            {course.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/90 sm:text-lg">{course.tagline}</p>
        </motion.div>
      </div>

      <div className="page-shell space-y-10 py-12">
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
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

        <motion.section
          className="rounded-[28px] border border-blue-100 bg-mist p-6 sm:p-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="font-display text-2xl font-black text-ink sm:text-3xl">
            Part of our full {parentTrack.title} programme
          </h2>
          <p className="mt-2 max-w-2xl text-base leading-6 text-muted">
            This specialisation is taught as part of the {parentTrack.duration} {parentTrack.title} course — see the full
            curriculum, pricing and batch dates on the main course page.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link to="/courses/cyber-security" className="primary-button">
              View full Cyber Security programme <ArrowRight size={16} />
            </Link>
            <Link to="/contact" className="secondary-button">Talk to an advisor</Link>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
