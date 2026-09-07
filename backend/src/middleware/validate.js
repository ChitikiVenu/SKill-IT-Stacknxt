import { ApiError } from './errorHandler.js';

// Mirrors the format rules already enforced client-side in src/lib/validation.js,
// re-checked here since the client can never be trusted.
const NAME_PATTERN = /^[\p{L}][\p{L}'’.\-\s]{1,79}$/u;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const SLUG_PATTERN = /^[a-z0-9-]{1,80}$/;

export function sanitizeText(value) {
  return String(value ?? '').trim().replace(/[<>]/g, '');
}

export function isValidName(value) {
  return typeof value === 'string' && NAME_PATTERN.test(value.trim());
}

export function isValidEmail(value) {
  return typeof value === 'string' && EMAIL_PATTERN.test(value.trim());
}

export function isValidPhone(value) {
  return typeof value === 'string' && value.replace(/\D/g, '').length >= 10;
}

export function isValidSlug(value) {
  return typeof value === 'string' && SLUG_PATTERN.test(value.trim());
}

export function validateLeadPayload(body) {
  const fullName = sanitizeText(body.fullName);
  const email = sanitizeText(body.email);
  const phoneNumber = sanitizeText(body.phoneNumber);
  const courseInterest = body.courseInterest ? sanitizeText(body.courseInterest) : null;

  if (!isValidName(fullName)) {
    throw new ApiError(400, 'Enter a full name using letters only (2-80 characters).');
  }
  if (!isValidEmail(email)) {
    throw new ApiError(400, 'Enter a valid email address.');
  }
  if (!isValidPhone(phoneNumber)) {
    throw new ApiError(400, 'Enter a valid phone number (at least 10 digits).');
  }
  if (courseInterest && courseInterest.length > 200) {
    throw new ApiError(400, 'Course interest is too long.');
  }

  return { fullName, email, phoneNumber, courseInterest };
}

const CLASS_TYPE_PATTERN = /^[\p{L}0-9\s-]{2,40}$/u;

export function isValidClassType(value) {
  return typeof value === 'string' && CLASS_TYPE_PATTERN.test(value.trim());
}

export function validateEnrollmentPayload(body) {
  const fullName = sanitizeText(body.fullName);
  const email = sanitizeText(body.email);
  const phoneNumber = sanitizeText(body.phoneNumber);
  const classType = sanitizeText(body.classType);
  const courseSlug = sanitizeText(body.courseSlug);
  const courseTitle = sanitizeText(body.courseTitle);

  if (!isValidName(fullName)) {
    throw new ApiError(400, 'Enter a full name using letters only (2-80 characters).');
  }
  if (!isValidEmail(email)) {
    throw new ApiError(400, 'Enter a valid email address.');
  }
  if (!isValidPhone(phoneNumber)) {
    throw new ApiError(400, 'Enter a valid phone number (at least 10 digits).');
  }
  if (!isValidClassType(classType)) {
    throw new ApiError(400, 'Select a valid class type.');
  }
  if (!isValidSlug(courseSlug)) {
    throw new ApiError(400, 'Enter a valid course.');
  }
  if (!courseTitle || courseTitle.length > 120) {
    throw new ApiError(400, 'Enter a valid course title.');
  }

  return { fullName, email, phoneNumber, classType, courseSlug, courseTitle };
}
