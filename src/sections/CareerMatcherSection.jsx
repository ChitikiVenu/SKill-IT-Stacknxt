import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, RotateCcw, Sparkles } from 'lucide-react';
import SectionHeading from '../components/common/SectionHeading';
import { courseTracks } from '../data/coursesData';

const questions = [
  {
    id: 'pull',
    prompt: 'What pulls you in?',
    options: [
      { label: 'Hunting vulnerabilities & ethical hacking', scores: { 'cyber-security': 2 } },
      { label: 'Teaching machines to think', scores: { 'ai-engineer': 2, 'generative-ai': 1 } },
      { label: 'Numbers, dashboards & patterns', scores: { 'data-science': 2 } },
      { label: 'Watching for real-time threats', scores: { 'soc-analyst': 2 } },
    ],
  },
  {
    id: 'work-style',
    prompt: 'How do you like to work?',
    options: [
      { label: 'Hands-on labs & simulated attacks', scores: { 'cyber-security': 1, 'soc-analyst': 1 } },
      { label: 'Building & experimenting with models', scores: { 'ai-engineer': 1, 'generative-ai': 1 } },
      { label: 'Digging through datasets for a story', scores: { 'data-science': 2 } },
      { label: 'Monitoring alerts and reacting fast', scores: { 'soc-analyst': 2 } },
    ],
  },
  {
    id: 'saturday',
    prompt: 'Pick a Saturday project',
    options: [
      { label: 'Build a home-lab pentest range', scores: { 'cyber-security': 2 } },
      { label: 'Fine-tune a chatbot', scores: { 'generative-ai': 2 } },
      { label: 'Train a predictive model', scores: { 'ai-engineer': 1, 'data-science': 1 } },
      { label: 'Set up a live SOC monitoring dashboard', scores: { 'soc-analyst': 2 } },
    ],
  },
];

function computeResult(scores) {
  const winner = Object.entries(scores).sort((a, b) => b[1] - a[1])[0]?.[0];
  return courseTracks.find((track) => track.slug === winner) ?? courseTracks[0];
}

export default function CareerMatcherSection() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState({});
  const finished = step >= questions.length;
  const result = finished ? computeResult(scores) : null;

  const choose = (optionScores) => {
    setScores((prev) => {
      const next = { ...prev };
      Object.entries(optionScores).forEach(([slug, value]) => {
        next[slug] = (next[slug] ?? 0) + value;
      });
      return next;
    });
    setStep((prev) => prev + 1);
  };

  const retake = () => {
    setScores({});
    setStep(0);
  };

  return (
    <section id="career-matcher" className="scroll-mt-24 py-20 sm:py-28">
      <div className="page-shell">
        <div className="rounded-[32px] border border-white bg-gradient-to-br from-mist to-white px-6 py-10 shadow-soft sm:px-10 sm:py-12">
          <SectionHeading eyebrow="60-second career matcher" title="Not sure which track fits you?" description="Answer 3 quick questions and we'll point you to the right course." />

          <div className="mx-auto mt-8 max-w-2xl">
            {!finished ? (
              <div>
                <p className="text-center text-xs font-bold uppercase tracking-wide text-royal">Question {step + 1} of {questions.length}</p>
                <h3 className="mt-2 text-center font-display text-xl font-extrabold text-ink sm:text-2xl">{questions[step].prompt}</h3>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {questions[step].options.map((option) => (
                    <button
                      key={option.label}
                      onClick={() => choose(option.scores)}
                      className="rounded-2xl border border-slate-200 bg-white p-4 text-left text-sm font-semibold text-ink shadow-sm transition hover:-translate-y-0.5 hover:border-royal hover:bg-mist hover:shadow-card"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                <div className="mt-6 flex items-center justify-center gap-2">
                  {questions.map((question, index) => (
                    <span key={question.id} className={`h-1.5 w-8 rounded-full transition ${index <= step ? 'bg-royal' : 'bg-slate-200'}`} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="rounded-[24px] border border-slate-100 bg-white p-6 text-center shadow-card sm:p-8">
                <span className="eyebrow mx-auto"><Sparkles size={13} /> Your match</span>
                <h3 className="mt-3 font-display text-2xl font-extrabold text-ink sm:text-3xl">{result.title}</h3>
                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">{result.tagline}</p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  <Link to="/courses" className="primary-button">Explore {result.title} <ArrowRight size={16} /></Link>
                  <button onClick={retake} className="secondary-button"><RotateCcw size={15} /> Retake quiz</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
