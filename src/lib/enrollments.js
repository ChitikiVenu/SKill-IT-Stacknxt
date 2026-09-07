import { apiRequest } from './apiClient';

export async function enrollInCourse({ fullName, email, phoneNumber, classType, courseSlug, courseTitle }) {
  try {
    const { data } = await apiRequest('/api/enrollments', {
      method: 'POST',
      body: { fullName, email, phoneNumber, classType, courseSlug, courseTitle },
    });
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}
