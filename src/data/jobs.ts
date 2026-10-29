import jobsJson from './jobs.json';

export interface Job {
  slug: string;
  title: string;
  type: string | null;
  location: string | null;
  posted: string | null;
  html: string;
  features: [string, string][];
  wpJobId: string | null;
}

/** Job posts from /current-jobs/ (Simple Job Board), with their description HTML sanitised at import. */
export const jobs = jobsJson as Job[];

export const jobCategory = (j: Job) => j.features.find(([k]) => k === 'Job Category')?.[1] ?? null;
export const jobVacancies = (j: Job) => j.features.find(([k]) => k.startsWith('No. Of Vacancies'))?.[1]?.trim() ?? null;
export const jobExcerpt = (j: Job, n = 190) => {
  const text = j.html.replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
  return text.length > n ? `${text.slice(0, n).replace(/\s+\S*$/, '')}…` : text;
};

// Filter options exactly as offered on the live careers page.
export const filterOptions = {
  categories: ['Accounts', 'Administrations', 'Human Resources', 'Marketing', 'Production department', 'Sales'],
  types: ['Contract', 'Full time', 'Internship', 'Part time', 'Permanent'],
  locations: ['Andhrapradesh', 'Ghatkesar', 'Hanamkonda', 'Head office', 'Hyderabad', 'Karimnagar', 'Telangana', 'Vijayawada', 'Warangal'],
};

export const careersIntro =
  'At Retina Paints, we believe our strength lies in our people. Whether you’re a seasoned professional or just starting your career, we offer a dynamic environment where innovation, growth, and creativity are valued. Join us as we color the nation with quality, passion, and progress.';
