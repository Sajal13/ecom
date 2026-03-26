export function normalizePhone(phone: string): string {
  let normalized = phone.trim().replace(/\s+/g, '');

  if (normalized.startsWith('+880')) {
    normalized = `0${normalized.slice(4)}`;
  } else if (normalized.startsWith('880')) {
    normalized = `0${normalized.slice(3)}`;
  }

  return normalized;
}
