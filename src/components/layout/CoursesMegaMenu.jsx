import {motion} from 'framer-motion';
import {BrainCircuit, ChevronRight, Database, ShieldCheck, Sparkles} from 'lucide-react';
import {Link} from 'react-router-dom';
import {courseTracks} from '../../data/coursesData';

const categoryIcons = {
    Security: ShieldCheck,
    AI: BrainCircuit,
    Data: Database,
};

const panelVariants = {
    hidden: {opacity: 0, y: -8, scale: 0.98},
    visible: {opacity: 1, y: 0, scale: 1, transition: {duration: 0.18, ease: 'easeOut'}},
    exit: {opacity: 0, y: -8, scale: 0.98, transition: {duration: 0.12, ease: 'easeIn'}},
};

const itemVariants = {
    hidden: {opacity: 0, x: -8},
    visible: (index) => ({
        opacity: 1,
        x: 0,
        transition: {delay: index * 0.04, duration: 0.16},
    }),
};

export default function CoursesMegaMenu({onNavigate}) {
    return (
        // The pt-3 here (not mt-3 on the card) keeps the gap between the "Courses" link and the
        // panel part of this same hoverable element, so a diagonal mouse path across that gap
        // never actually exits the element and never fires the parent's onMouseLeave.
        <div className='absolute left-1/2 top-full z-50 w-[380px] -translate-x-1/2 pt-3'>
            <motion.div
                variants={panelVariants}
                initial='hidden'
                animate='visible'
                exit='exit'
                className='overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-2xl shadow-royal/10'
            >
                <div className='border-b border-slate-100 bg-mist px-5 py-4'>
                    <span className='eyebrow bg-white'>
                        <Sparkles size={13} /> Skill IT Education programs
                    </span>
                </div>

                <div className='space-y-1 p-3'>
                    {courseTracks.map((track, index) => {
                        const CategoryIcon = categoryIcons[track.category] ?? Sparkles;
                        return (
                            <motion.div key={track.slug} custom={index} variants={itemVariants} initial='hidden' animate='visible'>
                                <Link
                                    to={`/courses/${track.slug}`}
                                    onClick={onNavigate}
                                    className='group flex items-center gap-3 rounded-2xl p-3 transition hover:bg-mist'
                                >
                                    <span
                                        className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${track.tint} text-white shadow-md transition duration-200 group-hover:scale-105`}
                                    >
                                        <CategoryIcon size={20} />
                                    </span>
                                    <span className='min-w-0 flex-1'>
                                        <span className='truncate font-display text-sm font-extrabold text-ink transition group-hover:text-royal'>
                                            {track.title}
                                        </span>
                                        <span className='mt-0.5 block truncate text-[11px] font-semibold uppercase tracking-wide text-slate-400'>
                                            {track.category} · {track.duration} · {track.level}
                                        </span>
                                    </span>
                                    <ChevronRight
                                        size={16}
                                        className='shrink-0 text-slate-300 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-royal'
                                    />
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>

                <Link
                    to='/courses'
                    onClick={onNavigate}
                    className='flex items-center justify-center gap-1.5 border-t border-slate-100 bg-mist px-5 py-3.5 text-sm font-extrabold text-royal transition hover:bg-blue-100'
                >
                    Browse full course catalog <ChevronRight size={15} />
                </Link>
            </motion.div>
        </div>
    );
}
