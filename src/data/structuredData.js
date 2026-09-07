import {courseTracks} from './coursesData';
import logo from '../assets/images/logo.png';

const ORG_NAME = 'Skill IT Education';
// Hardcoded to the real production domain rather than window.location.origin — the site is
// also reachable at its Vercel preview URL, and letting structured data/canonical follow
// whichever host served the page would tell search engines the preview URL is a second,
// separate copy of the same content (duplicate-content signal) instead of pointing every
// visitor's search result back at the one domain that should get indexed.
export const SITE_URL = 'https://skilliteducation.com';
const ORG_URL = SITE_URL;
const ORG_LOGO = `${SITE_URL}${logo}`;

export function educationalOrganizationJsonLd() {
    return {
        '@context': 'https://schema.org',
        '@type': 'EducationalOrganization',
        name: ORG_NAME,
        url: ORG_URL,
        logo: ORG_LOGO,
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Hyderabad',
            addressRegion: 'Telangana',
            addressCountry: 'IN',
        },
        sameAs: [
            'https://www.linkedin.com/company/skill-it-education',
            'https://www.instagram.com/skilliteducation/',
            'https://www.youtube.com',
        ],
    };
}

export function courseJsonLd(track) {
    // No `offers`/price here on purpose — coursesData.js flags its fee figures as
    // placeholders pending approval, and Google can surface Course-schema prices directly
    // in search results, so publishing an unapproved number would show up as misleading.
    return {
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: track.hero.headline,
        description: track.metaDescription,
        url: `${SITE_URL}/courses/${track.slug}`,
        image: track.image,
        provider: {
            '@type': 'EducationalOrganization',
            name: ORG_NAME,
            url: ORG_URL,
        },
        hasCourseInstance: {
            '@type': 'CourseInstance',
            courseMode: ['Online', 'Blended', 'Onsite'],
            courseWorkload: track.duration,
            location: {
                '@type': 'Place',
                name: 'Skill IT Education, Hyderabad',
            },
        },
    };
}

export function courseListJsonLd() {
    return {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: courseTracks.map((track, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: courseJsonLd(track),
        })),
    };
}

export function articleJsonLd(post) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        url: `${SITE_URL}/insights/${post.slug}`,
        author: {
            '@type': 'Organization',
            name: ORG_NAME,
        },
        publisher: {
            '@type': 'Organization',
            name: ORG_NAME,
            logo: {
                '@type': 'ImageObject',
                url: ORG_LOGO,
            },
        },
    };
}

export function faqPageJsonLd(faqs) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    };
}
