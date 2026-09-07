import { ArrowLeft, CalendarDays } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import Seo from '../components/common/Seo';
import NotFoundPage from './NotFoundPage';
import { insights } from '../data/insights';

const dateFormatter = new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

export default function InsightPostPage() {
  const { slug } = useParams();
  const post = insights.find((item) => item.slug === slug);

  if (!post) return <NotFoundPage />;

  return (
    <main>
      <Seo title={post.title} description={post.excerpt} path={`/insights/${post.slug}`} />
      <article className="page-shell max-w-3xl pt-12 sm:pt-16">
        <Link to="/insights" className="inline-flex items-center gap-1.5 text-sm font-bold text-royal transition hover:text-[#1E56D6]"><ArrowLeft size={16} /> All insights</Link>
        <span className="eyebrow mt-6 w-fit">{post.tag}</span>
        <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{post.title}</h1>
        <p className="mt-3 flex items-center gap-1.5 text-xs font-bold text-slate-400"><CalendarDays size={14} /> {dateFormatter.format(new Date(post.date))}</p>

        <div className="mt-8 space-y-5 pb-20 text-base leading-7 text-slate-700">
          {post.body.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        </div>
      </article>
    </main>
  );
}
