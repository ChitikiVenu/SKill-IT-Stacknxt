import { supabaseAdmin } from '../db/supabaseClient.js';
import { ApiError, asyncHandler } from './errorHandler.js';

// Verifies the Supabase access token issued by Supabase Auth on the frontend and
// resolves the real user id server-side, rather than trusting a client-supplied id.
export const requireAuth = asyncHandler(async (req, res, next) => {
  const authHeader = req.get('authorization') || '';
  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    throw new ApiError(401, 'Sign in required.');
  }

  const { data, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !data?.user) {
    throw new ApiError(401, 'Your session has expired. Please sign in again.');
  }

  req.user = data.user;
  next();
});
