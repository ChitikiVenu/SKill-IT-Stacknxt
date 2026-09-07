import {ArrowRight, Building2, CheckCircle2} from 'lucide-react';
import {Link} from 'react-router-dom';
import Seo from '../components/common/Seo';
import {features} from '../data/content';

const centers = [
    {
        name: 'Madhapur',
        description:
            'Our Madhapur classroom center, in the heart of the Madhapur IT corridor.',
    },
];

export default function AboutPage() {
    return (
        <main>
            <Seo
                title='About Us'
                description='Skill IT Education is a Hyderabad-based EdTech platform offering job-ready Cyber Security, AI Engineer, Data Science, SOC Analyst, and Generative AI programmes with live mentorship, hands-on labs, and dedicated placement support.'
                path='/about'
            />
            <div className='page-shell pt-12 text-center sm:pt-16'>
                <span className='eyebrow'>About Us</span>
                <h1 className='mt-4 font-display text-5xl font-black tracking-tight text-ink sm:text-6xl'>
                    Skill IT Education
                </h1>
                <p className='mx-auto mt-4 max-w-2xl text-base leading-7 text-muted'>
                    Skill IT Education is a Hyderabad-based EdTech platform
                    offering job-ready Cyber Security, AI Engineer, Data
                    Science, SOC Analyst, and Generative AI programmes with live
                    mentorship, hands-on labs, and dedicated placement support.
                </p>
            </div>

            <section className='scroll-mt-24 py-14 sm:py-20'>
                <div className='page-shell'>
                    <div className='relative isolate overflow-hidden rounded-[36px] bg-gradient-to-br from-blue-600 via-sky-400 to-emerald-300 px-6 py-10 shadow-soft sm:px-10 sm:py-14 lg:px-16 lg:py-16'>
                        <div
                            className='pointer-events-none absolute inset-0 z-0 opacity-20'
                            style={{
                                backgroundImage:
                                    'radial-gradient(circle at 85% 15%, white 0 1px, transparent 1.5px)',
                                backgroundSize: '22px 22px',
                            }}
                        />

                        <div className='relative z-10 mx-auto max-w-3xl text-center'>
                            <span className='eyebrow bg-white/15 text-white'>
                                Why Skill IT Education
                            </span>
                            <h2 className='mt-5 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl'>
                                Built Different, Designed to Last.
                            </h2>
                            <p className='mx-auto mt-4 max-w-2xl text-base leading-7 text-white/85'>
                                Modern skill-building with real technical depth,
                                sustained mentor access, and the practice to
                                perform when it matters.
                            </p>
                        </div>

                        <div className='relative z-10 mt-9 grid grid-cols-1 gap-6 md:grid-cols-2'>
                            {features.map((feature, index) => (
                                <article
                                    key={feature.title}
                                    className='feature-card relative'
                                    style={{
                                        '--float-delay': `${index * -1.35}s`,
                                    }}
                                >
                                    <div className='feature-card__surface flex h-full gap-3 rounded-[24px] bg-white p-5 shadow-card lg:p-6'>
                                        <span className='mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-paleMint text-mint'>
                                            <CheckCircle2 size={18} />
                                        </span>
                                        <div>
                                            <h3 className='font-display text-lg font-extrabold text-ink'>
                                                {feature.title}
                                            </h3>
                                            <p className='mt-1 text-sm leading-5 text-slate-600'>
                                                {feature.body}
                                            </p>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                    <div className='mt-8 flex flex-wrap justify-center gap-3'>
                        <Link to='/courses' className='primary-button'>
                            Explore courses now <ArrowRight size={17} />
                        </Link>
                    </div>
                </div>
            </section>

            <section className='py-4 sm:py-8'>
                <div className='page-shell'>
                    <div className='rounded-[28px] border border-slate-100 bg-white p-6 shadow-soft sm:p-8'>
                        <p className='text-xs font-bold uppercase tracking-wide text-slate-400'>
                            Offline center in Hyderabad
                        </p>
                        <div className='mt-4 space-y-3'>
                            {centers.map((center) => (
                                <div
                                    key={center.name}
                                    className='flex gap-3 rounded-2xl border border-slate-100 bg-mist p-4'
                                >
                                    <span className='grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-royal shadow-sm'>
                                        <Building2 size={18} />
                                    </span>
                                    <div>
                                        <h3 className='font-display text-sm font-extrabold text-ink'>
                                            {center.name}, Hyderabad
                                        </h3>
                                        <p className='mt-1 text-xs leading-5 text-muted'>
                                            {center.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className='mt-4 text-xs text-slate-400'>
                            Exact directions are shared with you once you enroll
                            or book a center visit.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
