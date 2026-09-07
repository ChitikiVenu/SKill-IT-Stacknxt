import { AnimatePresence, motion } from 'framer-motion';
import { Play, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import SectionHeading from '../components/common/SectionHeading';
import { successStories } from '../data/content';

export default function SuccessStoriesSection() {
  const [selectedStory, setSelectedStory] = useState(null);
  const track = useMemo(() => [...successStories, ...successStories], []);

  return (
    <section id="success-stories" className="scroll-mt-24 py-20 sm:py-28">
      <div className="page-shell">
        <SectionHeading eyebrow="Learner journeys" title="All courses offered career success stories" description="Career transitions in motion—from guided learning and practice to impactful technical roles." />
        <div className="mt-10 overflow-hidden" style={{ maskImage: 'linear-gradient(90deg, transparent, black 6%, black 94%, transparent)', WebkitMaskImage: 'linear-gradient(90deg, transparent, black 6%, black 94%, transparent)' }}>
          <div className="marquee-track flex w-max gap-5">
            {track.map((story, index) => (
              <article key={`${story.id}-${index}`} className="group relative w-[300px] shrink-0 overflow-hidden rounded-[28px] bg-ink shadow-card sm:w-[370px]">
                <img src={story.image} alt={`${story.name}'s career success story`} loading="lazy" className="h-[300px] w-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <button onClick={() => setSelectedStory(story)} aria-label={`Play ${story.name}'s story`} className="absolute left-1/2 top-1/2 z-10 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-royal shadow-xl transition hover:scale-110"><Play size={25} fill="currentColor" /></button>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 p-6 text-white">
                  <span className="rounded-full bg-white/15 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider backdrop-blur">{story.company}</span>
                  <h3 className="mt-3 font-display text-2xl font-extrabold">{story.name}</h3>
                  <p className="mt-1 text-sm font-semibold text-white/75">{story.designation}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>{selectedStory && <motion.div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/75 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => event.target === event.currentTarget && setSelectedStory(null)}><motion.section role="dialog" aria-modal="true" aria-label={`${selectedStory.name}'s career success story`} className="relative w-full max-w-4xl overflow-hidden rounded-[28px] bg-slate-950 shadow-2xl" initial={{ opacity: 0, scale: 0.96, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 16 }}><button onClick={() => setSelectedStory(null)} aria-label="Close video" className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/25"><X size={19} /></button>{selectedStory.video ? (<div className="flex max-h-[80vh] items-center justify-center bg-black"><video className="max-h-[80vh] w-auto max-w-full" src={selectedStory.video} poster={selectedStory.image} controls autoPlay playsInline preload="metadata" /></div>) : (<div className="aspect-video"><iframe className="h-full w-full" src={`https://www.youtube-nocookie.com/embed/${selectedStory.videoId}?autoplay=1&rel=0`} title={`${selectedStory.name} career success story`} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen /></div>)}</motion.section></motion.div>}</AnimatePresence>
    </section>
  );
}
