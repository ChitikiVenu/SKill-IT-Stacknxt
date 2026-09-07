import {Link} from 'react-router-dom';
import Seo from '../components/common/Seo';

export default function NotFoundPage() {
    return (
        <main className='page-shell grid min-h-[60vh] place-items-center py-20 text-center'>
            <Seo title='Page Not Found' path='/404' noindex />
            <div>
                <p className='eyebrow'>404</p>
                <h1 className='mt-4 font-display text-4xl font-extrabold text-ink'>
                    This learning path does not exist.
                </h1>
                <Link to='/' className='primary-button mt-6'>
                    Back to Skill IT Education
                </Link>
            </div>
        </main>
    );
}
