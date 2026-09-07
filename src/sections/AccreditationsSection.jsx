import { motion } from 'framer-motion';
import { BadgeCheck } from 'lucide-react';
import SectionHeading from '../components/common/SectionHeading';
import { accreditations } from '../data/content';
import comptiaLogo from '../assets/images/comptia.png';
import ecCouncilLogo from '../assets/images/council.png';
import nasscomLogo from '../assets/images/nasscom.svg';

const logoImages = { comptia: comptiaLogo, 'ec-council': ecCouncilLogo, nasscom: nasscomLogo };

export default function AccreditationsSection() {
  const recognitionCards = accreditations.filter((item) => item.group === 'recognition');
  const qualityCards = accreditations.filter((item) => item.group === 'quality');
  return (
    <section id="accreditations" className="section-fade scroll-mt-24 py-14 sm:py-16">
      <div className="page-shell">
        <div className="rounded-[28px] border border-white bg-white/70 px-6 py-8 shadow-soft sm:px-10 sm:py-9">
          <SectionHeading eyebrow="Accreditations" title="Recognised learning ecosystems, practical outcomes" />

          <div className="mt-7 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {recognitionCards.map((item, index) => (
              <motion.div key={item.id} className={`flex h-16 min-w-[9rem] items-center justify-center rounded-2xl px-6 ${item.tone}`} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }} title={item.name}>
                {logoImages[item.logoImage] ? (
                  <img src={logoImages[item.logoImage]} alt={`${item.logoText} logo`} className="max-h-9 w-auto object-contain" />
                ) : (
                  <p className="font-display text-lg font-extrabold tracking-tight">{item.logoText}</p>
                )}
              </motion.div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-slate-100 pt-5">
            {qualityCards.map((item) => (
              <span key={item.id} className="flex items-center gap-1.5 text-xs font-bold text-royal"><BadgeCheck size={14} /> {item.name}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}