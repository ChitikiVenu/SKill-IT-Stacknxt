import { motion } from 'framer-motion';
import { CheckCircle2, ChevronDown, Clock, Download, GraduationCap, Layers, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Seo from '../components/common/Seo';
import CourseCertificate from '../components/course/CourseCertificate';
import EnrollmentModal from '../components/course/EnrollmentModal';
import LeadModal from '../components/course/LeadModal';
import { useBrochureGate } from '../contexts/BrochureGateContext';
import { getAccreditationBullets, getCourseTrackBySlug, getDeliveryPricingOptions } from '../data/coursesData';
import { courseJsonLd, faqPageJsonLd } from '../data/structuredData';
import { downloadModuleBrochure } from '../lib/brochurePdf';
import ReviewsSection from '../sections/ReviewsSection';
import SuccessStoriesSection from '../sections/SuccessStoriesSection';
import NotFoundPage from './NotFoundPage';

const LEAD_CAPTURED_KEY = 'isLeadCaptured';

export default function CourseDetailPage() {
  const { slug } = useParams();
  const track = getCourseTrackBySlug(slug);
  const { requestDownload } = useBrochureGate();
  const [openCurriculumIndex, setOpenCurriculumIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [enrollOption, setEnrollOption] = useState(null);
  const [leadOpen, setLeadOpen] = useState(false);

  useEffect(() => {
    if (!track) return undefined;
    setOpenCurriculumIndex(0);
    setOpenFaqIndex(0);
    setEnrollOption(null);
    if (sessionStorage.getItem(LEAD_CAPTURED_KEY) === 'true') return undefined;
    const timeoutId = window.setTimeout(() => setLeadOpen(true), 800);
    return () => window.clearTimeout(timeoutId);
  }, [track]);

  if (!track) return <NotFoundPage />;

  const closeLeadModal = () => setLeadOpen(false);
  const handleLeadCaptured = () => {
    sessionStorage.setItem(LEAD_CAPTURED_KEY, 'true');
    setLeadOpen(false);
    downloadModuleBrochure(track);
  };
  const toggleCurriculum = (index) => setOpenCurriculumIndex((current) => (current === index ? -1 : index));
  const toggleFaq = (index) => setOpenFaqIndex((current) => (current === index ? -1 : index));

  return (
    <main>
      <Seo
        title={track.metaTitle}
        description={track.metaDescription}
        path={`/courses/${track.slug}`}
        jsonLd={[courseJsonLd(track), faqPageJsonLd(track.faqs)]}
      />

      <div className={`bg-gradient-to-br ${track.tint} px-5 pb-12 pt-28 text-white sm:px-8 sm:pt-32`}>
        <motion.div
          className="page-shell"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wide">
            {track.category} pathway
          </span>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-black leading-tight sm:text-6xl">
            {track.hero.headline}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/90 sm:text-lg">{track.hero.body}</p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm font-bold">
            <span className="flex items-center gap-2 rounded-full bg-white/15 px-3 py-2"><Clock size={15} /> {track.duration} · {track.hours}</span>
            <span className="flex items-center gap-2 rounded-full bg-white/15 px-3 py-2"><Layers size={15} /> {track.level} level</span>
            <span className="flex items-center gap-2 rounded-full bg-white/15 px-3 py-2"><GraduationCap size={15} /> Live Online · Classroom</span>
            <span className="flex items-center gap-2 rounded-full bg-white/15 px-3 py-2">
              <span className="flex text-amber-300">{Array.from({ length: 5 }).map((_, star) => <Star key={star} size={13} fill="currentColor" />)}</span>
              Rated by our learners
            </span>
          </div>
        </motion.div>
      </div>

      <div className="page-shell -mt-8 pb-8">
        <div className="grid gap-4 sm:grid-cols-2">
          {getDeliveryPricingOptions(track).map((option, index) => (
            <motion.div
              key={option.mode}
              className="rounded-[28px] border border-slate-100 bg-white p-6 shadow-lift"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.08, duration: 0.4, ease: 'easeOut' }}
              whileHover={{ y: -6 }}
            >
              <p className="font-display text-xl font-extrabold text-ink">{option.mode}</p>
              <p className="text-sm text-muted">{option.tagline}</p>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-sm font-semibold text-slate-400 line-through">{option.originalPrice}</span>
                <span className="font-display text-3xl font-black text-royal">{option.price}</span>
              </div>
              <ul className="mt-4 space-y-1.5">
                {getAccreditationBullets(track).map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2 text-sm leading-5 text-slate-600">
                    <CheckCircle2 size={13} className="mt-0.5 shrink-0 text-mint" /> {bullet}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setEnrollOption(option)}
                className="primary-button mt-5 w-full"
              >
                Enquire Now
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="page-shell space-y-14 pb-20">
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="font-display text-3xl font-black text-ink sm:text-4xl">Why choose our {track.title} course?</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {[track.whyChoose.columnA, track.whyChoose.columnB].map((column, columnIndex) => (
              <ul key={columnIndex} className="space-y-3 rounded-2xl bg-mist p-5 transition hover:shadow-card">
                {column.map((item) => (
                  <li key={item} className="flex gap-2.5 text-base leading-6 text-slate-700">
                    <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-royal" />
                    {item}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <span className="eyebrow">About the course</span>
          <h2 className="mt-4 font-display text-3xl font-black text-ink sm:text-4xl">{track.overview.headline}</h2>
          <p className="mt-3 max-w-3xl text-base leading-7 text-muted">{track.overview.body}</p>
          <ul className="mt-4 space-y-2.5">
            {track.overview.bullets.map((item) => (
              <li key={item} className="flex gap-2.5 text-base leading-6 text-slate-700">
                <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-mint" />
                {item}
              </li>
            ))}
          </ul>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <span className="eyebrow animate-pulse">Curriculum</span>
          <h2 className="mt-4 font-display text-3xl font-black text-ink sm:text-4xl">Syllabus of the {track.title} course</h2>
          <div className="mt-5 space-y-3">
            {track.highlights.map((highlight, index) => {
              const isOpen = index === openCurriculumIndex;
              return (
                <article key={highlight.tab} className={`overflow-hidden rounded-2xl border transition ${isOpen ? 'border-blue-100 bg-mist shadow-sm' : 'border-slate-100 bg-white hover:border-blue-100'}`}>
                  <button
                    onClick={() => toggleCurriculum(index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-5 px-5 py-4 text-left"
                  >
                    <span className="font-display text-base font-extrabold text-ink sm:text-lg">{highlight.tab}</span>
                    <ChevronDown size={18} className={`shrink-0 text-royal transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <ul className="space-y-2.5 px-5 pb-5">
                      {highlight.bullets.map((item) => (
                        <li key={item} className="flex gap-2.5 text-base leading-6 text-slate-700">
                          <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-royal" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              );
            })}
          </div>
        </motion.section>

        <motion.section
          className="rounded-[28px] bg-ink px-6 py-7 text-white sm:px-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <p className="text-sm font-extrabold uppercase tracking-wide text-sky">Capstone</p>
          <p className="mt-2 max-w-3xl text-base leading-6 text-slate-200">{track.capstone}</p>
        </motion.section>

        <CourseCertificate track={track} />

        <motion.section
          className="rounded-[28px] border border-blue-100 bg-mist p-6 sm:p-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="font-display text-3xl font-black text-ink sm:text-4xl">Download our course curriculum</h2>
          <p className="mt-2 max-w-2xl text-base leading-6 text-muted">{track.downloadCurriculum.body}</p>
          <ul className="mt-4 space-y-2">
            {track.downloadCurriculum.bullets.map((item) => (
              <li key={item} className="flex gap-2.5 text-base leading-6 text-slate-700">
                <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-royal" />
                {item}
              </li>
            ))}
          </ul>
          <button
            onClick={() => requestDownload(() => downloadModuleBrochure(track), track.title)}
            className="primary-button mt-5"
          >
            <Download size={17} /> Download curriculum
          </button>
        </motion.section>

        <SuccessStoriesSection />
        <ReviewsSection />

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <span className="eyebrow">FAQs</span>
          <h2 className="mt-4 font-display text-3xl font-black text-ink sm:text-4xl">Frequently asked questions</h2>
          <div className="mt-5 space-y-3">
            {track.faqs.map((faq, index) => {
              const isOpen = index === openFaqIndex;
              return (
                <article key={faq.question} className={`overflow-hidden rounded-2xl border transition ${isOpen ? 'border-blue-100 bg-mist shadow-sm' : 'border-slate-100 bg-white hover:border-blue-100'}`}>
                  <button
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-5 px-5 py-4 text-left"
                  >
                    <span className="text-base font-bold text-ink">{faq.question}</span>
                    <ChevronDown size={18} className={`shrink-0 text-royal transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && <p className="px-5 pb-5 text-base leading-7 text-muted">{faq.answer}</p>}
                </article>
              );
            })}
          </div>
        </motion.section>
      </div>

      <LeadModal open={leadOpen} courseTitle={track.title} tint={track.tint} onClose={closeLeadModal} onCaptured={handleLeadCaptured} />
      <EnrollmentModal
        open={Boolean(enrollOption)}
        classType={enrollOption?.mode}
        courseTitle={track.title}
        courseSlug={track.slug}
        onClose={() => setEnrollOption(null)}
      />
    </main>
  );
}
