import { Building2 } from 'lucide-react';
import { useMemo } from 'react';
import { placementPartners } from '../../data/placementPartners';

export default function PlacementPartnersMarquee() {
  const track = useMemo(() => [...placementPartners, ...placementPartners], []);

  return (
    <div className="overflow-hidden rounded-[24px] border border-slate-100 bg-white py-8" style={{ maskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)', WebkitMaskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)' }}>
      <p className="mb-5 text-center font-display text-2xl font-black tracking-tight text-ink sm:text-3xl">Our Placement Partners</p>
      <div className="marquee-track-slow flex w-max gap-6">
        {track.map((partner, index) => (
          <span key={`${partner.name}-${index}`} className="flex h-12 shrink-0 items-center gap-3 rounded-full border border-slate-100 bg-mist px-8 md:h-16 md:px-10">
            {partner.logo ? (
              <img src={partner.logo} alt={`${partner.name} logo`} className="h-12 w-auto object-contain md:h-16" />
            ) : (
              <>
                <Building2 size={24} className="text-royal" />
                <span className="text-lg font-extrabold text-ink md:text-xl">{partner.name}</span>
              </>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
