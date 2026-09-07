import {ArrowRight, CalendarDays} from 'lucide-react';
import {Link} from 'react-router-dom';
import Seo from '../components/common/Seo';
import {insights} from '../data/insights';

const dateFormatter = new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
});

export default function InsightsPage() {
    const posts = [...insights].sort(
        (a, b) => new Date(b.date) - new Date(a.date),
    );

    return (
        <main>
            <Seo
                title='Insights'
                description='Career advice, interview prep, and industry notes from Skill IT Education across Cyber Security, AI Engineer, Data Science, SOC Analyst, and Generative AI.'
                path='/insights'
            />
            <div className='page-shell pt-12 text-center sm:pt-16'>
                <span className='eyebrow'>Insights</span>
                <h1 className='mt-4 font-display text-5xl font-black tracking-tight text-ink sm:text-6xl'>
                    Career notes, updated regularly.
                </h1>
                <p className='mx-auto mt-4 max-w-2xl text-base leading-7 text-muted'>
                    Short, practical reads on interviews, hiring trends, and how
                    to build a portfolio that gets noticed.
                </p>
            </div>

            <section className='py-14 sm:py-20'>
                <div className='page-shell grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
                    {posts.map((post) => (
                        <Link
                            key={post.slug}
                            to={`/insights/${post.slug}`}
                            className='group flex flex-col rounded-[24px] border border-slate-100 bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-card'
                        >
                            <span className='eyebrow w-fit'>{post.tag}</span>
                            <h2 className='mt-4 font-display text-lg font-extrabold text-ink group-hover:text-royal'>
                                {post.title}
                            </h2>
                            <p className='mt-2 flex-1 text-sm leading-6 text-muted'>
                                {post.excerpt}
                            </p>
                            <div className='mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-bold text-slate-400'>
                                <span className='flex items-center gap-1.5'>
                                    <CalendarDays size={14} />{' '}
                                    {dateFormatter.format(new Date(post.date))}
                                </span>
                                <span className='flex items-center gap-1 text-royal'>
                                    Read <ArrowRight size={14} />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
}
