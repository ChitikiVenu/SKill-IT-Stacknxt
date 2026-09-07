import { Building2 } from 'lucide-react';
import { useMemo } from 'react';
import { placementPartners } from '../../data/placementPartners';

export default function PlacementPartnersMarquee() {
  const track = useMemo(() => [...placementPartners, ...placementPartners], []);

  return (
    <div className="overflow-hidden rounded-[24px] border border-slate-100 bg-white py-4" style={{ maskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)', WebkitMaskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)' }}>
      <p className="mb-3 text-center font-display text-lg font-black tracking-tight text-ink sm:text-xl">Our Placement Partners</p>
      <div className="marquee-track-slow flex w-max gap-6">
        {track.map((partner, index) => (
          <span key={`${partner.name}-${index}`} className="flex h-10 shrink-0 items-center gap-3 rounded-full border border-slate-100 bg-mist px-6 md:h-12 md:px-8">
            {partner.logo ? (
              <img src={partner.logo} alt={`${partner.name} logo`} className="h-8 w-auto object-contain md:h-10" />
            ) : (
              <>
                <Building2 size={20} className="text-royal" />
                <span className="text-sm font-extrabold text-ink md:text-base">{partner.name}</span>
              </>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
