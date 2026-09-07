import { AlertCircle, BookOpen, CheckCircle2, LoaderCircle, Mail, UserRound, X } from 'lucide-react';
import { useState } from 'react';
import { useModalDismiss } from '../../hooks/useModalDismiss';
import { useMountedRef } from '../../hooks/useMountedRef';
import { enrollInCourse } from '../../lib/enrollments';
import { isValidEmail, isValidName, isValidPhone, sanitizeText } from '../../lib/validation';

const inputClass = 'mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-ink placeholder:text-slate-400 transition focus:border-royal focus:bg-white focus:outline-none focus:ring-4 focus:ring-sky/20';

export default function EnrollmentModal({ open, courseTitle, classType, courseSlug, onClose }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [enrolled, setEnrolled] = useState(false);
  const mountedRef = useMountedRef();

  useModalDismiss(open, onClose);

  const close = () => {
    onClose();
    setFullName('');
    setEmail('');
    setPhone('');
    setError('');
    setEnrolled(false);
  };

  const submit = async (event) => {
    event.preventDefault();
    if (!isValidName(fullName)) {
      setError('Enter your full name using letters only (2-80 characters).');
      return;
    }
    if (!isValidEmail(email)) {
      setError('Enter a valid email address.');
      return;
    }
    if (!isValidPhone(phone)) {
      setError('Enter a valid 10-digit phone number.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const { error: enrollError } = await enrollInCourse({
        fullName: sanitizeText(fullName),
        email: sanitizeText(email),
        phoneNumber: `+91${phone}`,
        classType,
        courseSlug,
        courseTitle,
      });
      if (enrollError) throw enrollError;
      if (mountedRef.current) setEnrolled(true);
    } catch (err) {
      console.error('Unable to enroll:', err);
      if (mountedRef.current) {
        setError(err.status === 400 && err.message ? err.message : 'We could not enroll you right now. Please try again shortly, or reach out on WhatsApp.');
      }
    } finally {
      if (mountedRef.current) setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] grid place-items-center bg-slate-950/55 p-4 backdrop-blur-sm"
      onMouseDown={(event) => event.target === event.currentTarget && close()}
    >
      <section role="dialog" aria-modal="true" aria-labelledby="enrollment-modal-title" className="relative max-h-[92vh] w-full max-w-md overflow-y-auto rounded-[28px] bg-white p-7 shadow-2xl sm:p-8">
        <button onClick={close} aria-label="Close enrollment form" className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-mist text-royal transition hover:bg-blue-100">
          <X size={18} />
        </button>

        {enrolled ? (
          <div className="py-4 text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-paleMint text-emerald-700">
              <CheckCircle2 size={28} />
            </div>
            <h2 id="enrollment-modal-title" className="mt-4 font-display text-xl font-extrabold text-ink">You're enrolled in {courseTitle}!</h2>
            <p className="mt-2 text-sm leading-6 text-muted">Our admissions team will reach out with the next steps shortly.</p>
            <button onClick={close} className="primary-button mt-6 w-full justify-center">Done</button>
          </div>
        ) : (
          <>
            <span className="eyebrow"><BookOpen size={13} /> {classType}</span>
            <h2 id="enrollment-modal-title" className="mt-3 font-display text-2xl font-extrabold text-ink">Enroll in {courseTitle}</h2>
            <p className="mt-1 text-sm text-muted">Share your details and our admissions team will confirm your seat.</p>

            <form onSubmit={submit} className="mt-6 space-y-4">
              <label className="block text-sm font-bold text-slate-700">
                Name
                <div className="relative">
                  <UserRound size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input value={fullName} onChange={(event) => setFullName(event.target.value)} required placeholder="Your full name" className={`${inputClass} pl-10`} />
                </div>
              </label>

              <label className="block text-sm font-bold text-slate-700">
                Email
                <div className="relative">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required autoComplete="email" placeholder="you@example.com" className={`${inputClass} pl-10`} />
                </div>
              </label>

              <label className="block text-sm font-bold text-slate-700">
                Phone number
                <div className="mt-1.5 flex overflow-hidden rounded-xl border border-slate-200 bg-slate-50 transition focus-within:border-royal focus-within:bg-white focus-within:ring-4 focus-within:ring-sky/20">
                  <span className="flex shrink-0 items-center gap-1 border-r border-slate-200 px-3 text-sm font-bold text-slate-600">IN +91</span>
                  <input
                    value={phone}
                    onChange={(event) => setPhone(event.target.value.replace(/\D/g, '').slice(0, 10))}
                    type="tel"
                    inputMode="numeric"
                    required
                    minLength={10}
                    maxLength={10}
                    placeholder="98765 43210"
                    className="w-full bg-transparent px-3 py-3 text-sm text-ink placeholder:text-slate-400 outline-none"
                  />
                </div>
              </label>

              <div className="grid grid-cols-2 gap-3 text-xs font-bold text-slate-500">
                <div className="rounded-xl bg-mist px-3 py-2.5"><p className="text-[10px] uppercase tracking-wide text-slate-400">Class type</p><p className="mt-0.5 text-sm text-ink">{classType}</p></div>
                <div className="rounded-xl bg-mist px-3 py-2.5"><p className="text-[10px] uppercase tracking-wide text-slate-400">Course</p><p className="mt-0.5 truncate text-sm text-ink">{courseTitle}</p></div>
              </div>

              <button disabled={loading} type="submit" className="primary-button flex w-full items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60">
                {loading && <LoaderCircle size={17} className="animate-spin" />}
                Enroll Now
              </button>
            </form>

            {error && (
              <p className="mt-4 flex gap-2 rounded-xl bg-red-50 px-3 py-2.5 text-xs leading-5 text-red-700">
                <AlertCircle size={16} className="mt-0.5 shrink-0" /> {error}
              </p>
            )}
          </>
        )}
      </section>
    </div>
  );
}
