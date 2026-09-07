import { motion } from 'framer-motion';
import { ArrowUpRight, BookOpen, Search, SlidersHorizontal } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import SectionHeading from '../components/common/SectionHeading';
import { courses } from '../data/content';

const categories = ['All', 'Security', 'AI', 'Data'];

export default function CoursesSection() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const results = useMemo(() => courses.filter((course) => (category === 'All' || course.category === category) && course.title.toLowerCase().includes(query.toLowerCase())), [category, query]);

  const handleCategoryClick = useCallback((event) => setCategory(event.currentTarget.dataset.category), []);

  return (
    <section id="courses" className="flex min-h-[100svh] snap-start flex-col justify-center scroll-mt-24 py-[clamp(1.5rem,5vh,4rem)]">
      <div className="page-shell min-w-0">
        <div className="flex flex-col items-center gap-4 text-center"><SectionHeading eyebrow="Program catalogue" title="Explore courses that accelerate your career" description="From first principles to real project work, every program is built around roles companies hire for." /><div className="hidden items-center gap-2 rounded-2xl border border-slate-100 bg-mist px-4 py-3 text-sm font-semibold text-slate-600 sm:flex"><BookOpen size={18} className="text-royal" /> Live mentor-led cohorts</div></div>
        <div className="mt-[clamp(1rem,3vh,2.5rem)] flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-3 shadow-sm lg:flex-row lg:items-center lg:justify-between">
          <label className="relative block flex-1 lg:max-w-sm"><Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search courses" className="w-full rounded-xl bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none ring-1 ring-transparent transition focus:bg-white focus:ring-royal" /></label>
          <div className="hide-scrollbar flex gap-2 overflow-x-auto pb-1 lg:pb-0"><span className="flex shrink-0 items-center gap-2 px-2 text-xs font-bold uppercase tracking-wide text-slate-400"><SlidersHorizontal size={15} /> Filter</span>{categories.map((item) => <button key={item} data-category={item} onClick={handleCategoryClick} className={`shrink-0 rounded-full border px-4 py-2 text-xs font-bold transition ${category === item ? 'border-royal bg-royal text-white' : 'border-blue-100 bg-white text-royal hover:border-royal'}`}>{item}</button>)}</div>
        </div>
        {/* A user-scrollable single row (not a grid) so this section's height never depends on how
            many courses match the filter — swipe or drag to see the rest instead of scrolling the page. */}
        <div className="hide-scrollbar mt-[clamp(1rem,3vh,2rem)] flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2">
          {results.map((course, index) => (
            <motion.article key={course.title} className="course-card group w-[240px] shrink-0 snap-start overflow-hidden rounded-[28px] border border-slate-100 bg-white shadow-soft transition hover:shadow-lift sm:w-[280px]" style={{ '--course-float-delay': `${index * -0.75}s` }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.15 }} transition={{ delay: index * 0.07 }}>
              <div className="relative h-[clamp(90px,20svh,160px)] overflow-hidden"><img src={course.image} alt={`${course.title} course thumbnail`} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" /><span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wide text-royal">{course.category}</span><span className="absolute bottom-3 left-3 rounded-full bg-slate-950/50 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-sm">{course.duration}</span></div>
              <div className="flex flex-col p-4"><p className="text-xs font-semibold text-slate-500">{course.level} pathway</p><h3 className="mt-1 font-display text-base font-extrabold leading-6 text-ink">{course.title}</h3><p className="mt-1.5 line-clamp-1 text-xs leading-5 text-muted">{course.tagline}</p><div className="mt-3 border-t border-slate-100 pt-3"><div className="flex items-end justify-between gap-2"><p className="font-display text-lg font-extrabold text-royal">{course.price}</p><span className="rounded-full bg-paleMint px-2 py-1 text-[9px] font-extrabold uppercase tracking-wide text-emerald-800">Scholarship</span></div><Link to={`/courses/${course.slug}`} className="mt-3 flex w-full items-center justify-between rounded-xl bg-mist px-3 py-2.5 text-xs font-bold text-royal transition group-hover:bg-royal group-hover:text-white">Explore program <ArrowUpRight size={15} /></Link></div></div>
            </motion.article>
          ))}
        </div>
        {results.length === 0 && <p className="mt-8 rounded-2xl bg-mist p-8 text-center text-sm text-muted">No courses matched “{query}”. Try a different keyword or filter.</p>}
      </div>
    </section>
  );
}
