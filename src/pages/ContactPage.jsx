import {
    AlertCircle,
    Building2,
    CheckCircle2,
    LoaderCircle,
    Mail,
    Phone,
    Send,
    UserRound,
} from 'lucide-react';
import {useState} from 'react';
import Seo from '../components/common/Seo';
import {createLead} from '../lib/leads';
import {isValidEmail, isValidName, sanitizeText} from '../lib/validation';

const centers = [
    {
        name: 'Madhapur',
        description:
            'Our Madhapur classroom center, in the heart of the Madhapur IT corridor.',
    },
];

const inputClass =
    'mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-ink placeholder:text-slate-400 transition focus:border-royal focus:bg-white focus:outline-none focus:ring-4 focus:ring-sky/20';

export default function ContactPage() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [sent, setSent] = useState(false);

    const submit = async (event) => {
        event.preventDefault();
        if (!isValidName(fullName)) {
            setError(
                'Enter your full name using letters only (2-80 characters).',
            );
            return;
        }
        if (!isValidEmail(email)) {
            setError('Enter a valid email address.');
            return;
        }
        setLoading(true);
        setError('');
        try {
            const {error: leadError} = await createLead({
                fullName: sanitizeText(fullName),
                email: sanitizeText(email),
                phoneNumber: `+91${phone}`,
                courseInterest: 'General Inquiry (Contact Us)',
            });
            if (leadError) throw leadError;
            setSent(true);
        } catch (err) {
            console.error('Unable to save contact query:', err);
            setError(
                'We could not send your query right now. Please try again, or reach out on WhatsApp.',
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <main>
            <Seo
                title='Contact Us'
                description="Talk to Skill IT Education's admissions team. Reach us by phone, email, or visit our Madhapur, Hyderabad classroom center."
                path='/contact'
            />
            <div className='page-shell pt-12 text-center sm:pt-16'>
                <span className='eyebrow'>Contact us</span>
                <h1 className='mt-4 font-display text-5xl font-black tracking-tight text-ink sm:text-6xl'>
                    Talk to our admissions team.
                </h1>
                <p className='mx-auto mt-4 max-w-2xl text-base leading-7 text-muted'>
                    Reach out by phone or email, visit our Hyderabad center, or
                    leave your details and we will get back to you.
                </p>
            </div>

            <section className='py-14 sm:py-20'>
                <div className='page-shell grid gap-6 lg:grid-cols-5'>
                    <div className='space-y-6 lg:col-span-2'>
                        <div className='rounded-[28px] border border-slate-100 bg-white p-6 shadow-soft sm:p-7'>
                            <p className='text-xs font-bold uppercase tracking-wide text-slate-400'>
                                Reach us directly
                            </p>
                            <div className='mt-4 space-y-3'>
                                <a
                                    href='tel:+919177715978'
                                    className='flex items-center gap-3 rounded-2xl border border-slate-100 bg-mist p-4 text-sm font-bold text-ink transition hover:border-royal'
                                >
                                    <span className='grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-royal shadow-sm'>
                                        <Phone size={18} />
                                    </span>
                                    +91 91777 15978
                                </a>
                                <a
                                    href='mailto:hello@skilliteducation.com'
                                    className='flex items-center gap-3 rounded-2xl border border-slate-100 bg-mist p-4 text-sm font-bold text-ink transition hover:border-royal'
                                >
                                    <span className='grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-royal shadow-sm'>
                                        <Mail size={18} />
                                    </span>
                                    hello@skilliteducation.com
                                </a>
                            </div>
                        </div>

                        <div className='rounded-[28px] border border-slate-100 bg-white p-6 shadow-soft sm:p-7'>
                            <p className='text-xs font-bold uppercase tracking-wide text-slate-400'>
                                Offline center in Hyderabad
                            </p>
                            <div className='mt-4 space-y-3'>
                                {centers.map((center) => (
                                    <div
                                        key={center.name}
                                        className='flex gap-3 rounded-2xl border border-slate-100 bg-mist p-4'
                                    >
                                        <span className='grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-royal shadow-sm'>
                                            <Building2 size={18} />
                                        </span>
                                        <div>
                                            <h3 className='font-display text-sm font-extrabold text-ink'>
                                                {center.name}, Hyderabad
                                            </h3>
                                            <p className='mt-1 text-xs leading-5 text-muted'>
                                                {center.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <p className='mt-4 text-xs text-slate-400'>
                                Exact directions are shared with you once you
                                enroll or book a center visit.
                            </p>
                        </div>
                    </div>

                    <div className='rounded-[28px] border border-slate-100 bg-white p-6 shadow-soft sm:p-8 lg:col-span-3'>
                        <h2 className='font-display text-xl font-extrabold text-ink'>
                            Prefer we call you back?
                        </h2>
                        <p className='mt-1 text-sm text-muted'>
                            Optional — share your details and our admissions
                            team will reach out.
                        </p>

                        {sent ? (
                            <div className='mt-6 flex items-center gap-3 rounded-2xl bg-paleMint p-4'>
                                <CheckCircle2
                                    size={22}
                                    className='shrink-0 text-emerald-600'
                                />
                                <p className='text-sm font-semibold text-emerald-800'>
                                    Thanks! We've received your query and will
                                    get back to you shortly.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={submit} className='mt-6 space-y-4'>
                                <label className='block text-sm font-bold text-slate-700'>
                                    Name
                                    <div className='relative'>
                                        <UserRound
                                            size={16}
                                            className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400'
                                        />
                                        <input
                                            value={fullName}
                                            onChange={(event) =>
                                                setFullName(event.target.value)
                                            }
                                            required
                                            placeholder='Your full name'
                                            className={`${inputClass} pl-10`}
                                        />
                                    </div>
                                </label>
                                <label className='block text-sm font-bold text-slate-700'>
                                    Email
                                    <div className='relative'>
                                        <Mail
                                            size={16}
                                            className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400'
                                        />
                                        <input
                                            value={email}
                                            onChange={(event) =>
                                                setEmail(event.target.value)
                                            }
                                            type='email'
                                            required
                                            autoComplete='email'
                                            placeholder='you@example.com'
                                            className={`${inputClass} pl-10`}
                                        />
                                    </div>
                                </label>
                                <label className='block text-sm font-bold text-slate-700'>
                                    Phone number
                                    <div className='mt-1.5 flex overflow-hidden rounded-xl border border-slate-200 bg-slate-50 transition focus-within:border-royal focus-within:bg-white focus-within:ring-4 focus-within:ring-sky/20'>
                                        <span className='flex shrink-0 items-center gap-1 border-r border-slate-200 px-3 text-sm font-bold text-slate-600'>
                                            IN +91
                                        </span>
                                        <input
                                            value={phone}
                                            onChange={(event) =>
                                                setPhone(
                                                    event.target.value
                                                        .replace(/\D/g, '')
                                                        .slice(0, 10),
                                                )
                                            }
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
                                <button
                                    disabled={loading}
                                    type='submit'
                                    className='primary-button flex w-full items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto'
                                >
                                    {loading && (
                                        <LoaderCircle
                                            size={17}
                                            className='animate-spin'
                                        />
                                    )}
                                    <Send size={16} /> Send query
                                </button>
                                {error && (
                                    <p className='flex gap-2 rounded-xl bg-red-50 px-3 py-2.5 text-xs leading-5 text-red-700'>
                                        <AlertCircle
                                            size={16}
                                            className='mt-0.5 shrink-0'
                                        />{' '}
                                        {error}
                                    </p>
                                )}
                            </form>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}
