import {courseTracks} from './coursesData';

const ORG_NAME = 'Skill IT Education';
const ORG_URL = typeof window !== 'undefined' ? window.location.origin : '';

export function educationalOrganizationJsonLd() {
    return {
        '@context': 'https://schema.org',
        '@type': 'EducationalOrganization',
        name: ORG_NAME,
        url: ORG_URL,
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
    return {
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: track.hero.headline,
        description: track.metaDescription,
        provider: {
            '@type': 'EducationalOrganization',
            name: ORG_NAME,
            url: ORG_URL,
        },
        hasCourseInstance: {
            '@type': 'CourseInstance',
            courseMode: ['Online', 'Blended', 'Onsite'],
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
