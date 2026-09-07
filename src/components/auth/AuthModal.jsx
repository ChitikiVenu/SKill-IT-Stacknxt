import {motion} from 'framer-motion';
import {
    AlertCircle,
    CheckCircle2,
    Eye,
    EyeOff,
    LoaderCircle,
    LockKeyhole,
    Mail,
    UserRound,
    X,
} from 'lucide-react';
import {useState} from 'react';
import {createPortal} from 'react-dom';
import {useAuth} from '../../contexts/AuthContext';
import {useModalDismiss} from '../../hooks/useModalDismiss';
import {useMountedRef} from '../../hooks/useMountedRef';
import {isValidEmail, isValidName, sanitizeText} from '../../lib/validation';
import logoImg from '../../assets/images/logo.png';

const inputClass =
    'mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-ink placeholder:text-slate-400 transition focus:border-royal focus:bg-white focus:outline-none focus:ring-4 focus:ring-sky/20';

export default function AuthModal({open, onClose}) {
    const {configured, signInWithPassword, signUp, signInWithOAuth} = useAuth();
    const [mode, setMode] = useState('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [status, setStatus] = useState({type: '', text: ''});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const mountedRef = useMountedRef();

    useModalDismiss(open, onClose);

    const switchMode = (nextMode) => {
        setMode(nextMode);
        setStatus({type: '', text: ''});
    };

    const requireConfiguration = () => {
        if (configured) return true;
        setStatus({
            type: 'error',
            text: 'Authentication is not configured yet. Add your Supabase URL and public anon key to .env.local.',
        });
        return false;
    };

    const submitEmail = async (event) => {
        event.preventDefault();
        if (!requireConfiguration()) return;
        if (mode === 'register' && !isValidName(fullName)) {
            setStatus({
                type: 'error',
                text: 'Enter your full name using letters only (2-80 characters).',
            });
            return;
        }
        if (!isValidEmail(email)) {
            setStatus({type: 'error', text: 'Enter a valid email address.'});
            return;
        }
        setLoading(true);
        setStatus({type: '', text: ''});
        try {
            const cleanEmail = sanitizeText(email);
            const cleanFullName = sanitizeText(fullName);
            const result =
                mode === 'register'
                    ? await signUp(cleanEmail, password, cleanFullName)
                    : await signInWithPassword(cleanEmail, password);
            if (result.error) throw result.error;
            if (!mountedRef.current) return;
            if (mode === 'register' && !result.data.session) {
                setStatus({
                    type: 'success',
                    text: 'Account created. Please confirm the verification email before logging in.',
                });
            } else {
                onClose();
            }
        } catch (error) {
            if (mountedRef.current)
                setStatus({
                    type: 'error',
                    text:
                        error.message ||
                        'We could not complete that request. Please try again.',
                });
        } finally {
            if (mountedRef.current) setLoading(false);
        }
    };

    const handleOAuthLogin = async (provider) => {
        if (!requireConfiguration()) return;
        try {
            const {error} = await signInWithOAuth(provider);
            if (error) throw error;
        } catch (error) {
            if (mountedRef.current)
                setStatus({
                    type: 'error',
                    text:
                        error.message || `Failed to sign in with ${provider}.`,
                });
        }
    };

    const statusBlock = status.text && (
        <p
            className={`mt-4 flex gap-2 rounded-xl px-3 py-2.5 text-xs leading-5 ${status.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-paleMint text-emerald-800'}`}
        >
            {status.type === 'error' ? (
                <AlertCircle size={16} className='mt-0.5 shrink-0' />
            ) : (
                <CheckCircle2 size={16} className='mt-0.5 shrink-0' />
            )}
            {status.text}
        </p>
    );

    if (!open) return null;

    // Rendered via a portal straight onto document.body so the fixed overlay's containing block is
    // always the viewport. Left in the normal DOM tree, an ancestor with overflow-x-clip (App.jsx's
    // root wrapper) can become a clipping/containing context on some Windows Chromium builds and
    // cuts the modal off instead of centering it — a portal sidesteps that entirely.
    return createPortal(
        <motion.div
            className='fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm'
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            onMouseDown={(event) =>
                event.target === event.currentTarget && onClose()
            }
        >
            <motion.section
                role='dialog'
                aria-modal='true'
                aria-labelledby='auth-title'
                className='relative max-h-[92vh] w-full max-w-md overflow-y-auto rounded-[28px] bg-white shadow-2xl'
                initial={{opacity: 0, y: 24, scale: 0.96}}
                animate={{opacity: 1, y: 0, scale: 1}}
                transition={{type: 'spring', damping: 24, stiffness: 300}}
            >
                <div className='bg-gradient-to-br from-blue-600 via-sky-400 to-emerald-300 px-7 pb-8 pt-7 text-ink'>
                    <button
                        onClick={onClose}
                        className='absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/20 transition hover:bg-white/30'
                        aria-label='Close login modal'
                    >
                        <X size={18} />
                    </button>
                    <img
                        src={logoImg}
                        alt='Skill IT Education Logo'
                        className='h-10 w-auto rounded-2xl object-contain shadow-md'
                    />
                    <h2
                        id='auth-title'
                        className='mt-5 font-display text-2xl font-extrabold'
                    >
                        Welcome to Skill IT Education.
                    </h2>
                    <p className='mt-1 text-sm text-slate-700'>
                        Securely continue your learning journey.
                    </p>
                </div>

                <div className='p-6 sm:p-7'>
                    <div className='grid grid-cols-2 rounded-xl bg-slate-100 p-1'>
                        <button
                            onClick={() => switchMode('login')}
                            className={`rounded-lg px-3 py-2 text-sm font-bold transition ${mode === 'login' ? 'bg-white text-royal shadow-sm' : 'text-slate-500'}`}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => switchMode('register')}
                            className={`rounded-lg px-3 py-2 text-sm font-bold transition ${mode === 'register' ? 'bg-white text-royal shadow-sm' : 'text-slate-500'}`}
                        >
                            Create account
                        </button>
                    </div>

                    <form onSubmit={submitEmail} className='mt-5 space-y-4'>
                        {mode === 'register' && (
                            <label className='block text-sm font-bold text-slate-700'>
                                Full name
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
                        )}
                        <label className='block text-sm font-bold text-slate-700'>
                            Email address
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
                            Password
                            <div className='relative'>
                                <LockKeyhole
                                    size={16}
                                    className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400'
                                />
                                <input
                                    value={password}
                                    onChange={(event) =>
                                        setPassword(event.target.value)
                                    }
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    minLength={8}
                                    autoComplete={
                                        mode === 'register'
                                            ? 'new-password'
                                            : 'current-password'
                                    }
                                    placeholder='Minimum 8 characters'
                                    className={`${inputClass} pl-10 pr-10`}
                                />
                                <button
                                    type='button'
                                    onClick={() =>
                                        setShowPassword((current) => !current)
                                    }
                                    aria-label={
                                        showPassword
                                            ? 'Hide password'
                                            : 'Show password'
                                    }
                                    className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600'
                                >
                                    {showPassword ? (
                                        <EyeOff size={16} />
                                    ) : (
                                        <Eye size={16} />
                                    )}
                                </button>
                            </div>
                        </label>
                        <button
                            disabled={loading}
                            className='primary-button flex w-full items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60'
                            type='submit'
                        >
                            {loading && (
                                <LoaderCircle
                                    size={17}
                                    className='animate-spin'
                                />
                            )}
                            {mode === 'register'
                                ? 'Create secure account'
                                : 'Login'}
                        </button>
                        <p className='text-center text-xs text-slate-500'>
                            {mode === 'register'
                                ? 'Already enrolled?'
                                : 'New to Skill IT Education?'}{' '}
                            <button
                                type='button'
                                onClick={() =>
                                    switchMode(
                                        mode === 'register'
                                            ? 'login'
                                            : 'register',
                                    )
                                }
                                className='font-extrabold text-royal'
                            >
                                {mode === 'register'
                                    ? 'Login'
                                    : 'Create an account'}
                            </button>
                        </p>
                    </form>

                    <div className='relative my-5 text-center'>
                        <div className='absolute inset-0 flex items-center'>
                            <div className='w-full border-t border-slate-200' />
                        </div>
                        <span className='relative bg-white px-3 text-xs font-semibold uppercase tracking-wider text-slate-400'>
                            Or continue with
                        </span>
                    </div>

                    <div className='grid grid-cols-2 gap-3'>
                        <button
                            type='button'
                            onClick={() => handleOAuthLogin('google')}
                            className='flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50'
                        >
                            <svg className='h-4 w-4' viewBox='0 0 24 24'>
                                <path
                                    fill='#4285F4'
                                    d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                                />
                                <path
                                    fill='#34A853'
                                    d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                                />
                                <path
                                    fill='#FBBC05'
                                    d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z'
                                />
                                <path
                                    fill='#EA4335'
                                    d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z'
                                />
                            </svg>
                            Google
                        </button>

                        <button
                            type='button'
                            onClick={() => handleOAuthLogin('github')}
                            className='flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50'
                        >
                            <svg
                                className='h-4 w-4 fill-slate-800'
                                viewBox='0 0 24 24'
                            >
                                <path d='M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z' />
                            </svg>
                            GitHub
                        </button>
                    </div>

                    {statusBlock}
                </div>
            </motion.section>
        </motion.div>,
        document.body,
    );
}
