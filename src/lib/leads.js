import { apiRequest } from './apiClient';

export async function createLead({ fullName, email, phoneNumber, courseInterest }) {
  try {
    const { data } = await apiRequest('/api/leads', {
      method: 'POST',
      body: { fullName, email, phoneNumber, courseInterest: courseInterest ?? null },
    });
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}
