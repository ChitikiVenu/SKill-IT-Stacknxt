import {courseTracks} from './coursesData';
import akhilalumini from '../assets/images/alumini/akhil_kumar.jpg';
import dhanunjayalumini from '../assets/images/alumini/dhanunjay_vipparla.jpg';
import prajwalalumini from '../assets/images/alumini/prajwal_skillit.png';
import rajasekharalumini from '../assets/images/alumini/rajasekhar_yarraguntla.jpg';
import narasimhaalumini from '../assets/images/alumini/narasimha_reddy.jpg';
import vineethalumini from '../assets/images/alumini/vineeth_gadupute.png';

// Course catalog cards derived from the 5 official curriculum tracks.
// Full syllabus/FAQ content for each lives in coursesData.js.
export const courses = courseTracks.map((track) => ({
    slug: track.slug,
    title: track.title,
    category: track.category,
    duration: track.duration,
    level: track.level,
    originalPrice: track.originalPrice,
    price: track.price,
    tagline: track.tagline,
    image: track.image,
    tint: track.tint,
}));

export const features = [
    {
        title: 'AI-Integrated Curriculum',
        body: 'Every phase is built around how high-performing technical teams work today — with AI embedded in how problems are framed, built, and shipped.',
    },
    {
        title: 'AI Powered Platform',
        body: 'An AI companion gives precise hints, critiques, and pair-programming support across labs, assignments, and DSA practice.',
    },
    {
        title: '100% Placement Support & Career Assistance',
        body: 'Resume building, interview preparation, and referrals to hiring partners so you walk into interviews ready.',
    },
    {
        title: 'Live Capstone Projects & 1-on-1 Mentorship',
        body: 'Hands-on guidance from industry experts as you build the capstone project that anchors your portfolio.',
    },
    {
        title: 'Lifetime Access',
        body: 'The curriculum evolves as the market does. Your learning access and the community stay with you long after graduation.',
    },
    {
        title: 'Strong Foundations',
        body: 'We build judgement, systems thinking, and problem-solving fundamentals that remain valuable long after a tool changes.',
    },
];

export const companies = [
    {
        name: 'Amazon',
        tags: ['Java', 'SQL', 'DSA'],
        color: 'bg-orange-100 text-orange-700',
    },
    {
        name: 'Microsoft',
        tags: ['Python', 'System Design'],
        color: 'bg-sky-100 text-sky-700',
    },
    {
        name: 'Google',
        tags: ['Java', 'SQL', 'DSA'],
        color: 'bg-red-100 text-red-700',
    },
    {
        name: 'Deloitte',
        tags: ['Python', 'Security'],
        color: 'bg-emerald-100 text-emerald-700',
    },
    {
        name: 'Infosys',
        tags: ['Java', 'SQL', 'Cloud'],
        color: 'bg-cyan-100 text-cyan-700',
    },
    {
        name: 'TCS',
        tags: ['Python', 'Java', 'DSA'],
        color: 'bg-violet-100 text-violet-700',
    },
    {
        name: 'Accenture',
        tags: ['SQL', 'Cloud', 'Java'],
        color: 'bg-indigo-100 text-indigo-700',
    },
    {
        name: 'Wipro',
        tags: ['Python', 'Security'],
        color: 'bg-teal-100 text-teal-700',
    },
];

export const alumni = [
    {
        name: 'Dhanunjay Vipparla',
        role: 'QA Engineer',
        company: 'Divami Design Labs, Hyderabad',
        quote: 'The structured roadmap made learning practical. I gained the confidence to turn interviews into offers.',
        image: dhanunjayalumini,
        courses: ['Data Science', 'Generative AI'],
    },
    {
        name: 'Akhil Kumar Devalcheruvu',
        role: 'Hil Test Engineer',
        company: 'ALTEN India, Bengaluru',
        quote: 'The mentors were incredibly supportive and always available to clear doubts. The mock interviews gave me confidence.',
        image: akhilalumini,
        courses: ['SOC Analyst', 'Cyber Security'],
    },
    {
        name: 'Prajwal A',
        role: 'Junior Solution Engineer',
        company: 'Ezee.ai, Bengaluru',
        quote: 'I loved the hands-on projects. Every concept was explained with practical examples and I graduated with a portfolio.',
        image: prajwalalumini,
        courses: ['AI Engineer', 'SOC Analyst'],
    },
    {
        name: 'Rajasekhar Yarraguntla',
        role: 'Application Engineer',
        company: 'Swiss Re, Hyderabad',
        quote: 'The curriculum is industry-focused and constantly updated. The career guidance helped me secure a role faster.',
        image: rajasekharalumini,
        courses: ['AI Engineer', 'Generative AI'],
    },
    {
        name: 'Narasimha Reddy Konireddy',
        role: 'IT analyst',
        company: 'TCS, Hyderabad',
        quote: 'The hands-on learning experience helped me build practical skills and gave me the confidence to take the next step in my career.',
        image: narasimhaalumini,
        courses: ['AI Engineer', 'Generative AI'],
    },
    {
        name: 'Vineeth Gadupute',
        role: 'SAP Functional Consultant',
        company: 'Saint-Gobain India Private Limited, Chennai',
        quote: 'The rigorous curriculum and mentorship helped me land my dream job as SAP Consultant.',
        image: vineethalumini,
        courses: ['Software Engineering', 'Data Structures and Algorithms'],
    },
];

