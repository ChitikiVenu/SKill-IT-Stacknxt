import { Building2, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { companyQuestions } from '../../data/companyQuestions';
import { courseTracks } from '../../data/coursesData';

const difficultyTone = {
  beginner: 'bg-emerald-50 text-emerald-700',
  intermediate: 'bg-amber-50 text-amber-700',
  advanced: 'bg-rose-50 text-rose-700',
};

export default function CompanyQuestionBank() {
  const [query, setQuery] = useState('');
  const [trackFilter, setTrackFilter] = useState('all');

  const results = useMemo(
    () =>
      companyQuestions.filter((item) => {
        const matchesTrack = trackFilter === 'all' || item.track === trackFilter;
        const matchesQuery = `${item.company} ${item.question}`.toLowerCase().includes(query.toLowerCase());
        return matchesTrack && matchesQuery;
      }),
    [query, trackFilter],
  );

  return (
    <div>
      <label className="relative block"><Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search company or keyword" className="w-full rounded-2xl border border-slate-100 bg-white py-3.5 pl-11 pr-4 text-sm shadow-sm outline-none ring-1 ring-transparent transition focus:ring-royal" /></label>

      <div className="hide-scrollbar mt-4 flex gap-2 overflow-x-auto pb-1">
        <button onClick={() => setTrackFilter('all')} className={`shrink-0 rounded-full border px-4 py-2 text-xs font-bold transition ${trackFilter === 'all' ? 'border-royal bg-royal text-white' : 'border-blue-100 bg-white text-royal hover:border-royal'}`}>All tracks</button>
        {courseTracks.map((track) => (
          <button key={track.slug} onClick={() => setTrackFilter(track.slug)} className={`shrink-0 rounded-full border px-4 py-2 text-xs font-bold transition ${trackFilter === track.slug ? 'border-royal bg-royal text-white' : 'border-blue-100 bg-white text-royal hover:border-royal'}`}>{track.title}</button>
        ))}
      </div>

      <div className="mt-5 space-y-3">
        {results.map((item) => {
          const track = courseTracks.find((t) => t.slug === item.track);
          return (
            <article key={item.id} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="flex items-center gap-2 text-sm font-extrabold text-ink"><Building2 size={16} className="text-royal" /> {item.company}</span>
                <div className="flex items-center gap-2">
                  {track && <span className="rounded-full bg-mist px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-royal">{track.title}</span>}
                  <span className={`rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide ${difficultyTone[item.difficulty]}`}>{item.difficulty}</span>
                </div>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-700">{item.question}</p>
            </article>
          );
        })}
        {results.length === 0 && <p className="rounded-2xl bg-mist p-6 text-center text-sm text-muted">No questions matched “{query}”. Try a different keyword or track.</p>}
      </div>
    </div>
  );
}
