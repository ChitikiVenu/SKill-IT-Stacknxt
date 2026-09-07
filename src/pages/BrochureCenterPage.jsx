import {Download, FileText, LoaderCircle, Sparkles} from 'lucide-react';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import Seo from '../components/common/Seo';
import SectionHeading from '../components/common/SectionHeading';
import {useBrochureGate} from '../contexts/BrochureGateContext';
import {courseTracks} from '../data/coursesData';
import {
    downloadModuleBrochure,
    generateMasterBrochure,
} from '../lib/brochurePdf';

export default function BrochureCenterPage() {
    const [downloadingSlug, setDownloadingSlug] = useState('');
    const {requestDownload} = useBrochureGate();

    const downloadModule = (track) => {
        requestDownload(() => {
            setDownloadingSlug(track.slug);
            downloadModuleBrochure(track);
            setDownloadingSlug('');
        }, track.title);
    };

    const downloadMaster = () => {
        requestDownload(() => {
            setDownloadingSlug('master');
            generateMasterBrochure();
            setDownloadingSlug('');
        }, 'Master Brochure');
    };

    return (
        <main>
            <Seo
                title='Course Brochure Download Center'
                description='Download PDF brochures for Cyber Security, AI Engineer, Data Science, SOC Analyst, and Generative AI programmes, or the unified Skill IT Education master brochure.'
                path='/brochures'
            />
            <div className='page-shell pt-12 text-center sm:pt-16'>
                <span className='eyebrow'>
                    <FileText size={14} /> Brochure center
                </span>
                <h1 className='mt-4 font-display text-5xl font-black tracking-tight text-ink sm:text-6xl'>
                    Download a brochure, or explore it live.
                </h1>
                <p className='mx-auto mt-4 max-w-2xl text-base leading-7 text-muted'>
                    Every module brochure below is generated straight from our
                    current curriculum — duration, fees, highlights, capstone,
                    and FAQs.
                </p>
            </div>

            <section className='py-14 sm:py-20'>
                <div className='page-shell'>
                    <SectionHeading
                        eyebrow='Unified overview'
                        title='Master Brochure'
                        description='Platform overview, Hyderabad center details, payment plans, and a summary of all five programmes in one PDF.'
                    />
                    <div className='mt-6 flex flex-col items-start gap-5 rounded-[28px] bg-gradient-to-br from-ink via-slate-800 to-royal p-7 text-white sm:flex-row sm:items-center sm:justify-between sm:p-9'>
                        <div>
                            <span className='inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wide'>
                                <Sparkles size={12} /> All 5 programmes
                            </span>
                            <h3 className='mt-3 font-display text-2xl font-extrabold'>
                                Skill IT Education — Master Brochure
                            </h3>
                            <p className='mt-2 max-w-lg text-sm leading-6 text-white/80'>
                                Cyber Security, AI Engineer, Data Science, SOC
                                Analyst, and Generative AI — with our Hyderabad
                                Madhapur center details, delivery modes, and
                                payment plans.
                            </p>
                        </div>
                        <button
                            onClick={downloadMaster}
                            disabled={downloadingSlug === 'master'}
                            className='flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-extrabold text-ink transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70'
                        >
                            {downloadingSlug === 'master' ? (
                                <LoaderCircle
                                    size={17}
                                    className='animate-spin'
                                />
                            ) : (
                                <Download size={17} />
                            )}
                            Download Master Brochure
                        </button>
                    </div>
                </div>
            </section>

            <section className='pb-20 sm:pb-28'>
                <div className='page-shell'>
                    <SectionHeading
                        eyebrow='Module brochures'
                        title='Individual programme brochures'
                        description='Pick a track for its dedicated brochure — curriculum, highlights, capstone, and FAQs.'
                    />
                    <div className='mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3'>
                        {courseTracks.map((track) => (
                            <article
                                key={track.slug}
                                className='flex flex-col overflow-hidden rounded-[28px] border border-slate-100 bg-white shadow-soft'
                            >
                                <div className='relative h-32 overflow-hidden'>
                                    <img
                                        src={track.image}
                                        alt={`${track.title} brochure preview`}
                                        className='h-full w-full object-cover'
                                    />
                                    <span className='absolute left-5 top-5 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wide text-royal'>
                                        {track.category}
                                    </span>
                                </div>
                                <div className='flex flex-1 flex-col p-6'>
                                    <h3 className='font-display text-lg font-extrabold text-ink'>
                                        {track.title}
                                    </h3>
                                    <p className='mt-2 flex-1 text-sm leading-6 text-muted'>
                                        {track.tagline}
                                    </p>
                                    <p className='mt-3 text-xs font-bold text-slate-500'>
                                        {track.duration} · {track.hours} ·{' '}
                                        {track.level}
                                    </p>
                                    <div className='mt-5 flex flex-col gap-2'>
                                        <button
                                            onClick={() =>
                                                downloadModule(track)
                                            }
                                            disabled={
                                                downloadingSlug === track.slug
                                            }
                                            className='flex items-center justify-center gap-2 rounded-xl bg-royal px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70'
                                        >
                                            {downloadingSlug === track.slug ? (
                                                <LoaderCircle
                                                    size={16}
                                                    className='animate-spin'
                                                />
                                            ) : (
                                                <Download size={16} />
                                            )}
                                            Download PDF
                                        </button>
                                        <Link
                                            to='/courses'
                                            className='flex items-center justify-center gap-2 rounded-xl bg-mist px-4 py-2.5 text-sm font-bold text-royal transition hover:bg-blue-100'
                                        >
                                            View interactive brochure
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
