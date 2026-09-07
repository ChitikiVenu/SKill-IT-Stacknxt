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
    <section id="faq" className="scroll-mt-24 py-20 sm:py-28">
      <div className="page-shell grid min-w-0 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div className="min-w-0 lg:sticky lg:top-28">
          <SectionHeading eyebrow="Common questions" title="Everything you need to know before you begin" description="Location, delivery modes, EMI, career switching, and placement support — by track." />
          <div className="mt-7 inline-flex items-center gap-3 rounded-2xl bg-mist px-4 py-3 text-sm font-semibold text-royal"><CircleHelp size={20} /> Still unsure? Talk to an advisor.</div>
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
          <div className="mt-4 space-y-3">
            {activeFaqs.map((faq) => {
              const isOpen = faq.id === openId;
              return (
                <article key={faq.id} className={`overflow-hidden rounded-2xl border transition ${isOpen ? 'border-blue-100 bg-mist' : 'border-slate-100 bg-white hover:border-blue-100'}`}>
                  <button onClick={() => setOpenId(isOpen ? '' : faq.id)} aria-expanded={isOpen} className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-6">
                    <span className="font-display text-base font-extrabold text-ink sm:text-lg">{faq.question}</span>
                    <ChevronDown size={20} className={`shrink-0 text-royal transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && <p className="px-5 pb-5 text-sm leading-7 text-muted sm:px-6 sm:pb-6">{faq.answer}</p>}
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
