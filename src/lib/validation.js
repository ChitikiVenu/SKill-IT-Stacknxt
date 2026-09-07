const NAME_PATTERN = /^[\p{L}][\p{L}'’.\-\s]{1,79}$/u;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidName(value) {
  return NAME_PATTERN.test(value.trim());
}

export function isValidEmail(value) {
  return EMAIL_PATTERN.test(value.trim());
}

// Expects the already-digits-only local number (the +91 country code is
// prefixed separately by the caller), matching the 10-digit Indian mobile
// numbers this form collects.
export function isValidPhone(value) {
  return /^\d{10}$/.test(value.trim());
}

export function sanitizeText(value) {
  return value.trim().replace(/[<>]/g, '');
}
