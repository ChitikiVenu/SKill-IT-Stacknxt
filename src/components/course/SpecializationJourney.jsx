import { motion } from 'framer-motion';
import {
  Activity,
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Briefcase,
  Brain,
  ChevronDown,
  Cpu,
  FileSearch,
  FileText,
  Fingerprint,
  FlaskConical,
  FolderGit2,
  HardDrive,
  IndianRupee,
  Layers,
  MapPin,
  Network,
  Presentation,
  Radar,
  Router,
  ScanLine,
  ScanSearch,
  Search,
  Shield,
  ShieldAlert,
  Smartphone,
  Sparkles,
  Terminal,
  Wallet,
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const ICONS = {
  Activity, BadgeCheck, BookOpen, Briefcase, Brain, Cpu, FileSearch, FileText, Fingerprint,
  FlaskConical, FolderGit2, HardDrive, Network, Presentation, Radar, Router, ScanLine,
  ScanSearch, Search, Shield, ShieldAlert, Smartphone, Sparkles, Terminal,
};

const Icon = ({ name, ...props }) => {
  const Cmp = ICONS[name] || Sparkles;
  return <Cmp {...props} />;
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export default function SpecializationJourney({ course, journey, parentTrack, learningFlowStages, jobReadyProfileSteps, projectPresentationFlow, achievementSnapshotStages }) {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const toggleFaq = (index) => setOpenFaqIndex((current) => (current === index ? -1 : index));

  return (
    <div className="space-y-16 py-14">
      {/* Intro strip: connects this specialisation straight back to the full programme. */}
      <motion.section
        className={`rounded-[28px] bg-gradient-to-br ${journey.tint} p-6 text-white sm:p-10`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
      >
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide">
              <Layers size={13} /> Part of our full Cyber Security programme
            </span>
            <p className="mt-3 max-w-xl text-sm leading-6 text-white/90 sm:text-base">
              This specialisation is taught as part of the {parentTrack.duration} Cyber Security course — see the
              full curriculum, pricing and batch dates on the main course page.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Link to="/courses/cyber-security" className="rounded-full bg-white px-5 py-2.5 text-sm font-extrabold text-ink transition hover:bg-mist">
              View full Cyber Security programme
            </Link>
            <Link to="/contact" className="rounded-full border border-white/60 px-5 py-2.5 text-sm font-extrabold text-white transition hover:bg-white/10">
              Talk to an advisor
            </Link>
          </div>
        </div>
      </motion.section>

      {/* 1. Module roadmap */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={fadeUp}>
        <span className="eyebrow">Start here</span>
        <h2 className="mt-4 font-display text-3xl font-black text-ink sm:text-4xl">What you will learn</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {journey.modules.map((module) => (
            <div key={module.step} className="relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-5 shadow-card">
              <span className={`absolute -right-3 -top-3 font-display text-6xl font-black text-slate-50`}>{module.step}</span>
              <span className={`relative grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br ${journey.tint} text-white shadow-md`}>
                <Icon name={module.icon} size={20} />
              </span>
              <h3 className="relative mt-3 font-display text-base font-extrabold text-ink">{module.title}</h3>
              <p className="relative mt-1.5 text-sm leading-6 text-muted">{module.detail}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* 2. Beginner -> career-ready learning flow */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={fadeUp}>
        <span className="eyebrow">Your learning path</span>
        <h2 className="mt-4 font-display text-3xl font-black text-ink sm:text-4xl">From zero to career ready</h2>
        <div className="mt-6 flex flex-col items-stretch gap-2 lg:flex-row lg:items-center lg:gap-0">
          {learningFlowStages.map((stage, index) => (
            <div key={stage.label} className="flex flex-1 flex-col items-center lg:flex-row">
              <div className="w-full rounded-2xl border border-slate-100 bg-white px-4 py-3 text-center shadow-sm">
                <p className="font-display text-sm font-extrabold text-royal">{stage.label}</p>
                <p className="mt-1 text-xs leading-5 text-muted">{stage.detail}</p>
              </div>
              {index < learningFlowStages.length - 1 && (
                <span className="my-1 shrink-0 text-slate-300 lg:mx-1.5 lg:my-0">
                  <ArrowDown size={16} className="lg:hidden" />
                  <ArrowRight size={16} className="hidden lg:block" />
                </span>
              )}
            </div>
          ))}
        </div>
      </motion.section>

      {/* 3. Project showcase */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={fadeUp}>
        <span className="eyebrow">Portfolio</span>
        <h2 className="mt-4 font-display text-3xl font-black text-ink sm:text-4xl">What you will actually build</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {journey.projects.map((project) => (
            <div key={project.name} className="flex flex-col rounded-3xl border border-slate-100 bg-white p-5 shadow-card">
              <span className={`grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br ${journey.tint} text-white`}>
                <FolderGit2 size={16} />
              </span>
              <h3 className="mt-3 font-display text-base font-extrabold text-ink">{project.name}</h3>
              <p className="mt-1 text-sm leading-5 text-muted">{project.oneLiner}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.skills.map((skill) => (
                  <span key={skill} className="rounded-full bg-mist px-2.5 py-1 text-[11px] font-bold text-royal">{skill}</span>
                ))}
                {project.tools.map((tool) => (
                  <span key={tool} className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600">{tool}</span>
                ))}
              </div>
              <p className="mt-3 border-t border-slate-100 pt-3 text-xs font-semibold leading-5 text-slate-500">
                Demonstrates: {project.demonstrates}
              </p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* 4. Skills grid */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}>
        <span className="eyebrow">Skills you can show</span>
        <h2 className="mt-4 font-display text-3xl font-black text-ink sm:text-4xl">Skills you'll walk away with</h2>
        <div className="mt-6 flex flex-wrap gap-2.5">
          {journey.skills.map((skill) => (
            <span key={skill} className="flex items-center gap-2 rounded-2xl border border-slate-100 bg-white px-4 py-2.5 text-sm font-bold text-ink shadow-sm">
              <Sparkles size={14} className="text-royal" /> {skill}
            </span>
          ))}
        </div>
      </motion.section>

      {/* 5. Outcomes */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={fadeUp}>
        <span className="eyebrow">What can you achieve?</span>
        <h2 className="mt-4 font-display text-3xl font-black text-ink sm:text-4xl">By the end of this module</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {journey.outcomes.map((outcome) => (
            <div key={outcome.label} className="rounded-3xl bg-mist p-5">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white text-royal shadow-sm">
                <Icon name={outcome.icon} size={18} />
              </span>
              <p className="mt-3 font-display text-base font-extrabold text-ink">{outcome.label}</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">{outcome.detail}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* 6. Job-ready profile */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={fadeUp}>
        <span className="eyebrow">Present yourself</span>
        <h2 className="mt-4 font-display text-3xl font-black text-ink sm:text-4xl">Turn your learning into a job-ready profile</h2>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 rounded-3xl border border-slate-100 bg-white p-5 text-center shadow-card">
          {jobReadyProfileSteps.map((step, index) => (
            <span key={step} className="flex items-center gap-2">
              <span className="rounded-2xl bg-mist px-4 py-2 text-sm font-extrabold text-royal">{step}</span>
              {index < jobReadyProfileSteps.length - 1 && <span className="text-lg font-black text-slate-300">+</span>}
            </span>
          ))}
          <ArrowRight size={18} className="mx-1 text-slate-300" />
          <span className={`rounded-2xl bg-gradient-to-br ${journey.tint} px-4 py-2 text-sm font-extrabold text-white`}>Job-Ready Profile</span>
        </div>

        <p className="mt-6 text-sm font-bold uppercase tracking-wide text-slate-500">How to explain a project in interviews</p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {projectPresentationFlow.map((step, index) => (
            <span key={step} className="flex items-center gap-2">
              <span className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-bold text-ink">{step}</span>
              {index < projectPresentationFlow.length - 1 && <ArrowRight size={13} className="text-slate-300" />}
            </span>
          ))}
        </div>
      </motion.section>

      {/* 7. Career roles */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}>
        <span className="eyebrow">Career opportunities</span>
        <h2 className="mt-4 font-display text-3xl font-black text-ink sm:text-4xl">Roles you can target</h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {journey.careerRoles.map((role) => (
            <div key={role} className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
              <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${journey.tint} text-white`}>
                <Briefcase size={16} />
              </span>
              <span className="text-sm font-bold text-ink">{role}</span>
            </div>
          ))}
        </div>
      </motion.section>

      {/* 8. Salary */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}>
        <span className="eyebrow">What can you earn?</span>
        <h2 className="mt-4 font-display text-3xl font-black text-ink sm:text-4xl">Indicative entry-level salary ranges</h2>
        <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
          {[
            { label: 'Fresher / Entry Level', value: journey.salary.fresher },
            { label: '1–2 Years', value: journey.salary.midLevel },
            { label: 'Experienced Professional', value: journey.salary.experienced },
          ].map((tier, index, arr) => (
            <div key={tier.label} className="flex flex-1 items-center gap-3">
              <div className="w-full rounded-2xl border border-blue-100 bg-mist p-5 text-center">
                <span className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-white text-royal shadow-sm">
                  <IndianRupee size={16} />
                </span>
                <p className="mt-2 text-xs font-extrabold uppercase tracking-wide text-slate-500">{tier.label}</p>
                <p className="mt-1 font-display text-lg font-black text-royal">{tier.value}</p>
              </div>
              {index < arr.length - 1 && <ArrowRight size={16} className="hidden shrink-0 text-slate-300 sm:block" />}
            </div>
          ))}
        </div>
        <p className="mt-4 flex items-start gap-2 text-xs leading-5 text-slate-500">
          <Wallet size={14} className="mt-0.5 shrink-0" />
          Salary ranges are indicative and depend on skills, experience, company, role and hiring market. Skill IT
          Education does not promise guaranteed placement or a guaranteed salary.
        </p>
      </motion.section>

      {/* 9. Achievement snapshot */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}>
        <span className="eyebrow">Achievement snapshot</span>
        <h2 className="mt-4 font-display text-3xl font-black text-ink sm:text-4xl">What you finish with</h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {achievementSnapshotStages.map((stage) => (
            <div key={stage.label} className="rounded-2xl bg-ink p-4 text-center text-white">
              <p className="font-display text-sm font-extrabold text-sky">{stage.label}</p>
              <p className="mt-1 text-[11px] leading-5 text-slate-300">{stage.detail}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* SEO FAQs */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={fadeUp}>
        <span className="eyebrow">FAQs</span>
        <h2 className="mt-4 font-display text-3xl font-black text-ink sm:text-4xl">Frequently asked questions</h2>
        <div className="mt-5 space-y-3">
          {journey.faqs.map((faq, index) => {
            const isOpen = index === openFaqIndex;
            return (
              <article key={faq.question} className={`overflow-hidden rounded-2xl border transition ${isOpen ? 'border-blue-100 bg-mist shadow-sm' : 'border-slate-100 bg-white hover:border-blue-100'}`}>
                <button
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-5 px-5 py-4 text-left"
                >
                  <span className="text-sm font-bold text-ink sm:text-base">{faq.question}</span>
                  <ChevronDown size={18} className={`shrink-0 text-royal transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && <p className="px-5 pb-5 text-sm leading-7 text-muted sm:text-base">{faq.answer}</p>}
              </article>
            );
          })}
        </div>
      </motion.section>

      {/* Final CTA */}
      <motion.section
        className="rounded-[28px] bg-ink px-6 py-10 text-center text-white sm:px-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
      >
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-sky">
          <MapPin size={12} /> Cyber Security training in Hyderabad
        </span>
        <h2 className="mx-auto mt-4 max-w-2xl font-display text-2xl font-black sm:text-3xl">Ready to build your Cyber Security career?</h2>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
          Explore the complete {parentTrack.duration} Cyber Security programme and see how {course.title.toLowerCase()}{' '}
          fits into your full learning journey.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link to="/courses/cyber-security" className="primary-button">
            View full Cyber Security programme <ArrowRight size={16} />
          </Link>
          <Link to="/contact" className="rounded-full border border-white/60 px-5 py-2.5 text-sm font-extrabold text-white transition hover:bg-white/10">
            Talk to an advisor
          </Link>
        </div>
      </motion.section>
    </div>
  );
}
