import { faqs } from '../data/content';
import { courseTracks } from '../data/coursesData';

const STOPWORDS = new Set(['a', 'an', 'the', 'is', 'are', 'do', 'does', 'i', 'in', 'of', 'for', 'to', 'and', 'my', 'your', 'you', 'what', 'how', 'can', 'will', 'with']);

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((word) => word && !STOPWORDS.has(word));
}

const knowledgeBase = [
  ...faqs.map((faq) => ({ question: faq.question, answer: faq.answer, tokens: tokenize(`${faq.question} ${faq.answer}`) })),
  ...courseTracks.flatMap((track) => [
    { question: `What does the ${track.title} course cover?`, answer: `${track.tagline} It runs ${track.duration} (${track.hours}) and includes online, blended, and classroom options in Hyderabad.`, tokens: tokenize(`${track.title} ${track.tagline} ${track.category}`) },
    ...track.faqs.map((faq) => ({ question: faq.question, answer: faq.answer, tokens: tokenize(`${track.title} ${faq.question} ${faq.answer}`) })),
  ]),
];

export function findAnswer(query) {
  const queryTokens = tokenize(query);
  if (queryTokens.length === 0) return null;

  let best = null;
  let bestScore = 0;
  for (const entry of knowledgeBase) {
    const score = queryTokens.reduce((total, token) => total + (entry.tokens.includes(token) ? 1 : 0), 0);
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }
  return bestScore > 0 ? best : null;
}
