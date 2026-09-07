import { describe, expect, it } from 'vitest';
import { isValidEmail, isValidName, isValidPhone, sanitizeText } from './validation';

describe('isValidName', () => {
  it('accepts a normal two-word name', () => {
    expect(isValidName('Narasimha Reddy')).toBe(true);
  });
  it('rejects a single character', () => {
    expect(isValidName('A')).toBe(false);
  });
  it('rejects digits', () => {
    expect(isValidName('User123')).toBe(false);
  });
  it('rejects an empty/whitespace-only string', () => {
    expect(isValidName('   ')).toBe(false);
  });
});

describe('isValidEmail', () => {
  it('accepts a normal email', () => {
    expect(isValidEmail('learner@example.com')).toBe(true);
  });
  it('rejects a missing @', () => {
    expect(isValidEmail('learner.example.com')).toBe(false);
  });
  it('rejects a missing TLD', () => {
    expect(isValidEmail('learner@example')).toBe(false);
  });
});

describe('isValidPhone', () => {
  it('accepts exactly 10 digits', () => {
    expect(isValidPhone('9019944130')).toBe(true);
  });
  it('rejects fewer than 10 digits', () => {
    expect(isValidPhone('90199441')).toBe(false);
  });
  it('rejects non-digit characters', () => {
    expect(isValidPhone('90199-4413')).toBe(false);
  });
});

describe('sanitizeText', () => {
  it('trims surrounding whitespace', () => {
    expect(sanitizeText('  hello  ')).toBe('hello');
  });
  it('strips angle brackets to blunt basic HTML injection', () => {
    expect(sanitizeText('<script>alert(1)</script>')).toBe('scriptalert(1)/script');
  });
});