// Placeholder content for the new sections. Replace these entries with approved credentials and learner stories before launch.
export const certificates = [
    {
        id: 'certificate-security',
        course: 'Cyber Security',
        credential: 'Course Completion Certificate',
        recipient: 'Aarav Singh',
        code: 'RT-CYB-2026',
        accent: 'from-blue-600 to-cyan-400',
    },
    {
        id: 'certificate-soc',
        course: 'SOC Analyst',
        credential: 'Professional Skills Certificate',
        recipient: 'Riya Menon',
        code: 'RT-SOC-2026',
        accent: 'from-emerald-600 to-teal-400',
    },
    {
        id: 'certificate-ai',
        course: 'AI Engineer',
        credential: 'Applied Learning Certificate',
        recipient: 'Karthik Rao',
        code: 'RT-AI-2026',
        accent: 'from-violet-600 to-fuchsia-400',
    },
];

export const accreditations = [
    // Confirmed accreditation partners. Logo files live in src/assets/images/.
    {
        id: 'ec-council',
        group: 'recognition',
        logoImage: 'ec-council',
        logoText: 'EC-Council',
        logoDetail: 'International Council of\nE-Commerce Consultants',
        name: 'Ethical hacking certification pathway',
        description:
            'Curriculum mapped to globally recognised ethical hacking and penetration testing standards.',
        tone: 'bg-orange-50 text-orange-700',
    },
    {
        id: 'nasscom',
        group: 'recognition',
        logoImage: 'nasscom',
        logoText: 'NASSCOM',
        logoDetail: 'National Association of\nSoftware & Service Companies',
        name: 'Industry-recognised certification',
        description:
            "Programmes certified against NASSCOM's technology workforce standards.",
        tone: 'bg-indigo-50 text-indigo-700',
    },
    {
        id: 'comptia',
        group: 'recognition',
        logoImage: 'comptia',
        logoText: 'CompTIA',
        logoDetail: 'Computing Technology\nIndustry Association',
        name: 'Vendor-neutral IT certification alignment',
        description:
            'Cyber Security and SOC Analyst programmes aligned with CompTIA-recognised IT and security competencies.',
        tone: 'bg-red-50 text-red-700',
    },
    // Retained Skill IT Education value cards.
    {
        id: 'mentor-led',
        group: 'quality',
        mark: 'ML',
        name: 'Mentor-Led Learning',
        description:
            'Practitioner feedback, structured reviews, and live doubt-clearing support.',
        tone: 'bg-emerald-50 text-emerald-700',
    },
    {
        id: 'project-verified',
        group: 'quality',
        mark: 'PV',
        name: 'Project-Verified Skills',
        description:
            'Hands-on project work that demonstrates what learners can actually do.',
        tone: 'bg-amber-50 text-amber-700',
    },
];

// General, site-wide FAQs shown alongside each track's own FAQ set in FaqSection.
export const faqs = [
    {
        id: 'faq-location',
        question:
            'Where is the Skill IT Education training center located in Hyderabad?',
        answer: 'Our Hyderabad classroom center is in Madhapur, easily reachable from across the city and the IT corridor. Exact directions and batch schedules are shared once you enroll or reach out to our admissions team.',
    },
    {
        id: 'faq-delivery',
        question: 'Do you offer both online and offline (classroom) training?',
        answer: 'Yes. Every program runs as live online classes, in-person classroom training at our Madhapur center, or a blended mix of both, so you can choose the mode that fits your schedule.',
    },
    {
        id: 'faq-emi',
        question: 'Are EMI or installment payment options available?',
        answer: 'Yes. EMI plans are available on every program in addition to full and part payments, so you can start learning without paying the entire fee upfront.',
    },
    {
        id: 'faq-non-it',
        question: 'Can I switch into tech from a non-IT background?',
        answer: 'Yes. Cyber Security, SOC Analyst, and Data Science are built to take non-IT learners from zero, and our AI Engineer and Generative AI tracks assume only working Python, taught from the fundamentals up where needed.',
    },
    {
        id: 'faq-placement',
        question: 'Do you provide placement support after course completion?',
        answer: 'Yes. Every program includes resume and portfolio guidance, mock interviews, and introductions to hiring partners as part of dedicated placement support.',
    },
    {
        id: 'faq-certificate',
        question: 'Will I receive a certificate after completing a course?',
        answer: 'Yes. Learners who complete the required modules, projects, and assessment criteria receive a Skill IT Education completion certificate with a verifiable QR code.',
    },
];

