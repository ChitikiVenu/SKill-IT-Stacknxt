export default function SectionHeading({ eyebrow, title, description, light = false }) {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
      {eyebrow && <span className={light ? 'eyebrow bg-white/15 text-white' : 'eyebrow'}>{eyebrow}</span>}
      <h2 className={`mt-4 font-display text-4xl font-black tracking-tight sm:text-5xl ${light ? 'text-white' : 'text-ink'}`}>
        {title}
      </h2>
      {description && <p className={`mt-4 max-w-2xl text-base leading-7 ${light ? 'text-white/80' : 'text-muted'}`}>{description}</p>}
    </div>
  );
}
