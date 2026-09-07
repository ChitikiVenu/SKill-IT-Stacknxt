import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './config/env.js';
import routes from './routes/index.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

export const app = express();

// Trust the first proxy hop in production (Render/Railway/nginx, etc.) so
// express-rate-limit and req.ip see the real client IP instead of the
// proxy's — without this, rate limiting either collapses every visitor
// into one shared bucket or throws on X-Forwarded-For.
if (env.nodeEnv === 'production') {
  app.set('trust proxy', 1);
}

app.use(helmet());

// In development, Vite may bind to a different port than FRONTEND_URL if its
// default port is taken, so accept any localhost origin instead of requiring
// an exact match. Production stays locked to the configured FRONTEND_URL.
const corsOrigin = env.nodeEnv === 'production'
  ? env.frontendUrl
  : /^https?:\/\/(localhost|127\.0\.0\.1):\d+$/;
app.use(cors({ origin: corsOrigin }));
app.use(express.json({ limit: '10kb' }));

app.use('/api', routes);

app.use(notFoundHandler);
app.use(errorHandler);

// Default export alongside the named one: server.js and api/index.js both use
// the named `app` import, but Vercel's zero-config Express detection (when a
// project's Root Directory isn't pinned to backend/) looks for a default
// export on this exact file and rejects one that's missing.
export default app;
