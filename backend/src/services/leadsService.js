import { supabaseAdmin } from '../db/supabaseClient.js';
import { ApiError } from '../middleware/errorHandler.js';

export async function createLead({ fullName, email, phoneNumber, courseInterest }) {
  const { data, error } = await supabaseAdmin
    .from('leads')
    .insert({ name: fullName, email, phone: phoneNumber, course_interest: courseInterest })
    .select()
    .single();

  if (error) {
    throw new ApiError(500, 'We could not save your details right now. Please try again.');
  }

  return data;
}
