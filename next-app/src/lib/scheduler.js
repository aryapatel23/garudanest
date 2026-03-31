export function buildSchedulerLink({ name = '', email = '', objective = '' } = {}) {
  const provider = (process.env.NEXT_PUBLIC_SCHEDULER_PROVIDER || 'calendly').toLowerCase();
  const baseUrl = process.env.NEXT_PUBLIC_SCHEDULER_URL || '';

  if (!baseUrl) return '';

  const url = new URL(baseUrl);

  if (provider === 'cal') {
    // Cal.com supports name/email and custom notes via query params.
    if (name) url.searchParams.set('name', name);
    if (email) url.searchParams.set('email', email);
    if (objective) url.searchParams.set('notes', objective);
    return url.toString();
  }

  // Default: Calendly prefill parameters.
  if (name) url.searchParams.set('name', name);
  if (email) url.searchParams.set('email', email);
  if (objective) url.searchParams.set('a1', objective);

  return url.toString();
}
