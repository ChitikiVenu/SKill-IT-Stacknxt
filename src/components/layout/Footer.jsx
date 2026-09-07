import {ArrowUp, ChevronDown, Mail, MapPin, Phone} from 'lucide-react';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import logoImg from '../../assets/images/logo.png';

const footerColumns = [
    {
        title: 'Company',
        links: [
            {label: 'About Us', to: '/about'},
            {label: 'Certification Partners', to: '/certifications'},
            {label: 'FAQs', to: '/#faq'},
            {label: 'Hiring', to: '#'},
            {label: 'Contact Us', to: '/contact'},
        ],
    },
    {
        title: 'Terms & Policies',
        links: [
            {label: 'General Terms & Conditions', to: '#'},
            {label: 'Pass Warranty Policy', to: '#'},
            {label: 'Rescheduling Policy', to: '#'},
            {label: 'Privacy Policy', to: '#'},
            {label: 'Refund Policy', to: '#'},
        ],
    },
    {
        title: 'Work With Us',
        links: [
            {label: 'Refer & Earn', to: '/refer-and-earn'},
            {label: 'Become a Partner', to: '#'},
            {label: 'Trainer Program', to: '#'},
            {label: 'Hiring Partners', to: '#'},
        ],
    },
    {
        title: 'Resources',
        links: [
            {label: 'Blog', to: '/insights'},
            {label: 'Webinars', to: '#'},
            {label: 'Interview Question Bank', to: '/mock-interviews'},
            {label: 'Course Brochures', to: '/brochures'},
            {label: 'Cyber Security Bootcamp', to: '/courses'},
        ],
    },
    {
        title: 'Popular Courses',
        links: [
            {label: 'Cyber Security Course', to: '/courses'},
            {label: 'AI Engineer Course', to: '/courses'},
            {label: 'Data Science Course', to: '/courses'},
            {label: 'SOC Analyst Course', to: '/courses'},
            {label: 'Generative AI Course', to: '/courses'},
        ],
    },
    {
        title: 'Popular Certifications',
        links: [
            {label: 'Cyber Security Certification', to: '/courses'},
            {label: 'AI Engineer Certification', to: '/courses'},
            {label: 'Data Science Certification', to: '/courses'},
            {label: 'SOC Analyst Certification', to: '/courses'},
            {label: 'Generative AI Certification', to: '/courses'},
        ],
    },
    {
        title: 'Offline Training Cities',
        links: [{label: 'Hyderabad (Madhapur)', to: '/courses'}],
    },
    {
        title: 'Popular Offline Courses',
        links: [
            {label: 'Cyber Security Classroom Training', to: '/courses'},
            {label: 'AI Engineer Classroom Training', to: '/courses'},
            {label: 'Data Science Classroom Training', to: '/courses'},
            {label: 'SOC Analyst Classroom Training', to: '/courses'},
        ],
    },
];

function FooterLink({label, to}) {
    const className = 'text-left transition hover:text-white';
    if (to === '#') {
        return (
            <span
                className='cursor-default text-left text-slate-500'
                title='Coming soon'
            >
                {label}{' '}
                <span className='text-[10px] uppercase tracking-wide'>
                    (soon)
                </span>
            </span>
        );
    }
    if (to.startsWith('/'))
        return (
            <Link to={to} className={className}>
                {label}
            </Link>
        );
    return (
        <a href={to} className={className}>
            {label}
        </a>
    );
}

