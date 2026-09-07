import {motion} from 'framer-motion';
import {ArrowRight, Building2, GraduationCap, Star} from 'lucide-react';
import SectionHeading from '../components/common/SectionHeading';
import {alumni} from '../data/content';

export default function AlumniSection() {
    return (
        <section
            id='alumni'
            className='section-fade flex min-h-[100svh] snap-start flex-col justify-center scroll-mt-24 py-[clamp(1.5rem,5vh,4rem)]'
        >
            <div className='page-shell min-w-0'>
                <div className='flex flex-col items-center gap-4 text-center'>
                    <SectionHeading
                        eyebrow='Outcomes that matter'
                        title='Our alumni success stories'
                        description='People who came to build their skills and left with the confidence to build what is next.'
                    />
                    <div className='rounded-2xl bg-white px-5 py-3 text-center shadow-soft'>
                        <p className='font-display text-xl font-extrabold text-royal'>
                            1,200+
                        </p>
                        <p className='text-xs font-semibold text-slate-500'>
                            career transitions supported
                        </p>
                    </div>
                </div>

                {/* One alumni story per card, in a horizontal row: height never grows with the
                    number of alumni — swipe/drag sideways to see the rest instead of scrolling
                    the page. */}
                <div className='hide-scrollbar mt-[clamp(1rem,4vh,2.5rem)] flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2'>
                    {alumni.map((person, index) => (
                        <motion.article
                            key={person.name}
                            className='relative flex w-[280px] shrink-0 snap-start flex-col overflow-hidden rounded-[28px] bg-white p-5 shadow-soft sm:w-[320px]'
                            initial={{opacity: 0, y: 22}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: true, amount: 0.2}}
                            transition={{delay: index * 0.08}}
                        >
                            <div className='flex items-center gap-3'>
                                <img
                                    src={person.image}
                                    alt={`${person.name}, Skill IT Education alum`}
                                    loading='lazy'
                                    className='h-14 w-14 shrink-0 rounded-2xl object-cover'
                                />
                                <div className='min-w-0'>
                                    <h3 className='truncate font-display text-base font-extrabold text-ink'>
                                        {person.name}
                                    </h3>
                                    <p className='truncate text-xs font-semibold text-royal'>
                                        {person.role}
                                    </p>
                                    <p className='flex items-center gap-1 truncate text-[11px] text-slate-500'>
                                        <Building2 size={12} /> {person.company}
                                    </p>
                                </div>
                                <GraduationCap size={16} className='ml-auto shrink-0 text-royal' />
                            </div>
                            <div className='mt-3 flex text-amber-400'>
                                {Array.from({length: 5}).map((_, star) => (
                                    <Star key={star} size={13} fill='currentColor' />
                                ))}
                            </div>
                            <blockquote className='mt-2 line-clamp-4 flex-1 font-display text-sm font-bold leading-6 text-ink'>
                                “{person.quote}”
                            </blockquote>
                            <div className='mt-3 flex flex-wrap gap-1.5 border-t border-slate-100 pt-3'>
                                {person.courses.map((course) => (
                                    <span
                                        key={course}
                                        className='rounded-full bg-paleMint px-2.5 py-1 text-[9px] font-bold text-emerald-800'
                                    >
                                        {course}
                                    </span>
                                ))}
                            </div>
                        </motion.article>
                    ))}
                </div>
                <div className='mt-[clamp(0.75rem,2vh,1.5rem)] text-center'>
                    <button
                        onClick={() =>
                            document
                                .getElementById('courses')
                                ?.scrollIntoView({
                                    behavior: 'instant',
                                    block: 'start',
                                })
                        }
                        className='secondary-button'
                    >
                        Start your success story <ArrowRight size={16} />
                    </button>
                </div>
            </div>
        </section>
    );
}
