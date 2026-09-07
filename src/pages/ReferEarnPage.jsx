import {motion} from 'framer-motion';
import {AlertCircle, CheckCircle2, Gift, LoaderCircle, Mail, MapPin, Send, ShieldCheck, UserRound, Users} from 'lucide-react';
import {useState} from 'react';
import Seo from '../components/common/Seo';
import {courseTracks} from '../data/coursesData';
import {createLead} from '../lib/leads';
import {isValidEmail, isValidName, isValidPhone, sanitizeText} from '../lib/validation';

const inputClass =
    'mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-ink placeholder:text-slate-400 transition focus:border-royal focus:bg-white focus:outline-none focus:ring-4 focus:ring-sky/20';

const steps = [
    {
        title: 'Share their details',
        body: 'Tell us who you think would love a career switch into tech — takes under a minute.',
        icon: Users,
    },
    {
        title: 'We take it from there',
        body: 'Our admissions team reaches out with the right program, pricing, and next steps.',
        icon: ShieldCheck,
    },
    {
        title: 'You both win',
        body: 'When your referral enrolls, you get rewarded and they get a head start on a new career.',
        icon: Gift,
    },
];

export default function ReferEarnPage() {
    const [referrerName, setReferrerName] = useState('');
    const [referrerEmail, setReferrerEmail] = useState('');
    const [referrerPhone, setReferrerPhone] = useState('');
    const [friendName, setFriendName] = useState('');
    const [friendEmail, setFriendEmail] = useState('');
    const [friendPhone, setFriendPhone] = useState('');
    const [course, setCourse] = useState(courseTracks[0]?.title ?? '');
    const [location, setLocation] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [sent, setSent] = useState(false);

    const submit = async (event) => {
        event.preventDefault();
        if (!isValidName(referrerName)) {
            setError('Enter your full name using letters only (2-80 characters).');
            return;
        }
        if (!isValidEmail(referrerEmail)) {
            setError('Enter a valid email address for yourself.');
            return;
        }
        if (!isValidPhone(referrerPhone)) {
            setError('Enter a valid 10-digit phone number for yourself.');
            return;
        }
        if (!isValidName(friendName)) {
            setError("Enter your friend's full name using letters only (2-80 characters).");
            return;
        }
        if (!isValidPhone(friendPhone)) {
            setError("Enter a valid 10-digit phone number for your friend.");
            return;
        }
        setLoading(true);
        setError('');
        try {
            const referralNote = [
                `Refer & Earn — referred by ${sanitizeText(referrerName)} (${referrerPhone})`,
                `Friend: ${sanitizeText(friendName)}, +91${friendPhone}${friendEmail ? `, ${sanitizeText(friendEmail)}` : ''}`,
                `Interested in: ${course}`,
                location ? `Location: ${sanitizeText(location)}` : null,
            ]
                .filter(Boolean)
                .join(' | ');
            const {error: leadError} = await createLead({
                fullName: sanitizeText(referrerName),
                email: sanitizeText(referrerEmail),
                phoneNumber: `+91${referrerPhone}`,
                courseInterest: referralNote,
            });
            if (leadError) throw leadError;
            setSent(true);
        } catch (err) {
            console.error('Unable to save referral:', err);
            setError('We could not save your referral right now. Please try again, or reach out on WhatsApp.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main>
            <Seo
                title='Refer & Earn'
                description='Refer a friend to Skill IT Education and help them start a career in Cyber Security, AI, Data Science, or SOC — while you earn rewards for every successful referral.'
                path='/refer-and-earn'
            />

            <div className='bg-blue-mint px-5 pb-16 pt-32 text-white sm:px-8 sm:pt-40'>
                <motion.div
                    className='page-shell text-center'
                    initial={{opacity: 0, y: 18}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.45, ease: 'easeOut'}}
                >
                    <span className='inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.14em]'>
                        <Gift size={14} /> Refer & Earn
                    </span>
                    <h1 className='mx-auto mt-5 max-w-3xl font-display text-4xl font-black leading-tight sm:text-6xl'>
                        Know someone ready for a fresh start? Send them our way.
                    </h1>
                    <p className='mx-auto mt-4 max-w-xl text-base leading-7 text-white/90 sm:text-lg'>
                        Know someone ready for a career switch into Cyber Security, AI, or Data? Refer them below —
                        when they enroll, you earn rewards too.
                    </p>
                </motion.div>
            </div>

            <div className='page-shell -mt-10 pb-20'>
                <div className='grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-start'>
                    <motion.div
                        className='space-y-4'
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.1, duration: 0.4}}
                    >
                        <div className='rounded-[28px] border border-slate-100 bg-white p-6 shadow-lift sm:p-8'>
                            <span className='eyebrow'>How it works</span>
                            <div className='mt-5 space-y-5'>
                                {steps.map(({title, body, icon: Icon}, index) => (
                                    <div key={title} className='flex gap-4'>
                                        <span className='grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-mist text-royal'>
                                            <Icon size={20} />
                                        </span>
                                        <div>
                                            <p className='font-display text-base font-extrabold text-ink'>
                                                {index + 1}. {title}
                                            </p>
                                            <p className='mt-1 text-sm leading-6 text-muted'>{body}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className='rounded-[28px] bg-ink p-6 text-white sm:p-8'>
                            <p className='flex items-center gap-2 text-xs font-extrabold uppercase tracking-wide text-sky'>
                                <MapPin size={14} /> Rewards
                            </p>
                            <p className='mt-2 text-sm leading-6 text-slate-200'>
                                Every successful referral earns you a reward once your friend enrolls — our
                                admissions team will confirm the details when they reach out.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        className='rounded-[28px] border border-slate-100 bg-white p-6 shadow-lift sm:p-8'
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.18, duration: 0.4}}
                    >
                        {sent ? (
                            <div className='py-6 text-center'>
                                <div className='mx-auto grid h-14 w-14 place-items-center rounded-full bg-paleMint text-emerald-700'>
                                    <CheckCircle2 size={28} />
                                </div>
                                <h2 className='mt-4 font-display text-2xl font-extrabold text-ink'>
                                    Thanks for the referral!
                                </h2>
                                <p className='mt-2 text-sm leading-6 text-muted'>
                                    Our admissions team will reach out to {friendName || 'your friend'} shortly.
                                    We&apos;ll be in touch about your reward too.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={submit} className='space-y-6'>
                                <div>
                                    <h2 className='font-display text-xl font-extrabold text-ink'>Your details</h2>
                                    <div className='mt-4 grid gap-4 sm:grid-cols-2'>
                                        <label className='block text-sm font-bold text-slate-700 sm:col-span-2'>
                                            Your name
                                            <div className='relative'>
                                                <UserRound size={16} className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400' />
                                                <input value={referrerName} onChange={(event) => setReferrerName(event.target.value)} required placeholder='Your full name' className={`${inputClass} pl-10`} />
                                            </div>
                                        </label>
                                        <label className='block text-sm font-bold text-slate-700'>
                                            Your email
                                            <div className='relative'>
                                                <Mail size={16} className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400' />
                                                <input value={referrerEmail} onChange={(event) => setReferrerEmail(event.target.value)} type='email' required placeholder='you@example.com' className={`${inputClass} pl-10`} />
                                            </div>
                                        </label>
                                        <label className='block text-sm font-bold text-slate-700'>
                                            Your phone
                                            <div className='mt-1.5 flex overflow-hidden rounded-xl border border-slate-200 bg-slate-50 transition focus-within:border-royal focus-within:bg-white focus-within:ring-4 focus-within:ring-sky/20'>
                                                <span className='flex shrink-0 items-center gap-1 border-r border-slate-200 px-3 text-sm font-bold text-slate-600'>IN +91</span>
                                                <input
                                                    value={referrerPhone}
                                                    onChange={(event) => setReferrerPhone(event.target.value.replace(/\D/g, '').slice(0, 10))}
                                                    type='tel'
                                                    inputMode='numeric'
                                                    required
                                                    minLength={10}
                                                    maxLength={10}
                                                    placeholder='98765 43210'
                                                    className='w-full bg-transparent px-3 py-3 text-sm text-ink placeholder:text-slate-400 outline-none'
                                                />
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                <div className='border-t border-slate-100 pt-6'>
                                    <h2 className='font-display text-xl font-extrabold text-ink'>Referral details</h2>
                                    <div className='mt-4 grid gap-4 sm:grid-cols-2'>
                                        <label className='block text-sm font-bold text-slate-700'>
                                            Friend&apos;s name
                                            <input value={friendName} onChange={(event) => setFriendName(event.target.value)} required placeholder="Friend's full name" className={inputClass} />
                                        </label>
                                        <label className='block text-sm font-bold text-slate-700'>
                                            Friend&apos;s email (optional)
                                            <input value={friendEmail} onChange={(event) => setFriendEmail(event.target.value)} type='email' placeholder='friend@example.com' className={inputClass} />
                                        </label>
                                        <label className='block text-sm font-bold text-slate-700'>
                                            Friend&apos;s phone
                                            <div className='mt-1.5 flex overflow-hidden rounded-xl border border-slate-200 bg-slate-50 transition focus-within:border-royal focus-within:bg-white focus-within:ring-4 focus-within:ring-sky/20'>
                                                <span className='flex shrink-0 items-center gap-1 border-r border-slate-200 px-3 text-sm font-bold text-slate-600'>IN +91</span>
                                                <input
                                                    value={friendPhone}
                                                    onChange={(event) => setFriendPhone(event.target.value.replace(/\D/g, '').slice(0, 10))}
                                                    type='tel'
                                                    inputMode='numeric'
                                                    required
                                                    minLength={10}
                                                    maxLength={10}
                                                    placeholder='98765 43210'
                                                    className='w-full bg-transparent px-3 py-3 text-sm text-ink placeholder:text-slate-400 outline-none'
                                                />
                                            </div>
                                        </label>
                                        <label className='block text-sm font-bold text-slate-700'>
                                            Course they&apos;re interested in
                                            <select
                                                value={course}
                                                onChange={(event) => setCourse(event.target.value)}
                                                className={inputClass}
                                            >
                                                {courseTracks.map((track) => (
                                                    <option key={track.slug} value={track.title}>
                                                        {track.title}
                                                    </option>
                                                ))}
                                            </select>
                                        </label>
                                        <label className='block text-sm font-bold text-slate-700 sm:col-span-2'>
                                            Location (optional)
                                            <input value={location} onChange={(event) => setLocation(event.target.value)} placeholder='City' className={inputClass} />
                                        </label>
                                    </div>
                                </div>

                                <button disabled={loading} type='submit' className='primary-button flex w-full items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60'>
                                    {loading && <LoaderCircle size={17} className='animate-spin' />}
                                    <Send size={16} /> Submit referral
                                </button>

                                {error && (
                                    <p className='flex gap-2 rounded-xl bg-red-50 px-3 py-2.5 text-xs leading-5 text-red-700'>
                                        <AlertCircle size={16} className='mt-0.5 shrink-0' /> {error}
                                    </p>
                                )}
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
