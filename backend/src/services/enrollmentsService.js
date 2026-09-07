import { supabaseAdmin } from '../db/supabaseClient.js';
import { ApiError } from '../middleware/errorHandler.js';

export async function createEnrollment({ fullName, email, phoneNumber, classType, courseSlug, courseTitle }) {
  const { data, error } = await supabaseAdmin
    .from('enrollments')
    .insert({
      name: fullName,
      email,
      phone: phoneNumber,
      class_type: classType,
      course_slug: courseSlug,
      course_title: courseTitle,
    })
    .select()
    .single();

  if (error) {
    throw new ApiError(500, 'We could not enroll you right now. Please try again.');
  }

  return data;
}
