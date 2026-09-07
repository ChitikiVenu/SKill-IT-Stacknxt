import {motion} from 'framer-motion';
import {Award, CheckCircle2, ShieldCheck} from 'lucide-react';
import SectionHeading from '../components/common/SectionHeading';
import {certificates} from '../data/content';
import comptiaLogo from '../assets/images/comptia.png';
import ecCouncilLogo from '../assets/images/council.png';
import nasscomLogo from '../assets/images/nasscom.svg';

// Certification bodies shown on the sample credential mockups.
const certificationBodies = [
    {id: 'nasscom', name: 'NASSCOM', logo: nasscomLogo},
    {id: 'comptia', name: 'CompTIA', logo: comptiaLogo},
    {id: 'ec-council', name: 'EC-Council', logo: ecCouncilLogo},
];

export default function CertificatesSection() {
    return (
        <section id='certificates' className='flex min-h-[100svh] snap-start flex-col justify-center scroll-mt-24 py-[clamp(1.5rem,5vh,4rem)]'>
            <div className='page-shell min-w-0'>
                <div className='flex flex-col items-center gap-4 text-center'>
                    <SectionHeading
                        eyebrow='Proof of progress'
                        title='Turn every milestone into a credential'
                        description='Complete your program, demonstrate your work, and earn a verifiable Skill IT Education course certificate.'
                    />
                    <div className='hidden items-center gap-3 rounded-2xl bg-paleMint px-5 py-4 text-sm font-semibold text-emerald-900 sm:flex'>
                        <ShieldCheck size={21} className='text-mint' /> Designed
                        for your portfolio
                    </div>
                </div>

                {/* Horizontal row, not a grid: height stays fixed no matter how many certificate
                    samples exist — swipe/drag sideways instead of scrolling the page. */}
                <div className='hide-scrollbar mt-[clamp(1rem,4vh,2.5rem)] flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2'>
                    {certificates.map((certificate, index) => (
                        <motion.article
                            key={certificate.id}
                            className='group relative w-[260px] shrink-0 snap-start overflow-hidden rounded-[28px] border border-slate-100 bg-white p-3 shadow-soft sm:w-[300px]'
                            initial={{opacity: 0, y: 22}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: true, amount: 0.2}}
                            transition={{delay: index * 0.1}}
                            whileHover={{y: -7}}
                        >
                            <div className='relative overflow-hidden rounded-[20px] border border-slate-100 bg-[#FBFCFF] px-5 py-5 sm:px-6 sm:py-6'>
                                <div
                                    className={`absolute inset-x-0 top-0 h-2 bg-gradient-to-r ${certificate.accent}`}
                                />
                                <div className='flex items-start justify-between gap-4'>
                                    <div className='flex items-center gap-2 text-royal'>
                                        <span className='grid h-9 w-9 rotate-45 place-items-center rounded-[11px] bg-indigo-500'>
                                            <span className='h-3 w-3 rounded-sm bg-white' />
                                        </span>
                                        <span className='font-display text-sm font-extrabold'>
                                            Skill IT Education
                                        </span>
                                    </div>
                                    <Award
                                        size={25}
                                        className='text-amber-400'
                                    />
                                </div>
                                <p className='mt-4 text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-400'>
                                    {certificate.credential}
                                </p>
                                <h3 className='mt-2 font-display text-xl font-extrabold text-ink'>
                                    {certificate.recipient}
                                </h3>
                                <p className='mt-1.5 max-w-[15rem] text-xs leading-5 text-slate-600'>
                                    has successfully completed{' '}
                                    <strong className='font-bold text-ink'>
                                        {certificate.course}
                                    </strong>
                                    .
                                </p>
                                <div className='mt-4 flex items-end justify-between border-t border-slate-200 pt-3'>
                                    <span className='text-[10px] font-bold uppercase tracking-wider text-slate-400'>
                                        Credential ID
                                        <br />
                                        <span className='text-slate-600'>
                                            {certificate.code}
                                        </span>
                                    </span>
                                    <span className='grid h-10 w-10 place-items-center rounded-full border-4 border-mint/25 bg-paleMint text-mint'>
                                        <CheckCircle2 size={20} />
                                    </span>
                                </div>
                                <div className='mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 border-t border-slate-100 pt-3'>
                                    <span className='text-[9px] font-bold uppercase tracking-wider text-slate-400'>
                                        Accredited by
                                    </span>
                                    {certificationBodies.map((body) => (
                                        <img
                                            key={body.id}
                                            src={body.logo}
                                            alt={`${body.name} logo`}
                                            loading='lazy'
                                            className='h-4 w-auto object-contain grayscale'
                                        />
                                    ))}
                                </div>
                            </div>
                            <p className='px-2 pb-1 pt-3 text-center text-xs font-bold text-slate-500 transition group-hover:text-royal'>
                                Finish the program. Add the credential to your
                                story.
                            </p>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
