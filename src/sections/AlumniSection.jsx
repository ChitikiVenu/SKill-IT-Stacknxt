import {motion} from 'framer-motion';
import {ArrowRight, Award, Building2, GraduationCap, Quote, Star} from 'lucide-react';
import SectionHeading from '../components/common/SectionHeading';
import {alumni} from '../data/content';

// One accent per card so the layered "sticker" shape behind each photo, and the placement
// badge on it, cycle through the brand palette instead of repeating the same colour six times.
const ACCENTS = [
    {shape: 'from-royal to-sky', badgeText: 'text-royal'},
    {shape: 'from-emerald-500 to-teal-400', badgeText: 'text-emerald-700'},
    {shape: 'from-amber-500 to-orange-400', badgeText: 'text-amber-700'},
    {shape: 'from-fuchsia-500 to-pink-400', badgeText: 'text-fuchsia-700'},
    {shape: 'from-indigo-500 to-purple-400', badgeText: 'text-indigo-700'},
    {shape: 'from-cyan-500 to-blue-400', badgeText: 'text-cyan-700'},
];

export default function AlumniSection() {
    return (
        <section
            id='alumni'
            className='section-fade relative flex min-h-[100svh] snap-start flex-col justify-center overflow-hidden scroll-mt-24 py-[clamp(1rem,3vh,2.5rem)]'
        >
            {/* Layered background decoration — soft, low-opacity shapes behind the cards, same
                idea as the hero's rings/blobs, so this section reads as designed rather than a
                plain list on a flat background. */}
            <div className='pointer-events-none absolute -left-24 top-10 -z-10 h-72 w-72 rounded-full bg-blue-100/60 blur-3xl' />
            <div className='pointer-events-none absolute -right-16 bottom-0 -z-10 h-80 w-80 rounded-full bg-amber-100/50 blur-3xl' />
            <div className='pointer-events-none absolute right-1/3 top-0 -z-10 h-56 w-56 rounded-full border border-royal/10' />

            <div className='page-shell min-w-0'>
                <div className='flex flex-col items-center gap-3 text-center'>
                    <SectionHeading
                        eyebrow='Outcomes that matter'
                        title='Our alumni success stories'
                        description='Real learners, real placements — people who came to build their skills and left with the confidence to build what is next.'
                    />
                    <div className='flex items-center gap-2.5 rounded-full bg-white px-5 py-3 text-center shadow-soft'>
                        <span className='grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-royal to-sky text-white'>
                            <Award size={16} />
                        </span>
                        <span className='text-left'>
                            <p className='font-display text-xl font-extrabold leading-none text-royal'>1,200+</p>
                            <p className='text-xs font-semibold text-slate-500'>career transitions supported</p>
                        </span>
                    </div>
                </div>

                {/* One alumni story per card, in a horizontal row: height never grows with the
                    number of alumni — swipe/drag sideways to see the rest instead of scrolling
                    the page. Extra top/bottom padding here gives the offset "sticker" shape
                    behind each card room to peek out without being clipped by the scroll mask. */}
                <div className='hide-scrollbar mt-[clamp(0.75rem,2.5vh,1.75rem)] flex snap-x snap-mandatory gap-6 overflow-x-auto px-1 pb-4 pt-2'>
                    {alumni.map((person, index) => {
                        const accent = ACCENTS[index % ACCENTS.length];
                        return (
                            <motion.div
                                key={person.name}
                                className='relative w-[300px] shrink-0 snap-start sm:w-[340px]'
                                initial={{opacity: 0, y: 22}}
                                whileInView={{opacity: 1, y: 0}}
                                viewport={{once: true, amount: 0.2}}
                                transition={{delay: index * 0.08}}
                            >
                                {/* The offset gradient shape behind the card — the "layered" look:
                                    a second, rotated card peeking out from behind the real one. */}
                                <div
                                    className={`absolute inset-0 -z-10 rotate-2 rounded-[32px] bg-gradient-to-br ${accent.shape} opacity-90`}
                                    aria-hidden='true'
                                />
                                <article className='relative flex -rotate-1 flex-col overflow-hidden rounded-[32px] bg-white shadow-xl transition duration-300 hover:rotate-0'>
                                    <div className='relative aspect-[16/10] w-full overflow-hidden'>
                                        <img
                                            src={person.image}
                                            alt={`${person.name}, Skill IT Education alum, now ${person.role} at ${person.company}`}
                                            loading='lazy'
                                            className='h-full w-full object-cover'
                                        />
                                        <div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent' />
                                        <div className='absolute left-4 top-4 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-slate-700 backdrop-blur'>
                                            <GraduationCap size={12} className={accent.badgeText} /> Alumnus
                                        </div>
                                        <div className='absolute inset-x-4 bottom-4'>
                                            <h3 className='truncate font-display text-lg font-extrabold text-white drop-shadow'>{person.name}</h3>
                                            <p className='truncate text-xs font-semibold text-white/85'>{person.role}</p>
                                        </div>
                                    </div>

                                    {/* Placement badge, floating on the seam between photo and card body —
                                        the classic layered/overlapping element from a template design. */}
                                    <div className='relative z-10 -mt-4 flex justify-center'>
                                        <span className='flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-[11px] font-bold text-slate-600 shadow-md'>
                                            <Building2 size={12} className={accent.badgeText} /> Placed at {person.company}
                                        </span>
                                    </div>

                                    <div className='flex flex-1 flex-col p-4 pt-2'>
                                        <div className='flex text-amber-400'>
                                            {Array.from({length: 5}).map((_, star) => (
                                                <Star key={star} size={13} fill='currentColor' />
                                            ))}
                                        </div>
                                        <div className='relative mt-1.5 flex-1'>
                                            <Quote size={34} className='absolute -left-1 -top-1 -z-0 text-slate-100' fill='currentColor' />
                                            <blockquote className='relative line-clamp-3 font-display text-sm font-bold leading-6 text-ink'>
                                                {person.quote}
                                            </blockquote>
                                        </div>
                                        <div className='mt-2.5 flex flex-wrap gap-1.5 border-t border-slate-100 pt-2.5'>
                                            {person.courses.map((course) => (
                                                <span
                                                    key={course}
                                                    className='rounded-full bg-paleMint px-2.5 py-1 text-[9px] font-bold text-emerald-800'
                                                >
                                                    {course}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </article>
                            </motion.div>
                        );
                    })}
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
