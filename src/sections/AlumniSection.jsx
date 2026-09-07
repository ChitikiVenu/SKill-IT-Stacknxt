import {motion} from 'framer-motion';
import {ArrowRight, Building2, GraduationCap, Quote, Star} from 'lucide-react';
import SectionHeading from '../components/common/SectionHeading';
import {alumni} from '../data/content';

export default function AlumniSection() {
    return (
        <section
            id='alumni'
            className='section-fade scroll-mt-24 py-20 sm:py-28'
        >
            <div className='page-shell'>
                <div className='flex flex-col items-center gap-6 text-center'>
                    <SectionHeading
                        eyebrow='Outcomes that matter'
                        title='Our alumni success stories'
                        description='People who came to build their skills and left with the confidence to build what is next.'
                    />
                    <div className='rounded-2xl bg-white px-5 py-4 text-center shadow-soft'>
                        <p className='font-display text-2xl font-extrabold text-royal'>
                            1,200+
                        </p>
                        <p className='text-xs font-semibold text-slate-500'>
                            career transitions supported
                        </p>
                    </div>
                </div>
                <div className='relative mt-12 space-y-8 before:absolute before:bottom-10 before:left-1/2 before:top-10 before:hidden before:w-px before:-translate-x-1/2 before:bg-gradient-to-b before:from-royal before:to-mint lg:block'>
                    {alumni.map((person, index) => {
                        const reverse = index % 2 === 1;
                        return (
                            <motion.article
                                key={person.name}
                                className={`relative grid items-center gap-7 lg:grid-cols-2 lg:gap-20 ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}
                                initial={{opacity: 0, y: 28}}
                                whileInView={{opacity: 1, y: 0}}
                                viewport={{once: true, amount: 0.25}}
                                transition={{duration: 0.45}}
                            >
                                <div
                                    className={`relative ${reverse ? 'lg:pl-12' : 'lg:pr-12'}`}
                                >
                                    <div className='overflow-hidden rounded-[28px] shadow-card'>
                                        <img
                                            src={person.image}
                                            alt={`${person.name}, Skill IT Education alum`}
                                            loading='lazy'
                                            className='h-64 w-full object-cover sm:h-80'
                                        />
                                    </div>
                                    <span
                                        className={`absolute -bottom-4 ${reverse ? 'left-4' : 'right-4'} flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-royal shadow-card`}
                                    >
                                        <GraduationCap size={15} /> Skill IT
                                        Education alum
                                    </span>
                                </div>
                                <div
                                    className={`relative rounded-[28px] bg-white p-6 shadow-soft sm:p-8 ${reverse ? 'lg:pr-12' : 'lg:pl-12'}`}
                                >
                                    <span className='absolute -top-3 left-7 grid h-8 w-8 place-items-center rounded-full bg-royal text-white shadow-lg lg:left-auto lg:right-1/2 lg:translate-x-1/2'>
                                        <span className='hidden lg:block'>
                                            {index + 1}
                                        </span>
                                        <span className='lg:hidden'>
                                            <Quote size={14} />
                                        </span>
                                    </span>
                                    <div className='flex text-amber-400'>
                                        {Array.from({length: 5}).map(
                                            (_, star) => (
                                                <Star
                                                    key={star}
                                                    size={15}
                                                    fill='currentColor'
                                                />
                                            ),
                                        )}
                                    </div>
                                    <blockquote className='mt-4 font-display text-xl font-bold leading-8 text-ink'>
                                        “{person.quote}”
                                    </blockquote>
                                    <div className='mt-6 border-t border-slate-100 pt-5'>
                                        <h3 className='font-display text-lg font-extrabold text-ink'>
                                            {person.name}
                                        </h3>
                                        <p className='mt-0.5 text-sm font-semibold text-royal'>
                                            {person.role}
                                        </p>
                                        <p className='mt-1 flex items-center gap-1.5 text-xs text-slate-500'>
                                            <Building2 size={13} />{' '}
                                            {person.company}
                                        </p>
                                        <div className='mt-4 flex flex-wrap gap-2'>
                                            {person.courses.map((course) => (
                                                <span
                                                    key={course}
                                                    className='rounded-full bg-paleMint px-3 py-1.5 text-[10px] font-bold text-emerald-800'
                                                >
                                                    {course}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.article>
                        );
                    })}
                </div>
                <div className='mt-14 text-center'>
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
