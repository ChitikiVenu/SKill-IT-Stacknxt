// Regression test for the CRITICAL finding fixed in
// supabase/migrations/20260817_rls_hardening_v2.sql: a user updating their
// own public.profiles row must NOT be able to change `role`.
//
// This hits a real Supabase project directly (RLS only takes effect against
// the real database, not a mock), so it's opt-in and skipped by default.
// To run it against a disposable TEST project (never production):
//
//   TEST_SUPABASE_URL=... TEST_SUPABASE_ANON_KEY=... \
//   TEST_USER_EMAIL=... TEST_USER_PASSWORD=... \
//   npx vitest run supabase/tests/role-escalation.integration.test.js
//
// TEST_USER_EMAIL/PASSWORD must belong to an existing non-admin auth user
// in that project. Do not point this at production credentials.

import { createClient } from '@supabase/supabase-js';
import { describe, expect, it } from 'vitest';

const {
  TEST_SUPABASE_URL,
  TEST_SUPABASE_ANON_KEY,
  TEST_USER_EMAIL,
  TEST_USER_PASSWORD,
} = process.env;

const hasTestEnv = TEST_SUPABASE_URL && TEST_SUPABASE_ANON_KEY && TEST_USER_EMAIL && TEST_USER_PASSWORD;

describe.skipIf(!hasTestEnv)('profiles RLS: role self-escalation', () => {
  it('rejects a user setting their own role to admin', async () => {
    const supabase = createClient(TEST_SUPABASE_URL, TEST_SUPABASE_ANON_KEY);
    const { data: authData, error: signInError } = await supabase.auth.signInWithPassword({
      email: TEST_USER_EMAIL,
      password: TEST_USER_PASSWORD,
    });
    expect(signInError).toBeNull();

    const { error: updateError } = await supabase
      .from('profiles')
      .update({ role: 'admin' })
      .eq('id', authData.user.id);

    // The BEFORE UPDATE trigger should reject this with an error, not silently
    // succeed or silently no-op.
    expect(updateError).not.toBeNull();

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', authData.user.id)
      .single();
    expect(profile.role).not.toBe('admin');
  });

  it('still allows updating non-role fields on the same row', async () => {
    const supabase = createClient(TEST_SUPABASE_URL, TEST_SUPABASE_ANON_KEY);
    const { data: authData } = await supabase.auth.signInWithPassword({
      email: TEST_USER_EMAIL,
      password: TEST_USER_PASSWORD,
    });

    const { error } = await supabase
      .from('profiles')
      .update({ full_name: 'Regression Test Name' })
      .eq('id', authData.user.id);
    expect(error).toBeNull();
  });
});
