import rateLimit from 'express-rate-limit';

// Applied to public data-submission endpoints (lead capture forms) to blunt spam/abuse.
export const submissionRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please try again later.' },
});
