import { AnimatePresence, motion } from 'framer-motion';
import { BrainCircuit, CalendarDays, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCourseTrackBySlug } from '../data/coursesData';
import { WHATSAPP_MESSAGE, WHATSAPP_NUMBER } from '../components/common/FloatingWhatsAppButton';
import studentPortraitLeft from '../assets/images/hero/student1.png';
import studentPortraitRight from '../assets/images/hero/student2.png';

// The site only ships five real programmes, so the rotating word is grounded in an actual
// outcome taught by one of them rather than a made-up job title.
const ROTATING_ROLES = ['Ethical Hacker', 'AI Engineer', 'Data Scientist', 'SOC Analyst', 'Prompt Engineer'];

const BATCH_DATE = 'September 14th, 2026';

const advisorWhatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

const featuredCourses = [
  {
    slug: 'cyber-security',
    icon: ShieldCheck,
    accent: 'text-royal bg-royal/10',
    checklist: ['Cyber Security & Ethical Hacking', 'Network & Cloud Security', 'Penetration Testing', 'AI-Assisted Threat Detection & more...'],
  },
  {
    slug: 'ai-engineer',
    icon: BrainCircuit,
    accent: 'text-indigo-600 bg-indigo-500/10',
    checklist: ['Python & Machine Learning Foundations', 'Deep Learning & Computer Vision', 'NLP & Generative Models', 'MLOps & Model Deployment & more...'],
  },
];

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setRoleIndex((current) => (current + 1) % ROTATING_ROLES.length), 2600);
    return () => clearInterval(id);
  }, []);

  const cards = featuredCourses.map((entry) => ({ ...entry, track: getCourseTrackBySlug(entry.slug) })).filter((entry) => entry.track);

  return (
    <section id="home" className="relative isolate overflow-hidden bg-gradient-to-b from-[#EAF0FF] via-[#F5F8FF] to-white lg:flex lg:min-h-[100svh] lg:items-center">
      {/* Concentric ring decoration, top-right — plain outlines, not filled/blurred, to match the reference's light airy background. */}
      <div className="absolute -right-20 -top-24 -z-10 h-[260px] w-[260px] rounded-full border border-royal/15" />
      <div className="absolute -right-32 -top-36 -z-10 h-[380px] w-[380px] rounded-full border border-royal/10" />
      <div className="absolute -right-44 -top-48 -z-10 h-[500px] w-[500px] rounded-full border border-royal/[0.08]" />
      <div className="absolute -bottom-16 -left-16 -z-10 h-56 w-56 rounded-full bg-amber-100/70" />

      <img
        src={studentPortraitLeft}
        alt="Skill IT Education learner"
        style={{ maskImage: 'linear-gradient(to bottom, black 88%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 88%, transparent 100%)' }}
        className="pointer-events-none absolute left-6 top-28 hidden w-[220px] object-contain xl:block"
      />
      <img
        src={studentPortraitRight}
        alt="Skill IT Education learner"
        style={{ maskImage: 'linear-gradient(to bottom, black 88%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 88%, transparent 100%)' }}
        className="pointer-events-none absolute right-6 top-28 hidden w-[220px] object-contain xl:block"
      />

      <div className="page-shell relative w-full pb-8 pt-24 sm:pb-10 md:pt-28 lg:py-10">
        <div className="mx-auto max-w-2xl text-center">
          <motion.span
            className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.14em] text-amber-700"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" /> Upcoming batch
          </motion.span>

          <motion.p className="mt-3 text-sm font-semibold text-muted" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
            Our upcoming batch starts on
          </motion.p>
          <motion.p className="mt-1 flex items-center justify-center gap-2 font-display text-xl font-extrabold text-royal sm:text-2xl" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <CalendarDays size={22} className="text-royal" /> {BATCH_DATE}
          </motion.p>

          <motion.h1 className="mt-4 font-display text-4xl font-black leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-6xl" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            We train you to become a
            <span className="relative mx-auto mt-1 block h-[1.2em] w-full overflow-hidden sm:h-[1.15em]">
              <AnimatePresence>
                <motion.span
                  key={ROTATING_ROLES[roleIndex]}
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  exit={{ y: '-100%', opacity: 0 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-royal to-sky bg-clip-text text-transparent"
                >
                  {ROTATING_ROLES[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h1>

          <motion.p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted sm:text-base" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            Hands-on training built around practical labs, real-world projects and career-ready skills — not slides and theory.
          </motion.p>
        </div>

        <motion.div className="relative z-10 mx-auto mt-6 grid max-w-4xl gap-4 sm:grid-cols-2" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }}>
          {cards.map(({ track, icon: Icon, accent, checklist }) => (
            <div key={track.slug} className="course-card flex flex-col rounded-[24px] border border-slate-100 bg-white p-5 shadow-card">
              <span className={`grid h-10 w-10 place-items-center rounded-2xl ${accent}`}>
                <Icon size={20} />
              </span>
              <h3 className="mt-3 font-display text-lg font-extrabold text-ink">{track.title} Course</h3>
              <p className="mt-1.5 text-sm leading-5 text-muted">{track.tagline}</p>
              <ul className="mt-3 space-y-1.5">
                {checklist.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm leading-5 text-slate-700">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-mint" /> {item}
                  </li>
                ))}
              </ul>
              <Link to="/courses" className="primary-button mt-4 w-full">
                Explore Full {track.title} Curriculum
              </Link>
            </div>
          ))}
        </motion.div>

        <motion.div className="mt-5 flex flex-wrap justify-center gap-3" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.34 }}>
          <Link to="/contact" className="primary-button">Book Free Demo</Link>
          <a href={advisorWhatsappUrl} target="_blank" rel="noopener noreferrer" className="secondary-button">Talk to an Advisor</a>
        </motion.div>
      </div>
    </section>
  );
}
