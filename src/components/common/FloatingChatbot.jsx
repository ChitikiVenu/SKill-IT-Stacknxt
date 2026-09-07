import {AnimatePresence, motion} from 'framer-motion';
import {
    BookOpen,
    CircleDollarSign,
    MessageCircle,
    Send,
    Settings2,
    Sparkles,
    X,
} from 'lucide-react';
import {useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import useScrolledPast from '../../hooks/useScrolledPast';
import {findAnswer} from '../../lib/chatbotKnowledge';
import {WHATSAPP_MESSAGE, WHATSAPP_NUMBER} from './FloatingWhatsAppButton';

const topics = [
    {
        id: 'catalog',
        label: 'Course Catalog 📚',
        icon: BookOpen,
        message:
            "Say less — here's every pathway, duration, and scholarship price in our course catalog. 👇",
    },
    {
        id: 'technical',
        label: 'Technical Issues 🛠️',
        icon: Settings2,
        message:
            'For sign-in, video, or portal issues, share a screenshot with our support team on WhatsApp and we will sort it fast.',
    },
    {
        id: 'fees',
        label: 'Fees & Batch Timings 💰',
        icon: CircleDollarSign,
        message:
            'Current fees, EMI options, scholarships, and upcoming batches are shared by our admissions counselors — ask below, or reach out on WhatsApp.',
    },
];

const GREETING = {
    from: 'bot',
    text: "Hii, I'm Sana! 👋 How can I help you today?",
};

const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

const FALLBACK_REPLIES = [
    "Hmm, I don't have a precise answer for that one yet 🤔 — tap 'Chat on WhatsApp' below and our team will sort you out in real time.",
    "That's a bit outside what I know right now! Our human counselors on WhatsApp can help — just tap below. 💬",
];

export default function FloatingChatbot() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([GREETING]);
    const [query, setQuery] = useState('');
    const [typing, setTyping] = useState(false);
    const navigate = useNavigate();
    const scrollRef = useRef(null);
    // Only the closed bubble is hidden near the top of the page (it can otherwise sit right
    // on top of a section's own CTA button, as it did on the homepage hero) — once someone
    // has actually opened the panel, it stays put regardless of scroll position.
    const scrolledPast = useScrolledPast();
    const bubbleVisible = scrolledPast || open;

    useEffect(() => {
        scrollRef.current?.scrollTo({
            top: scrollRef.current.scrollHeight,
            behavior: 'smooth',
        });
    }, [messages, typing]);

    // A brief "typing…" beat before Sana's reply lands — makes the exchange feel like a
    // real chat instead of an instant lookup dumping text on the screen.
    const pushBotMessage = (text) => {
        setTyping(true);
        window.setTimeout(() => {
            setTyping(false);
            setMessages((prev) => [...prev, {from: 'bot', text}]);
        }, 500 + Math.random() * 400);
    };

    const selectTopic = (topic) => {
        setMessages((prev) => [...prev, {from: 'user', text: topic.label}]);
        pushBotMessage(topic.message);
        if (topic.id === 'catalog') navigate('/courses');
    };

    const submitQuery = (event) => {
        event.preventDefault();
        const trimmed = query.trim();
        if (!trimmed) return;
        setMessages((prev) => [...prev, {from: 'user', text: trimmed}]);
        setQuery('');
        const match = findAnswer(trimmed);
        pushBotMessage(
            match
                ? match.answer
                : FALLBACK_REPLIES[Math.floor(Math.random() * FALLBACK_REPLIES.length)],
        );
    };

    if (!open) {
        return (
            <button
                onClick={() => setOpen(true)}
                aria-expanded={false}
                aria-label='Chat with Sana, your Skill IT Education assistant'
                className={`group fixed bottom-5 right-5 z-40 transition-all duration-300 sm:bottom-7 sm:right-7 ${bubbleVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'}`}
            >
                <span className='pointer-events-none absolute -top-11 right-0 whitespace-nowrap rounded-full bg-ink px-3.5 py-2 text-xs font-bold text-white opacity-0 shadow-lg transition duration-200 group-hover:opacity-100'>
                    Chat with Sana 💬
                </span>
                <span className='absolute inset-0 animate-ping rounded-full bg-royal/50' />
                <span className='relative grid h-12 w-12 place-items-center rounded-full bg-royal text-white shadow-xl shadow-royal/30 transition duration-200 group-hover:scale-110 sm:h-14 sm:w-14'>
                    <MessageCircle size={22} />
                </span>
            </button>
        );
    }

    return (
        <div className='fixed bottom-5 right-5 z-40 sm:bottom-7 sm:right-7'>
            <motion.aside
                className='mb-4 flex h-[min(32rem,70vh)] w-[min(23rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-[26px] border border-white bg-white shadow-2xl'
                initial={{opacity: 0, y: 18, scale: 0.96}}
                animate={{opacity: 1, y: 0, scale: 1}}
                transition={{type: 'spring', damping: 24, stiffness: 300}}
                aria-label='Sana, the Skill IT Education assistant'
            >
                <div className='bg-gradient-to-br from-royal via-sky to-mint p-5 text-white'>
                    <p className='flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-[0.15em] text-white/80'>
                        <Sparkles size={13} /> Sana · Skill IT Education
                    </p>
                    <h2 className='mt-2 font-display text-xl font-extrabold'>
                        How can we help today?
                    </h2>
                    <p className='mt-1 text-sm text-white/85'>
                        Ask a question or pick a topic.
                    </p>
                </div>

                <div
                    ref={scrollRef}
                    className='flex-1 space-y-3 overflow-y-auto p-4'
                >
                    {messages.map((message, index) => (
                        <p
                            key={index}
                            className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-6 ${message.from === 'bot' ? 'bg-mist text-slate-700' : 'ml-auto bg-royal text-white'}`}
                        >
                            {message.text}
                        </p>
                    ))}
                    <AnimatePresence>
                        {typing && (
                            <motion.div
                                initial={{opacity: 0, y: 4}}
                                animate={{opacity: 1, y: 0}}
                                exit={{opacity: 0}}
                                className='flex w-fit items-center gap-1 rounded-2xl bg-mist px-4 py-3'
                                aria-label='Sana is typing'
                            >
                                {[0, 1, 2].map((dot) => (
                                    <span
                                        key={dot}
                                        className='h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400'
                                        style={{animationDelay: `${dot * 120}ms`}}
                                    />
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <div className='grid gap-2 pt-1'>
                        {topics.map((topic) => {
                            const Icon = topic.icon;
                            return (
                                <button
                                    key={topic.id}
                                    onClick={() => selectTopic(topic)}
                                    className='flex items-center gap-3 rounded-xl border border-slate-100 px-3 py-2.5 text-left text-sm font-bold text-ink transition hover:border-blue-100 hover:bg-mist'
                                >
                                    <span className='grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-paleMint text-mint'>
                                        <Icon size={16} />
                                    </span>
                                    {topic.label}
                                </button>
                            );
                        })}
                        <a
                            href={whatsappUrl}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='flex items-center gap-3 rounded-xl border border-[#25D366]/30 bg-[#25D366]/5 px-3 py-2.5 text-left text-sm font-bold text-ink transition hover:border-[#25D366] hover:bg-[#25D366]/10'
                        >
                            <span className='grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#25D366]/15 text-[#1DA851]'>
                                <MessageCircle size={16} />
                            </span>
                            Chat on WhatsApp 🟢
                        </a>
                    </div>
                </div>

                <form
                    onSubmit={submitQuery}
                    className='flex items-center gap-2 border-t border-slate-100 p-3'
                >
                    <input
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder='Ask Sana about a course, fees, EMI…'
                        className='flex-1 rounded-xl bg-slate-50 px-3.5 py-2.5 text-sm outline-none ring-1 ring-transparent transition focus:bg-white focus:ring-royal'
                    />
                    <button
                        type='submit'
                        aria-label='Send'
                        className='grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-royal text-white transition hover:scale-105 hover:bg-blue-700'
                    >
                        <Send size={16} />
                    </button>
                </form>
            </motion.aside>

            <button
                onClick={() => setOpen(false)}
                aria-expanded={true}
                aria-label='Close assistant'
                className='grid h-14 w-14 place-items-center rounded-full bg-royal text-white shadow-xl shadow-royal/30 transition hover:scale-105'
            >
                <X size={23} />
            </button>
        </div>
    );
}
