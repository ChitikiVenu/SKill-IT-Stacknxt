import {Link} from 'react-router-dom';
import Seo from '../components/common/Seo';
import {courseListJsonLd} from '../data/structuredData';
import CoursesSection from '../sections/CoursesSection';

export default function CourseCatalogPage() {
    return (
        <main>
            <Seo
                title='Cyber Security, AI Engineer, Data Science, SOC Analyst & GenAI Course Fees'
                description="Compare Skill IT Education's Hyderabad course catalog: Cyber Security, AI Engineer, Data Science, SOC Analyst, and Generative AI programs with duration, level, and scholarship pricing."
                path='/courses'
                jsonLd={courseListJsonLd()}
            />
            <div className='page-shell pt-12 text-center sm:pt-16'>
                <span className='eyebrow'>Skill IT Education catalog</span>
                <h1 className='mt-4 font-display text-5xl font-black tracking-tight text-ink sm:text-6xl'>
                    Choose the pathway that moves you forward.
                </h1>
                <p className='mx-auto mt-4 max-w-2xl text-base leading-7 text-muted'>
                    Compare duration, learning level, and scholarship pricing,
                    then explore the course that fits your next role.
                </p>
                <Link to='/mock-interviews' className='secondary-button mt-6'>
                    Explore interview prep
                </Link>
            </div>
            <CoursesSection />
        </main>
    );
}
