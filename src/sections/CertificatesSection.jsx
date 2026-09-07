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
        <section id='certificates' className='scroll-mt-24 py-20 sm:py-28'>
            <div className='page-shell'>
                <div className='flex flex-col items-center gap-6 text-center'>
                    <SectionHeading
                        eyebrow='Proof of progress'
                        title='Turn every milestone into a credential'
                        description='Complete your program, demonstrate your work, and earn a verifiable Skill IT Education course certificate.'
                    />
                    <div className='flex items-center gap-3 rounded-2xl bg-paleMint px-5 py-4 text-sm font-semibold text-emerald-900'>
                        <ShieldCheck size={21} className='text-mint' /> Designed
                        for your portfolio
                    </div>
                </div>

                <div className='mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
                    {certificates.map((certificate, index) => (
                        <motion.article
                            key={certificate.id}
                            className='group relative overflow-hidden rounded-[28px] border border-slate-100 bg-white p-4 shadow-soft'
                            initial={{opacity: 0, y: 22}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: true, amount: 0.2}}
                            transition={{delay: index * 0.1}}
                            whileHover={{y: -7}}
                        >
                            <div className='relative overflow-hidden rounded-[20px] border border-slate-100 bg-[#FBFCFF] px-6 py-7 sm:px-8 sm:py-9'>
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
                                <p className='mt-10 text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-400'>
                                    {certificate.credential}
                                </p>
                                <h3 className='mt-3 font-display text-2xl font-extrabold text-ink'>
                                    {certificate.recipient}
                                </h3>
                                <p className='mt-2 max-w-[15rem] text-sm leading-6 text-slate-600'>
                                    has successfully completed{' '}
                                    <strong className='font-bold text-ink'>
                                        {certificate.course}
                                    </strong>
                                    .
                                </p>
                                <div className='mt-10 flex items-end justify-between border-t border-slate-200 pt-4'>
                                    <span className='text-[10px] font-bold uppercase tracking-wider text-slate-400'>
                                        Credential ID
                                        <br />
                                        <span className='text-slate-600'>
                                            {certificate.code}
                                        </span>
                                    </span>
                                    <span className='grid h-12 w-12 place-items-center rounded-full border-4 border-mint/25 bg-paleMint text-mint'>
                                        <CheckCircle2 size={24} />
                                    </span>
                                </div>
                                <div className='mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 border-t border-slate-100 pt-3'>
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
                            <p className='px-2 pb-2 pt-4 text-center text-xs font-bold text-slate-500 transition group-hover:text-royal'>
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