export const reviews = [
    {
        id: 'review-6',
        name: 'Dhanunjay Vipparla',
        role: 'QA Engineer',
        course: 'Skill IT Education',
        avatar: dhanunjayalumini,
        linkedin: 'https://www.linkedin.com/in/dhanunjay-vipparla',
        text: 'Upskilling with Skill IT Education gave me a clear, structured path forward. The mentorship and hands-on practice made all the difference.',
    },
    {
        id: 'review-7',
        name: 'Rajasekhar Yarraguntla',
        role: 'Application Engineer',
        course: 'Skill IT Education',
        avatar: rajasekharalumini,
        linkedin:
            'https://www.linkedin.com/in/rajasekhar-yarraguntla-63721b120',
        text: 'The guided learning approach here is what set it apart for me. I built real confidence, not just theoretical knowledge.',
    },
    {
        id: 'review-8',
        name: 'Narasimha Reddy Konireddy',
        role: 'Data Engineer',
        course: 'Skill IT Education',
        avatar: narasimhaalumini,
        linkedin:
            'https://www.linkedin.com/in/narasimha-reddy-konireddy-2005a1215',
        text: 'Skill IT Education helped me build the practical foundation I needed to grow into a data engineering role. Grateful for the support along the way.',
    },
    {
        id: 'review-9',
        name: 'Akhil Kumar Devalcheruvu',
        role: 'Hil Test Engineer',
        course: 'Skill IT Education',
        avatar: akhilalumini,
        linkedin:
            'https://www.linkedin.com/in/akhil-kumar-devalcheruvu-61a80a282',
        text: 'The structured mentorship and consistent practice at Skill IT Education helped me upskill with real confidence.',
    },
    {
        id: 'review-10',
        name: 'Prajwal A',
        role: 'Junior Solution Engineer',
        course: 'Skill IT Education',
        avatar: prajwalalumini,
        linkedin: 'https://www.linkedin.com/in/prajwalanil',
        text: 'Skill IT Education gave me the hands-on foundation I needed to land my first role as a Solution Engineer. The mentorship made all the difference.',
    },
    {
        id: 'review-11',
        name: 'Vineeth Gadupute',
        role: 'SAP Functional Consultant',
        course: 'Skill IT Education',
        avatar: vineethalumini,
        linkedin: 'https://www.linkedin.com/in/vineeth-gadupute-074a271b9',
        text: 'The rigorous curriculum and mentorship helped me land my dream job as SAP Consultant.',
    },
];

export const successStories = [
    {
        id: 'story-1',
        name: 'Verified Learner',
        designation: 'Upskilled with Skill IT Education',
        company: 'Video Testimonial',
        image: '/videos/testimonials/testimonial-1-poster.jpg',
        video: '/videos/testimonials/testimonial-1.mp4',
    },
    {
        id: 'story-2',
        name: 'Verified Learner',
        designation: 'Upskilled with Skill IT Education',
        company: 'Video Testimonial',
        image: '/videos/testimonials/testimonial-2-poster.jpg',
        video: '/videos/testimonials/testimonial-2.mp4',
    },
    {
        id: 'story-3',
        name: 'Verified Learner',
        designation: 'Upskilled with Skill IT Education',
        company: 'Video Testimonial',
        image: '/videos/testimonials/testimonial-3-poster.jpg',
        video: '/videos/testimonials/testimonial-3.mp4',
    },
    {
        id: 'story-4',
        name: 'Verified Learner',
        designation: 'Upskilled with Skill IT Education',
        company: 'Video Testimonial',
        image: '/videos/testimonials/testimonial-4-poster.jpg',
        video: '/videos/testimonials/testimonial-4.mp4',
    },
    {
        id: 'story-5',
        name: 'Verified Learner',
        designation: 'Upskilled with Skill IT Education',
        company: 'Video Testimonial',
        image: '/videos/testimonials/testimonial-5-poster.jpg',
        video: '/videos/testimonials/testimonial-5.mp4',
    },
];
