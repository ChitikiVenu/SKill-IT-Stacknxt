import { AnimatePresence, motion } from 'framer-motion';
import { CalendarDays, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCourseTrackBySlug } from '../data/coursesData';
import { WHATSAPP_MESSAGE, WHATSAPP_NUMBER } from '../components/common/FloatingWhatsAppButton';
import studentPortraitLeft from '../assets/images/hero/student1.png';
import studentPortraitRight from '../assets/images/hero/student2.png';

// The site only ships five real programmes, so the rotating word is grounded in an actual
// outcome taught by one of them rather than a made-up job title.
const ROTATING_ROLES = ['GenAI Engineer', 'Ethical Hacker', 'Data Scientist', 'SOC Analyst', 'Prompt Engineer'];

const BATCH_DATE = 'September 16th, 2026';

const advisorWhatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

const featuredCourses = [
  {
    slug: 'cyber-security',
    icon: ShieldCheck,
    accent: 'text-royal bg-royal/10',
    displayTitle: 'Cyber Security',
    blurb: 'Learn the core concepts of cybersecurity, network security, the threat landscape, vulnerabilities, ethical hacking and incident response.',
    checklist: ['Cyber Security & Ethical Hacking', 'Cyber Security Professional', 'Penetration Testing', 'AI in Cyber Security & more...'],
    buttonLabel: 'Explore Full Cyber Security Curriculum',
  },
  {
    slug: 'ai-engineer',
    icon: Sparkles,
    accent: 'text-indigo-600 bg-indigo-500/10',
    displayTitle: 'AI Engineering',
    blurb: 'Build a strong foundation in Artificial Intelligence with Python, Machine Learning basics, Generative AI, LLMs and real-world projects.',
    checklist: ['Data Science & Python Foundations', 'Machine Learning', 'Advanced Data Science & AI', 'Artificial Intelligence & Deep Learning & more...'],
    buttonLabel: 'Explore AI Engineering Curriculum',
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
    <section id="home" className="relative isolate overflow-hidden bg-gradient-to-b from-[#EAF0FF] via-[#F5F8FF] to-white">
      {/* Concentric ring decoration, top-right — plain outlines, not filled/blurred, to match the reference's light airy background. */}
      <div className="absolute -right-20 -top-24 -z-10 h-[260px] w-[260px] rounded-full border border-royal/15" />
      <div className="absolute -right-32 -top-36 -z-10 h-[380px] w-[380px] rounded-full border border-royal/10" />
      <div className="absolute -right-44 -top-48 -z-10 h-[500px] w-[500px] rounded-full border border-royal/[0.08]" />
      <div className="absolute -bottom-16 -left-16 -z-10 h-56 w-56 rounded-full bg-amber-100/70" />

      {/* Soft wave layers along the bottom edge for a bit of movement behind the content. */}
      <svg
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32 w-full sm:h-40"
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0,120 C240,180 480,60 720,90 C960,120 1200,190 1440,110 L1440,200 L0,200 Z" fill="#DCE7FF" fillOpacity="0.6" />
        <path d="M0,150 C260,90 520,180 760,140 C1000,100 1220,170 1440,150 L1440,200 L0,200 Z" fill="#EEF3FF" fillOpacity="0.8" />
      </svg>

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

      <div className="page-shell relative w-full pb-6 pt-20 sm:pb-8 md:pt-24 lg:pt-28">
        <div className="mx-auto max-w-3xl text-center">
          <motion.p className="text-sm font-semibold text-slate-600 sm:text-base" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            Cyber Security, AI Engineering &amp; Data Science Upskilling in Madhapur, Hyderabad
          </motion.p>
        </div>

        <div className="mx-auto mt-3 w-full max-w-6xl px-1 text-center">
          <motion.h1
            className="flex flex-nowrap items-baseline justify-center gap-x-2 whitespace-nowrap font-display font-black leading-[1.15] tracking-tight text-ink [font-size:clamp(0.85rem,3.8vw,2.5rem)]"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            <span>We train you to become a</span>
            <span className="relative inline-grid h-[1.15em] align-baseline">
              {/* Invisible sizers: every rotating word stacked in the same grid cell. The grid
                  track auto-sizes to the widest one, so this slot's width — and the headline's
                  total width and centering — never changes as the visible word rotates. */}
              {ROTATING_ROLES.map((role) => (
                <span
                  key={role}
                  aria-hidden="true"
                  className="invisible col-start-1 row-start-1 whitespace-nowrap"
                >
                  {role}
                </span>
              ))}
              <span className="absolute inset-0 overflow-hidden text-left">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={ROTATING_ROLES[roleIndex]}
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    exit={{ y: '-100%', opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="inline-block whitespace-nowrap bg-gradient-to-r from-royal to-sky bg-clip-text text-transparent"
                  >
                    {ROTATING_ROLES[roleIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </span>
          </motion.h1>
        </div>

        <div className="mx-auto max-w-3xl text-center">

          <motion.span
            className="mt-3 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.14em] text-amber-700"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" /> Upcoming batch
          </motion.span>

          <motion.p className="mt-2 text-sm font-semibold text-muted" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            Our upcoming batch starts on
          </motion.p>
          <motion.p className="mt-1 flex items-center justify-center gap-2 font-display text-xl font-extrabold text-royal sm:text-2xl" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <CalendarDays size={22} className="text-royal" /> {BATCH_DATE}
          </motion.p>

          <motion.p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-muted sm:text-base" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            Hands-on training built around practical labs, real-world projects and career-ready skills — not slides and theory.
          </motion.p>

          <motion.p className="mt-3 text-xs font-extrabold uppercase tracking-[0.14em] text-amber-700 sm:text-sm" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            Job-Ready Technology Training in Hyderabad
          </motion.p>
        </div>

        <motion.div className="relative z-10 mx-auto mt-3 grid max-w-4xl gap-3 sm:grid-cols-2" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
          {cards.map(({ track, icon: Icon, accent, displayTitle, blurb, checklist, buttonLabel }) => (
            <div key={track.slug} className="course-card flex flex-col rounded-[24px] border border-slate-100 bg-white p-4 shadow-card">
              <span className={`grid h-10 w-10 place-items-center rounded-2xl ${accent}`}>
                <Icon size={20} />
              </span>
              <h3 className={`mt-2 font-display text-lg font-extrabold ${accent.split(' ')[0]}`}>{displayTitle} Course</h3>
              <p className="mt-1 line-clamp-1 text-sm leading-5 text-muted">{blurb}</p>
              <ul className="mt-2 space-y-1">
                {checklist.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm leading-5 text-slate-700">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-mint" /> {item}
                  </li>
                ))}
              </ul>
              <Link to="/courses" className="primary-button mt-3 w-full">
                {buttonLabel}
              </Link>
            </div>
          ))}
        </motion.div>

        <motion.div className="mt-3 flex flex-wrap justify-center gap-3" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Link to="/contact" className="primary-button">Book Free Demo</Link>
          <a href={advisorWhatsappUrl} target="_blank" rel="noopener noreferrer" className="secondary-button">Talk to an Advisor</a>
        </motion.div>
      </div>
    </section>
  );
}
