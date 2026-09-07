import { ChevronDown, CircleHelp } from 'lucide-react';
import { useState } from 'react';
import SectionHeading from '../components/common/SectionHeading';
import { faqs } from '../data/content';
import { courseTracks } from '../data/coursesData';

const tabs = [
  { id: 'general', label: 'General', faqs },
  ...courseTracks.map((track) => ({ id: track.slug, label: track.title, faqs: track.faqs.map((faq, index) => ({ id: `${track.slug}-${index}`, ...faq })) })),
];

export default function FaqSection() {
  const [activeTab, setActiveTab] = useState('general');
  const [openId, setOpenId] = useState(faqs[0].id);

  const activeFaqs = tabs.find((tab) => tab.id === activeTab).faqs;

  const selectTab = (tabId) => {
    setActiveTab(tabId);
    setOpenId(tabs.find((tab) => tab.id === tabId).faqs[0]?.id ?? '');
  };

  return (
    <section id="faq" className="flex min-h-[100svh] snap-start flex-col justify-center scroll-mt-24 py-[clamp(1.5rem,5vh,4rem)]">
      <div className="page-shell grid min-w-0 gap-[clamp(1.5rem,4vh,2.5rem)] lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div className="min-w-0">
          <SectionHeading eyebrow="Common questions" title="Everything you need to know before you begin" description="Location, delivery modes, EMI, career switching, and placement support — by track." />
          <div className="mt-[clamp(1rem,3vh,1.75rem)] inline-flex items-center gap-3 rounded-2xl bg-mist px-4 py-3 text-sm font-semibold text-royal"><CircleHelp size={20} /> Still unsure? Talk to an advisor.</div>
        </div>
        <div className="min-w-0">
          <div className="hide-scrollbar flex gap-2 overflow-x-auto pb-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => selectTab(tab.id)}
                className={`shrink-0 rounded-full border px-4 py-2 text-xs font-bold transition ${activeTab === tab.id ? 'border-royal bg-royal text-white' : 'border-blue-100 bg-white text-royal hover:border-royal'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {/* Capped and internally scrollable as a safety net for tabs with many questions —
              everything else on screen (heading, tabs, CTA buttons) always stays fully visible. */}
          <div className="mt-4 max-h-[48svh] space-y-2.5 overflow-y-auto pr-1">
            {activeFaqs.map((faq) => {
              const isOpen = faq.id === openId;
              return (
                <article key={faq.id} className={`overflow-hidden rounded-2xl border transition ${isOpen ? 'border-blue-100 bg-mist' : 'border-slate-100 bg-white hover:border-blue-100'}`}>
                  <button onClick={() => setOpenId(isOpen ? '' : faq.id)} aria-expanded={isOpen} className="flex w-full items-center justify-between gap-5 px-5 py-3.5 text-left sm:px-6">
                    <span className="font-display text-sm font-extrabold text-ink sm:text-base">{faq.question}</span>
                    <ChevronDown size={18} className={`shrink-0 text-royal transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && <p className="px-5 pb-4 text-sm leading-6 text-muted sm:px-6">{faq.answer}</p>}
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
