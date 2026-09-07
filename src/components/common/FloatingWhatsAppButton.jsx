export const WHATSAPP_NUMBER =
    import.meta.env.VITE_WHATSAPP_NUMBER || '919177715978';
export const WHATSAPP_MESSAGE =
    'Hi Skill IT Education, I would like guidance on courses, fees, or batch timings.';

export default function FloatingWhatsAppButton() {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

    return (
        <a
            href={url}
            target='_blank'
            rel='noopener noreferrer'
            aria-label='Chat with Skill IT Education on WhatsApp'
            className='fixed bottom-5 left-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl shadow-emerald-900/20 transition hover:scale-105 sm:bottom-7 sm:left-7'
        >
            <svg
                viewBox='0 0 32 32'
                className='h-7 w-7 fill-white'
                aria-hidden='true'
            >
                <path d='M16.01 3C9.38 3 4 8.38 4 15.01c0 2.39.7 4.61 1.9 6.48L4 29l7.71-1.86a11.9 11.9 0 0 0 4.3.8h.01c6.63 0 12.01-5.38 12.01-12.01C28 8.38 22.64 3 16.01 3zm0 21.82h-.01a9.83 9.83 0 0 1-5.01-1.37l-.36-.21-3.72.9.9-3.62-.24-.37a9.8 9.8 0 0 1-1.5-5.13c0-5.43 4.42-9.85 9.85-9.85a9.8 9.8 0 0 1 6.97 2.88 9.77 9.77 0 0 1 2.88 6.97c0 5.43-4.42 9.8-9.86 9.8zm5.4-7.36c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.66.15-.2.3-.76.96-.93 1.16-.17.2-.34.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.34.44-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.6-.91-2.19-.24-.58-.48-.5-.66-.5-.17 0-.37-.02-.56-.02-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.75-.71 2-1.4.25-.68.25-1.27.17-1.4-.07-.12-.27-.2-.56-.34z' />
            </svg>
        </a>
    );
}
