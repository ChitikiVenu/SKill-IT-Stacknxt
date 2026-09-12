import {AnimatePresence} from 'framer-motion';
import {ChevronDown, ChevronRight, LogOut, Menu, UserRound, X} from 'lucide-react';
import {useRef, useState} from 'react';
import {Link, NavLink, useLocation} from 'react-router-dom';
import {useAuth} from '../../contexts/AuthContext';
import {courseTracks, cyberSecuritySubCourses} from '../../data/coursesData';
import {WHATSAPP_MESSAGE, WHATSAPP_NUMBER} from '../common/FloatingWhatsAppButton';
import LogoutConfirmModal from '../common/LogoutConfirmModal';
import CoursesMegaMenu from './CoursesMegaMenu';
import logoImg from '../../assets/images/logo.png';

const links = [
    {label: 'Home', to: '/'},
    {label: 'Courses', to: '/courses'},
    {label: 'About Us', to: '/about'},
    {label: 'Insights', to: '/insights'},
    {label: 'FAQs', to: '/#faq'},
    {label: 'Contact Us', to: '/contact'},
];

const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

const desktopClassSolid = (isActive) =>
    `rounded-full px-3 py-2 text-sm font-semibold transition ${isActive ? 'bg-mist text-royal' : 'text-slate-600 hover:bg-mist hover:text-royal'}`;
const mobileClass = (isActive) =>
    `block rounded-xl px-4 py-3 text-sm font-semibold ${isActive ? 'bg-mist text-royal' : 'text-slate-700 hover:bg-mist'}`;

// react-router's NavLink only matches on pathname, so "/" and "/#faq" (same pathname, different
// hash) would both show active together. Compare pathname + hash explicitly for those.
function isLinkActive(to, pathname, hash) {
    const [path, fragment] = to.split('#');
    const wantHash = fragment ? `#${fragment}` : '';
    return pathname === path && hash === wantHash;
}

