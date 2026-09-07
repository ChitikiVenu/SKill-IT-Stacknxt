import Seo from '../components/common/Seo';
import SectionHeading from '../components/common/SectionHeading';
import CompanyQuestionBank from '../components/course/CompanyQuestionBank';
import PlacementPartnersMarquee from '../components/course/PlacementPartnersMarquee';

export default function MockInterviewsPage() {
    return (
        <main>
            <Seo
                title='Company Interview Question Bank'
                description="Browse a searchable company interview question bank for Cyber Security, AI Engineer, Data Science, SOC Analyst, and Generative AI roles, plus Skill IT Education's placement partners."
                path='/mock-interviews'
            />
            <div className='page-shell pt-12 text-center sm:pt-16'>
                <span className='eyebrow'>Interview preparation</span>
                <h1 className='mt-4 font-display text-5xl font-black tracking-tight text-ink sm:text-6xl'>
                    Practice the questions that shape your next offer.
                </h1>
                <p className='mx-auto mt-4 max-w-2xl text-base leading-7 text-muted'>
                    Search real-style interview questions by hiring partner and
                    course track.
                </p>
            </div>

            <section className='py-14 sm:py-20'>
                <div className='page-shell'>
                    <PlacementPartnersMarquee />
                    <div className='mt-12'>
                        <SectionHeading
                            eyebrow='Question bank'
                            title='Company interview questions'
                            description='A sample of real-style questions by hiring partner, filterable by course track.'
                        />
                        <div className='mt-6'>
                            <CompanyQuestionBank />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
