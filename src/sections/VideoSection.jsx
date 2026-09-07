import {motion} from 'framer-motion';
import {Play} from 'lucide-react';
import SectionHeading from '../components/common/SectionHeading';

export default function VideoSection() {
    return (
        <section
            id='video'
            className='section-fade flex min-h-[100svh] snap-start flex-col justify-center scroll-mt-24 py-[clamp(1.5rem,5vh,4rem)]'
        >
            <div className='page-shell'>
                <SectionHeading
                    eyebrow='How we work'
                    title='Built for the career you want next'
                    description='See how guided learning, mentorship, and interview practice work together to move your career forward.'
                />
                <div className='relative mx-auto mt-[clamp(1rem,4vh,2.5rem)] max-h-[55svh] w-full max-w-3xl rounded-[32px] bg-blue-mint p-3 shadow-soft sm:p-6'>
                    <motion.div
                        className='absolute -left-5 top-16 hidden h-16 w-16 rounded-full bg-royal/20 blur-xl md:block'
                        animate={{y: [0, 18, 0]}}
                        transition={{duration: 5, repeat: Infinity}}
                    />
                    <div className='relative aspect-video max-h-[50svh] overflow-hidden rounded-[24px] bg-slate-900 shadow-card'>
                        <iframe
                            className='h-full w-full'
                            src='https://www.youtube-nocookie.com/embed/5MgBikgcWnY?rel=0'
                            title='The Skill IT Education learning approach'
                            loading='lazy'
                            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                            allowFullScreen
                        />
                        <div className='pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between bg-gradient-to-b from-slate-950/45 to-transparent px-5 py-4 text-white sm:px-7'>
                            <span className='flex items-center gap-2 text-sm font-bold'>
                                <Play size={16} fill='currentColor' /> Skill IT
                                Education in 90 seconds
                            </span>
                            <span className='rounded-full bg-red-600 px-3 py-1.5 text-[10px] font-extrabold tracking-wider'>
                                YOUTUBE
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
