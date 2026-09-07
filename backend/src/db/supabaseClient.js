import { createClient } from '@supabase/supabase-js';
import { env } from '../config/env.js';

// Service-role client: server-side only, never expose this key to the frontend.
// auth: { persistSession: false } because this is a stateless backend client, not a browser session.
export const supabaseAdmin = createClient(env.supabaseUrl, env.supabaseServiceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});
