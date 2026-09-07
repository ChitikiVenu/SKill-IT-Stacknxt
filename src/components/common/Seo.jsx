import {Helmet} from 'react-helmet-async';
import logo from '../../assets/images/logo.png';
import {SITE_URL} from '../../data/structuredData';

const SITE_NAME = 'Skill IT Education';
// Brand logo instead of a generic stock photo — whatever unrelated image was here before
// would be what shows up when a page gets shared on WhatsApp/LinkedIn/etc.
const DEFAULT_IMAGE = `${SITE_URL}${logo}`;

export default function Seo({
    title,
    description,
    path = '/',
    image = DEFAULT_IMAGE,
    jsonLd,
    noindex = false,
}) {
    const fullTitle = title
        ? `${title} | ${SITE_NAME}`
        : `${SITE_NAME} | Learn Smarter, Grow Faster`;
    // Always canonicalizes to the real production domain, never to whichever host actually
    // served the request (e.g. the Vercel preview URL) — see the note in structuredData.js.
    const url = `${SITE_URL}${path}`;
    const jsonLdEntries = Array.isArray(jsonLd)
        ? jsonLd
        : jsonLd
          ? [jsonLd]
          : [];

    return (
        <Helmet>
            <title>{fullTitle}</title>
            {description && <meta name='description' content={description} />}
            <link rel='canonical' href={url} />
            {noindex && <meta name='robots' content='noindex, nofollow' />}

            <meta property='og:type' content='website' />
            <meta property='og:site_name' content={SITE_NAME} />
            <meta property='og:locale' content='en_IN' />
            <meta property='og:title' content={fullTitle} />
            {description && (
                <meta property='og:description' content={description} />
            )}
            <meta property='og:url' content={url} />
            <meta property='og:image' content={image} />
            {image === DEFAULT_IMAGE && (
                <>
                    <meta property='og:image:width' content='304' />
                    <meta property='og:image:height' content='312' />
                </>
            )}

            <meta name='twitter:card' content='summary_large_image' />
            <meta name='twitter:title' content={fullTitle} />
            {description && (
                <meta name='twitter:description' content={description} />
            )}
            <meta name='twitter:image' content={image} />

            {jsonLdEntries.map((entry, index) => (
                <script key={index} type='application/ld+json'>
                    {JSON.stringify(entry)}
                </script>
            ))}
        </Helmet>
    );
}
