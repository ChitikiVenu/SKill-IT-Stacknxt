import {motion} from 'framer-motion';
import {BadgeCheck, ShieldCheck} from 'lucide-react';
import Seo from '../components/common/Seo';
import SectionHeading from '../components/common/SectionHeading';
import {accreditations} from '../data/content';

export default function CertificationsPage() {
    const recognitionCards = accreditations.filter(
        (item) => item.group === 'recognition',
    );
    const qualityCards = accreditations.filter(
        (item) => item.group === 'quality',
    );

    return (
        <main>
            <Seo
                title='Certification & Accreditation Partners'
                description="Skill IT Education's certification alignment and accreditation ecosystem across Cyber Security, AI Engineer, Data Science, SOC Analyst, and Generative AI programs."
                path='/certifications'
            />
            <div className='page-shell pt-12 text-center sm:pt-16'>
                <span className='eyebrow'>Certification ecosystem</span>
                <h1 className='mt-4 font-display text-5xl font-black tracking-tight text-ink sm:text-6xl'>
                    Certification & accreditation partners.
                </h1>
                <p className='mx-auto mt-4 max-w-2xl text-base leading-7 text-muted'>
                    Our curriculum is built and mapped against the certification
                    bodies and industry frameworks employers recognise.
                </p>
            </div>

            <section className='py-14 sm:py-20'>
                <div className='page-shell'>
                    <div className='rounded-[32px] border border-white bg-white/70 px-6 py-12 shadow-soft sm:px-10 lg:px-14 lg:py-16'>
                        <SectionHeading
                            eyebrow='Accreditations & alignment'
                            title='Recognised learning ecosystems, practical outcomes'
                            description='Skill IT Education brings together security-focused learning, technology certification awareness, and career-first program design.'
                        />

                        <div className='mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                            {recognitionCards.map((item, index) => (
                                <motion.article
                                    key={item.id}
                                    className='group overflow-hidden rounded-[24px] border border-slate-100 bg-white p-6 transition hover:-translate-y-1 hover:shadow-card'
                                    initial={{opacity: 0, y: 16}}
                                    whileInView={{opacity: 1, y: 0}}
                                    viewport={{once: true}}
                                    transition={{delay: index * 0.06}}
                                >
                                    <div
                                        className={`flex min-h-24 items-center rounded-2xl px-5 ${item.tone}`}
                                    >
                                        <div className='leading-none'>
                                            <p className='font-display text-2xl font-extrabold tracking-tight'>
                                                {item.logoText}
                                            </p>
                                            <p className='mt-2 whitespace-pre-line text-[10px] font-bold uppercase leading-4 tracking-[0.12em] opacity-75'>
                                                {item.logoDetail}
                                            </p>
                                        </div>
                                    </div>
                                    <h3 className='mt-5 font-display text-lg font-extrabold text-ink'>
                                        {item.name}
                                    </h3>
                                    <p className='mt-2 text-sm leading-6 text-muted'>
                                        {item.description}
                                    </p>
                                </motion.article>
                            ))}
                        </div>

                        <div className='mt-8 grid gap-4 sm:grid-cols-2'>
                            {qualityCards.map((item, index) => (
                                <motion.article
                                    key={item.id}
                                    className='flex gap-4 rounded-2xl border border-slate-100 bg-white p-5'
                                    initial={{
                                        opacity: 0,
                                        x: index === 0 ? -16 : 16,
                                    }}
                                    whileInView={{opacity: 1, x: 0}}
                                    viewport={{once: true}}
                                >
                                    <div
                                        className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-sm font-extrabold ${item.tone}`}
                                    >
                                        {item.mark}
                                    </div>
                                    <div>
                                        <h3 className='font-display text-base font-extrabold text-ink'>
                                            {item.name}
                                        </h3>
                                        <p className='mt-1 text-sm leading-6 text-muted'>
                                            {item.description}
                                        </p>
                                        <p className='mt-3 flex items-center gap-2 text-xs font-bold text-royal'>
                                            <BadgeCheck size={15} /> Skill IT
                                            quality marker
                                        </p>
                                    </div>
                                </motion.article>
                            ))}
                        </div>

                        <div className='mt-9 flex flex-col items-center gap-3 rounded-2xl bg-ink px-5 py-4 text-center text-sm text-white sm:flex-row sm:text-left'>
                            <ShieldCheck
                                size={18}
                                className='shrink-0 text-mint'
                            />
                            <span className='font-semibold'>
                                Confirmed certification partners. Official logo
                                artwork is being finalised for these cards.
                            </span>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
