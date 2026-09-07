import { motion } from 'framer-motion';
import { ArrowUpRight, BadgeCheck, Star } from 'lucide-react';
import { useMemo } from 'react';
import SectionHeading from '../components/common/SectionHeading';
import { reviews } from '../data/content';

export default function ReviewsSection() {
  const track = useMemo(() => [...reviews, ...reviews], []);

  return (
    <section id="reviews" className="section-fade flex min-h-[100svh] snap-start flex-col justify-center scroll-mt-24 py-[clamp(1.5rem,5vh,4rem)]">
      <div className="page-shell">
        <SectionHeading eyebrow="LinkedIn learner testimonials" title="Every course. Real learner momentum." description="Scroll through reflections from learners who turned structured practice into confident next steps." />
        <div className="mt-10 overflow-hidden" style={{ maskImage: 'linear-gradient(90deg, transparent, black 6%, black 94%, transparent)', WebkitMaskImage: 'linear-gradient(90deg, transparent, black 6%, black 94%, transparent)' }}>
          <div className="marquee-track flex w-max gap-5">
            {track.map((review, index) => (
              <motion.article key={`${review.id}-${index}`} className="w-[290px] shrink-0 rounded-[28px] border border-white bg-white p-6 shadow-soft sm:w-[340px]" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.25 }}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img src={review.avatar} alt={`${review.name} headshot`} loading="lazy" className="h-12 w-12 rounded-full object-cover" />
                    <div><h3 className="text-xs font-extrabold tracking-[0.08em] text-ink">{review.name}</h3><p className="mt-1 text-xs text-muted">{review.role}</p></div>
                  </div>
                  {review.linkedin ? (
                    <a href={review.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${review.name} on LinkedIn`} className="grid h-7 w-7 place-items-center rounded-md bg-[#0A66C2] text-[11px] font-extrabold text-white transition hover:brightness-110">in</a>
                  ) : (
                    <span aria-label="LinkedIn testimonial" className="grid h-7 w-7 place-items-center rounded-md bg-[#0A66C2] text-[11px] font-extrabold text-white">in</span>
                  )}
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <span className="rounded-full bg-mist px-3 py-1.5 text-[10px] font-extrabold text-royal">{review.course}</span>
                  <div className="flex text-amber-400">{Array.from({ length: 5 }).map((_, star) => <Star key={star} size={13} fill="currentColor" />)}</div>
                </div>
                <p className="mt-5 text-sm leading-7 text-slate-600">“{review.text}”</p>
                <p className="mt-6 flex items-center gap-1.5 text-xs font-bold text-[#0A66C2]"><BadgeCheck size={15} /> Shared by a verified learner</p>
              </motion.article>
            ))}
          </div>
        </div>
        <div className="mt-6 flex justify-center"><a href="#reviews" className="inline-flex items-center gap-1 text-sm font-extrabold text-royal transition hover:gap-2">View More <span>»</span><ArrowUpRight size={15} /></a></div>
      </div>
    </section>
  );
}