export default function Navbar({onLogin}) {
    const [isOpen, setIsOpen] = useState(false);
    const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
    const [megaMenuOpen, setMegaMenuOpen] = useState(false);
    const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false);
    const [mobileCyberOpen, setMobileCyberOpen] = useState(false);
    const megaMenuCloseTimer = useRef(null);
    const {user, signOut} = useAuth();

    // A short close-delay so a diagonal mouse path from the "Courses" link into the
    // dropdown panel below it doesn't get read as "left the menu" and slam it shut.
    const openMegaMenu = () => {
        clearTimeout(megaMenuCloseTimer.current);
        setMegaMenuOpen(true);
    };
    const scheduleMegaMenuClose = () => {
        clearTimeout(megaMenuCloseTimer.current);
        megaMenuCloseTimer.current = setTimeout(() => setMegaMenuOpen(false), 200);
    };
    const {pathname, hash} = useLocation();
    const isHome = pathname === '/';
    const desktopClass = desktopClassSolid;
    const closeMenu = () => {
        setIsOpen(false);
        setMobileCoursesOpen(false);
        setMobileCyberOpen(false);
    };
    const userName =
        user?.user_metadata?.full_name ||
        user?.email?.split('@')[0] ||
        'Learner';

    const requestLogout = () => {
        closeMenu();
        setLogoutConfirmOpen(true);
    };

    const confirmLogout = async () => {
        try {
            await signOut();
        } catch (error) {
            console.error('Unable to sign out:', error);
        } finally {
            setLogoutConfirmOpen(false);
        }
    };

    const goHome = () => {
        closeMenu();
        if (pathname === '/' && !hash)
            window.scrollTo({top: 0, left: 0, behavior: 'instant'});
    };

    const renderLink = (link, variant, onClick) => {
        // Courses/Insights/About Us/Contact Us own a distinct pathname prefix, so react-router's own
        // matching (which also covers nested routes like /insights/:slug) is used via NavLink.
        if (!link.to.includes('#') && link.to !== '/') {
            const classFn = ({isActive}) =>
                variant === 'mobile'
                    ? mobileClass(isActive)
                    : desktopClass(isActive);
            return (
                <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={onClick}
                    className={classFn}
                >
                    {link.label}
                </NavLink>
            );
        }
        const active = isLinkActive(link.to, pathname, hash);
        const className =
            variant === 'mobile' ? mobileClass(active) : desktopClass(active);
        const handleClick =
            link.to === '/'
                ? () => {
                      goHome();
                      onClick?.();
                  }
                : onClick;
        return (
            <Link
                key={link.to}
                to={link.to}
                onClick={handleClick}
                className={className}
            >
                {link.label}
            </Link>
        );
    };

    return (
        <header
            className={
                isHome
                    ? 'fixed left-1/2 top-4 z-50 w-[92%] max-w-7xl -translate-x-1/2'
                    : 'sticky top-0 z-40 px-3 pt-3 sm:px-5'
            }
        >
            <nav
                className={
                    !isHome
                        ? 'mx-auto flex max-w-[1344px] items-center justify-between rounded-2xl border border-white/70 bg-white/90 px-4 py-3 shadow-[0_8px_30px_rgba(36,93,182,0.12)] backdrop-blur-xl sm:px-6'
                        : 'mx-auto flex max-w-[1344px] items-center justify-between rounded-full border border-white/70 bg-white/90 px-4 py-3 shadow-[0_8px_30px_rgba(36,93,182,0.12)] backdrop-blur-xl sm:px-6'
                }
            >
                <Link
                    to='/'
                    onClick={goHome}
                    className='flex min-w-0 items-center gap-2.5'
                    aria-label='Skill IT Education home'
                >
                    <img
                        src={logoImg}
                        alt='Skill IT Education Logo'
                        className='h-9 w-auto rounded-xl object-contain shadow-md'
                    />
                    <span className='truncate font-display text-lg font-extrabold tracking-tight text-indigo-500'>
                        Skill IT Education
                    </span>
                </Link>

                <div className='hidden items-center gap-1 xl:flex'>
                    {links.map((link) =>
                        link.to === '/courses' ? (
                            <div
                                key={link.to}
                                className='relative'
                                onMouseEnter={openMegaMenu}
                                onMouseLeave={scheduleMegaMenuClose}
                            >
                                {renderLink(link, 'desktop')}
                                <AnimatePresence>
                                    {megaMenuOpen && (
                                        <CoursesMegaMenu onNavigate={() => setMegaMenuOpen(false)} />
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            renderLink(link, 'desktop')
                        ),
                    )}
                </div>

                <div className='hidden items-center gap-3 xl:flex'>
                    {user ? (
                        <>
                            <span
                                title={userName}
                                className='max-w-[220px] truncate text-sm font-bold text-ink'
                            >
                                Hi, {userName}
                            </span>
                            <button
                                onClick={requestLogout}
                                className='flex w-auto min-w-0 flex-shrink-0 items-center gap-2 px-4 py-2 text-sm font-medium text-ink transition hover:text-royal'
                            >
                                <LogOut size={16} /> Logout
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={onLogin}
                            className='w-auto min-w-0 flex-shrink-0 rounded-full px-4 py-2 text-sm font-medium text-ink transition hover:text-royal'
                        >
                            Login
                        </button>
                    )}
                    <a
                        href={whatsappUrl}
                        target='_blank'
                        rel='noopener noreferrer'
                        aria-label='Chat with Skill IT Education on WhatsApp'
                        className='grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#25D366]/10 text-[#25D366] transition hover:bg-[#25D366]/20'
                    >
                        <svg viewBox='0 0 32 32' className='h-5 w-5 fill-current' aria-hidden='true'>
                            <path d='M16.01 3C9.38 3 4 8.38 4 15.01c0 2.39.7 4.61 1.9 6.48L4 29l7.71-1.86a11.9 11.9 0 0 0 4.3.8h.01c6.63 0 12.01-5.38 12.01-12.01C28 8.38 22.64 3 16.01 3zm0 21.82h-.01a9.83 9.83 0 0 1-5.01-1.37l-.36-.21-3.72.9.9-3.62-.24-.37a9.8 9.8 0 0 1-1.5-5.13c0-5.43 4.42-9.85 9.85-9.85a9.8 9.8 0 0 1 6.97 2.88 9.77 9.77 0 0 1 2.88 6.97c0 5.43-4.42 9.8-9.86 9.8zm5.4-7.36c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.66.15-.2.3-.76.96-.93 1.16-.17.2-.34.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.34.44-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.6-.91-2.19-.24-.58-.48-.5-.66-.5-.17 0-.37-.02-.56-.02-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.75-.71 2-1.4.25-.68.25-1.27.17-1.4-.07-.12-.27-.2-.56-.34z' />
                        </svg>
                    </a>
                    <Link to='/contact' className='primary-button px-5 py-2.5'>
                        Book Free Demo
                    </Link>
                </div>

                <button
                    onClick={() => setIsOpen((open) => !open)}
                    className='grid h-10 w-10 place-items-center rounded-xl bg-mist text-royal xl:hidden'
                    aria-expanded={isOpen}
                    aria-label='Open menu'
                >
                    {isOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </nav>

            {isOpen && (
                <div className='mx-auto mt-2 max-w-[1344px] rounded-2xl border border-white bg-white p-3 shadow-soft xl:hidden'>
                    {links.map((link) =>
                        link.to === '/courses' ? (
                            <div key={link.to}>
                                <div className='flex items-center'>
                                    <div className='flex-1'>{renderLink(link, 'mobile', closeMenu)}</div>
                                    <button
                                        onClick={() => setMobileCoursesOpen((open) => !open)}
                                        aria-expanded={mobileCoursesOpen}
                                        aria-label='Toggle course categories'
                                        className='grid h-10 w-10 shrink-0 place-items-center rounded-xl text-slate-500 hover:bg-mist hover:text-royal'
                                    >
                                        <ChevronDown
                                            size={18}
                                            className={`transition-transform duration-200 ${mobileCoursesOpen ? 'rotate-180' : ''}`}
                                        />
                                    </button>
                                </div>
                                {mobileCoursesOpen && (
                                    <div className='ml-3 mt-1 space-y-1 border-l border-slate-100 pl-3'>
                                        {courseTracks.map((track) =>
                                            track.slug === 'cyber-security' ? (
                                                <div key={track.slug}>
                                                    <div className='flex items-center'>
                                                        <Link
                                                            to={`/courses/${track.slug}`}
                                                            onClick={closeMenu}
                                                            className='flex-1 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-mist'
                                                        >
                                                            {track.title}
                                                        </Link>
                                                        <button
                                                            onClick={() => setMobileCyberOpen((open) => !open)}
                                                            aria-expanded={mobileCyberOpen}
                                                            aria-label='Toggle Cyber Security specialisations'
                                                            className='grid h-9 w-9 shrink-0 place-items-center rounded-xl text-slate-500 hover:bg-mist hover:text-royal'
                                                        >
                                                            <ChevronDown
                                                                size={16}
                                                                className={`transition-transform duration-200 ${mobileCyberOpen ? 'rotate-180' : ''}`}
                                                            />
                                                        </button>
                                                    </div>
                                                    {mobileCyberOpen && (
                                                        <div className='ml-3 space-y-0.5 border-l border-slate-100 pl-3'>
                                                            {cyberSecuritySubCourses.map((course) => (
                                                                <Link
                                                                    key={course.slug}
                                                                    to={`/courses/cyber-security/${course.slug}`}
                                                                    onClick={closeMenu}
                                                                    className='flex items-center gap-1.5 rounded-xl px-3 py-2 text-[13px] font-semibold text-slate-600 hover:bg-mist hover:text-royal'
                                                                >
                                                                    <ChevronRight size={13} className='shrink-0 text-slate-300' />
                                                                    {course.title}
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <Link
                                                    key={track.slug}
                                                    to={`/courses/${track.slug}`}
                                                    onClick={closeMenu}
                                                    className='block rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-mist'
                                                >
                                                    {track.title}
                                                </Link>
                                            ),
                                        )}
                                    </div>
                                )}
                            </div>
                        ) : (
                            renderLink(link, 'mobile', closeMenu)
                        ),
                    )}
                    <div className='mt-2 flex gap-2 border-t border-slate-100 pt-3'>
                        {user ? (
                            <button
                                onClick={requestLogout}
                                className='secondary-button flex-1 px-3 py-2.5'
                            >
                                <LogOut size={15} /> Logout
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    closeMenu();
                                    onLogin();
                                }}
                                className='secondary-button flex-1 px-3 py-2.5'
                            >
                                <UserRound size={15} /> Login
                            </button>
                        )}
                        <Link
                            to='/contact'
                            onClick={closeMenu}
                            className='primary-button flex-1 px-3 py-2.5'
                        >
                            Book Free Demo
                        </Link>
                    </div>
                </div>
            )}

            <LogoutConfirmModal
                open={logoutConfirmOpen}
                onCancel={() => setLogoutConfirmOpen(false)}
                onConfirm={confirmLogout}
            />
        </header>
    );
}
