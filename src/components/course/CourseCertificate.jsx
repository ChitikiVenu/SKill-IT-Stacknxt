import {motion} from 'framer-motion';
import {Award, CheckCircle2, ShieldCheck} from 'lucide-react';
import {Link} from 'react-router-dom';
import {getAccreditationBullets} from '../../data/coursesData';

// Sample-credential mockup, scoped to a single course. Mirrors the card
// design used sitewide in sections/CertificatesSection.jsx, so a learner
// who has already seen the generic version recognises this as the same
// certificate — just theirs, for the course they're looking at.
export default function CourseCertificate({track}) {
    const accreditationLine = getAccreditationBullets(track)[0];

    return (
        <section>
            <span className='eyebrow'>
                <Award size={13} /> Proof of progress
            </span>
            <h2 className='mt-4 font-display text-3xl font-black text-ink sm:text-4xl'>
                Earn a {track.title} credential you can show
            </h2>
            <p className='mt-3 max-w-2xl text-base leading-7 text-muted'>
                Finish the {track.title} program and add this credential to
                your story — a verifiable Skill IT Education certificate,
                built for your portfolio and your next interview.
            </p>

            <div className='mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center'>
                <motion.div
                    className='relative overflow-hidden rounded-[28px] border border-slate-100 bg-[#FBFCFF] px-6 py-8 shadow-lift sm:px-10 sm:py-10'
                    initial={{opacity: 0, y: 20}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true, amount: 0.25}}
                    whileHover={{y: -6}}
                >
                    <div className={`absolute inset-x-0 top-0 h-2 bg-gradient-to-r ${track.tint}`} />
                    <div className='flex items-start justify-between gap-4'>
                        <div className='flex items-center gap-2 text-royal'>
                            <span className='grid h-9 w-9 rotate-45 place-items-center rounded-[11px] bg-indigo-500'>
                                <span className='h-3 w-3 rounded-sm bg-white' />
                            </span>
                            <span className='font-display text-sm font-extrabold'>Skill IT Education</span>
                        </div>
                        <Award size={26} className='text-amber-400' />
                    </div>
                    <p className='mt-8 text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-400'>
                        Course Completion Certificate
                    </p>
                    <h3 className='mt-3 font-display text-2xl font-extrabold text-ink sm:text-3xl'>Your Name Here</h3>
                    <p className='mt-2 max-w-sm text-sm leading-6 text-slate-600'>
                        has successfully completed{' '}
                        <strong className='font-bold text-ink'>{track.title}</strong>.
                    </p>
                    <div className='mt-8 flex flex-wrap items-end justify-between gap-4 border-t border-slate-200 pt-4'>
                        <span className='text-[10px] font-bold uppercase tracking-wider text-slate-400'>
                            Credential ID
                            <br />
                            <span className='text-slate-600'>SKILLIT-{track.slug.toUpperCase()}</span>
                        </span>
                        <span className='grid h-12 w-12 place-items-center rounded-full border-4 border-mint/25 bg-paleMint text-mint'>
                            <CheckCircle2 size={24} />
                        </span>
                    </div>
                    <p className='mt-4 border-t border-slate-100 pt-3 text-[11px] font-bold text-slate-500'>
                        {accreditationLine}
                    </p>
                </motion.div>

                <motion.div
                    className='space-y-4'
                    initial={{opacity: 0, y: 20}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true, amount: 0.25}}
                    transition={{delay: 0.1}}
                >
                    {getAccreditationBullets(track).map((bullet) => (
                        <div key={bullet} className='flex items-start gap-3 rounded-2xl bg-mist p-4'>
                            <ShieldCheck size={18} className='mt-0.5 shrink-0 text-royal' />
                            <p className='text-sm font-semibold leading-6 text-slate-700'>{bullet}</p>
                        </div>
                    ))}
                    <Link
                        to='/certifications'
                        className='inline-flex items-center gap-1.5 text-sm font-extrabold text-royal hover:underline'
                    >
                        See our full accreditation ecosystem →
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
