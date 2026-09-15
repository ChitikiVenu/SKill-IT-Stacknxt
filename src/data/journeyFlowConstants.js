// Shared across every course specialization page (Cyber Security's six + AI & ML's seven) on
// purpose: this is the pedagogical arc every specialization is taught through, not
// specialization-specific content, so reusing it isn't "duplicate content" — it's one
// consistent design-system element rendered by SpecializationJourney.jsx.

export const learningFlowStages = [
    { label: 'Beginner', detail: 'Start with zero assumed background.' },
    { label: 'Foundation', detail: 'Core concepts explained from first principles.' },
    { label: 'Hands-on Practice', detail: 'Guided exercises in a live lab.' },
    { label: 'Intermediate Skills', detail: 'Combine concepts into real workflows.' },
    { label: 'Real-world Project', detail: 'Apply everything to a full project.' },
    { label: 'Advanced Application', detail: 'Handle edge cases like a working analyst.' },
    { label: 'Career Ready', detail: 'Portfolio, reporting and interview-ready.' },
];

// Same reasoning as learningFlowStages — one shared six-step "job-ready profile" formula and
// one shared project-presentation framework, reused across pages by design.
export const jobReadyProfileSteps = ['Skills', 'Projects', 'Portfolio', 'Resume', 'Interview Explanation'];
export const projectPresentationFlow = ['Problem', 'Approach', 'Tools', 'What I Did', 'Result', 'What I Learned'];

export const achievementSnapshotStages = [
    { label: 'Knowledge', detail: 'Core concepts understood' },
    { label: 'Hands-on', detail: 'Practical labs completed' },
    { label: 'Projects', detail: 'Portfolio-ready projects' },
    { label: 'Documentation', detail: 'Professional reports' },
    { label: 'Presentation', detail: 'Interview-ready explanation' },
    { label: 'Career', detail: 'Entry-level career direction' },
];