export default function Footer() {
    // Link columns collapse into an accordion (one title row each) so this footer's height stays
    // bounded no matter how many link columns exist — expand only the one you want, on any screen.
    const [openColumn, setOpenColumn] = useState(null);

    return (
        <footer className='snap-start bg-ink pt-[clamp(1.5rem,5vh,3.5rem)] text-white'>
            <div className='page-shell'>
                <div className='flex flex-wrap items-start justify-between gap-6 border-b border-white/10 pb-[clamp(1rem,4vh,2.5rem)]'>
                    <div className='max-w-xs'>
                        <Link to='/' className='flex items-center gap-2.5'>
                            <img
                                src={logoImg}
                                alt='Skill IT Education Logo'
                                className='h-8 w-auto rounded-xl object-contain shadow-md'
                            />
                            <span className='font-display text-xl font-extrabold'>
                                Skill IT Education
                            </span>
                        </Link>
                        <p className='mt-4 text-sm leading-6 text-slate-300'>
                            Career-first technology education for learners ready
                            to build meaningful momentum.
                        </p>
                    </div>

                    <div>
                        <p className='text-xs font-bold uppercase tracking-wide text-slate-400'>
                            We accept
                        </p>
                        <div className='mt-3 flex flex-wrap gap-2'>
                            {['VISA', 'Mastercard'].map((method) => (
                                <span
                                    key={method}
                                    className='rounded-md border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-extrabold text-white'
                                >
                                    {method}
                                </span>
                            ))}
                        </div>
                        <p className='mt-2 text-xs text-slate-400'>
                            Online / Direct bank transfer
                        </p>

                        <p className='mt-5 text-xs font-bold uppercase tracking-wide text-slate-400'>
                            Connect with us
                        </p>
                        <div
                            className='mt-3 flex gap-3'
                            aria-label='Social media links'
                        >
                            <a
                                href='https://www.linkedin.com/company/skill-it-education'
                                target='_blank'
                                rel='noopener noreferrer'
                                aria-label='Skill IT Education on LinkedIn'
                                className='grid h-9 w-9 place-items-center rounded-full bg-white/10 text-xs font-extrabold transition hover:-translate-y-1 hover:bg-sky'
                            >
                                in
                            </a>
                            <a
                                href='https://www.instagram.com/skilliteducation/'
                                target='_blank'
                                rel='noopener noreferrer'
                                aria-label='Skill IT Education on Instagram'
                                className='grid h-9 w-9 place-items-center rounded-full bg-white/10 text-base font-bold transition hover:-translate-y-1 hover:bg-pink-500'
                            >
                                ◎
                            </a>
                            <a
                                href='https://www.youtube.com'
                                target='_blank'
                                rel='noopener noreferrer'
                                aria-label='Skill IT Education on YouTube'
                                className='grid h-9 w-9 place-items-center rounded-full bg-white/10 text-xs font-extrabold transition hover:-translate-y-1 hover:bg-red-500'
                            >
                                ▶
                            </a>
                        </div>
                    </div>

                    <div className='max-w-xs'>
                        <p className='flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-slate-400'>
                            <MapPin size={13} /> Visit our center
                        </p>
                        <p className='mt-3 text-sm leading-6 text-slate-300'>
                            LR Towers, No. 3-535, 3rd floor A section,
                            <br />
                            100 FeetRoad, Ayappa Society,
                            <br />
                            Madhapur, Hyderabad,
                            <br />
                            Telangana, India
                        </p>
                        <a
                            href='https://www.google.com/maps/search/?api=1&query=Madhapur+Hyderabad+Telangana'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='mt-3 hidden overflow-hidden rounded-2xl border border-white/10 transition hover:border-white/25 md:block'
                        >
                            <iframe
                                title='Skill IT Education office location — Madhapur, Hyderabad'
                                src='https://www.google.com/maps?q=Madhapur,+Hyderabad,+Telangana&output=embed'
                                width='100%'
                                height='90'
                                style={{
                                    border: 0,
                                    display: 'block',
                                    pointerEvents: 'none',
                                }}
                                loading='lazy'
                                referrerPolicy='no-referrer-when-downgrade'
                            />
                        </a>
                        <a
                            href='https://www.google.com/maps/search/?api=1&query=Madhapur+Hyderabad+Telangana'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-sky transition hover:text-white'
                        >
                            Get directions{' '}
                            <ArrowUp size={12} className='rotate-45' />
                        </a>
                    </div>
                </div>

                {/*
                 * Link columns collapse to one title row each — tap a title to expand it. With 8
                 * columns × ~5 links, showing everything open at once would make this footer far
                 * taller than a screen on every device; an accordion keeps its height fixed
                 * regardless of how many columns or links exist.
                 */}
                <div className='grid grid-cols-2 gap-x-6 divide-y divide-white/10 border-b border-white/10 sm:grid-cols-4 sm:divide-y-0'>
                    {footerColumns.map((column) => {
                        const isOpen = openColumn === column.title;
                        return (
                            <div key={column.title} className='col-span-2 border-t border-white/10 first:border-t-0 sm:col-span-1 sm:border-t-0'>
                                <button
                                    type='button'
                                    onClick={() => setOpenColumn(isOpen ? null : column.title)}
                                    aria-expanded={isOpen}
                                    className='flex w-full items-center justify-between gap-2 py-3.5 text-left font-bold'
                                >
                                    {column.title}
                                    <ChevronDown size={16} className={`shrink-0 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                                </button>
                                {isOpen && (
                                    <div className='flex flex-col items-start gap-2 pb-3.5 text-sm text-slate-300'>
                                        {column.links.map((link) => (
                                            <FooterLink key={link.label} {...link} />
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className='flex flex-col gap-4 py-7 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between'>
                    <div className='flex flex-wrap items-center gap-2 text-sm'>
                        <span className='font-bold text-white'>INDIA</span>
                        <a
                            href='tel:+919177715978'
                            className='flex items-center gap-1.5 transition hover:text-white'
                        >
                            <Phone size={14} /> +91 91777 15978
                        </a>
                        <span className='text-slate-600'>·</span>
                        <a
                            href='mailto:info@skilliteducation.com'
                            className='flex items-center gap-1.5 transition hover:text-white'
                        >
                            <Mail size={14} /> info@skilliteducation.com
                        </a>
                    </div>
                    <Link
                        to='/#home'
                        className='flex items-center gap-2 font-bold text-white transition hover:text-sky'
                    >
                        Back to top <ArrowUp size={15} />
                    </Link>
                </div>

                <div className='border-t border-white/10 py-4 text-center text-xs text-slate-500'>
                    © {new Date().getFullYear()} Skill IT Education. Built for
                    growing careers.
                </div>
            </div>
        </footer>
    );
}
