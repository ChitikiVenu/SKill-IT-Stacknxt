import {Helmet} from 'react-helmet-async';

const SITE_NAME = 'Skill IT Education';
const DEFAULT_IMAGE =
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80';

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
    const url =
        typeof window !== 'undefined'
            ? `${window.location.origin}${path}`
            : path;
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
            <meta property='og:title' content={fullTitle} />
            {description && (
                <meta property='og:description' content={description} />
            )}
            <meta property='og:url' content={url} />
            <meta property='og:image' content={image} />

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
