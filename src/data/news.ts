import type { ImageMetadata } from 'astro';
import ambassadorCover from '@/assets/news/ambassador-featured.jpg';
import bseCover from '@/assets/news/bse/Retinas-Shares-got-listed-in-BSE-SME-Platform-4.jpg';

const ambassadorGallery = import.meta.glob<{ default: ImageMetadata }>('@/assets/news/ambassador/*.{jpg,jpeg}', { eager: true });
const bseGallery = import.meta.glob<{ default: ImageMetadata }>('@/assets/news/bse/*.jpg', { eager: true });

/** Keeps the gallery in the order used on the live post (by trailing number, descending/ascending as published). */
function ordered(glob: Record<string, { default: ImageMetadata }>, order: string[]): ImageMetadata[] {
  const byName = new Map(Object.entries(glob).map(([path, mod]) => [path.split('/').pop()!, mod.default]));
  return order.map((name) => byName.get(name)).filter((img): img is ImageMetadata => Boolean(img));
}

const ambassadorOrder = [
  ...[23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map(
    (n) => `retina-paints-Kona-Srikar-Bharat-as-our-brand-ambassador-${n}.jpg`,
  ),
  ...[16, 15, 14, 12, 11, 10].map((n) => `Engaging-shri-Kona-Srikar-Bharat-as-our-brand-ambassador-${n}.jpeg`),
];
const bseOrder = [16, 17, 14, 18, 8, 3, 13, 12, 11, 6, 7, 9, 10, 1, 15, 2, 4, 5].map(
  (n) => `Retinas-Shares-got-listed-in-BSE-SME-Platform-${n}.jpg`,
);

export interface Post {
  slug: string;
  title: string;
  category: string;
  date: string; // ISO
  dateLabel: string; // as published
  cover: ImageMetadata;
  coverAlt: string;
  excerpt: string;
  body: { heading?: string; text: string }[];
  gallery: ImageMetadata[];
  galleryAlt: string;
}

export const posts: Post[] = [
  {
    slug: 'engaging-shri-kona-srikar-bharat-as-our-brand-ambassador',
    title: 'Engaging Shri Kona Srikar Bharat as Our Brand Ambassador',
    category: 'Updates',
    date: '2023-06-26',
    dateLabel: 'Monday June 26, 2023',
    cover: ambassadorCover,
    coverAlt: 'Shri Kona Srikar Bharat with the Retina Paints leadership team at the brand ambassador event',
    excerpt:
      'Wicket Keeper Batter Shri. Kona Srikar Bharat, a member of the Indian Cricket Team has been engaged as the Brand Ambassador of the Company on 25th June, 2023.',
    body: [
      { text: 'Wicket Keeper Batter Shri. Kona Srikar Bharat, a member of the Indian Cricket Team has been engaged as the Brand Ambassador of the Company on 25th June, 2023.' },
      { text: 'A colorful function was held at Hotel Marriot, Tank Bund Road, Secunderabad on Sunday the 25th June, 2023.' },
      { text: 'In the presence of large media Shri. Kona Srikar Bharat was felicitated and welcomed by the MD Shri. Rakesh Dommati and other senior management of the company.' },
      { text: 'The event was extensively covered by both visual and print media in Telugu as well as English.' },
      { text: 'Shri. Kona Srikar Bharat spoke about his happiness about his association with Retina.' },
      { text: 'The Company expects the joining of Shri. Kona Srikar Bharat will add value in its plans of expanding the business, PAN India.' },
      { text: 'It will be a WIN WIN for both Reitna as well as Shir. Kona Srikar Bharat and the Company expects a long term mutually beneficial association.' },
    ],
    gallery: ordered(ambassadorGallery, ambassadorOrder),
    galleryAlt: 'Brand ambassador event photograph',
  },
  {
    slug: 'historic-moment-companys-shares-got-listed-in-bse-sme-platform',
    title: 'Historic Moment: Company’s Shares got listed in BSE SME Platform',
    category: 'Updates',
    date: '2023-05-03',
    dateLabel: 'Wednesday May 3, 2023',
    cover: bseCover,
    coverAlt: 'Retina Paints leadership at the BSE SME listing ceremony',
    excerpt: 'On 03 rd May, 2023, Company’s Shares got listed in BSE SME Platform.',
    body: [
      { heading: 'Thankyou Investors:', text: 'The Equity issue by the company amounting to 37,00,000 shares has attracted huge interest from the investor fraternity and the issue over subscribed by more than 8 times.' },
      { heading: 'Historic Moment:', text: 'On 03 rd May, 2023, Company’s Shares got listed in BSE SME Platform .' },
    ],
    gallery: ordered(bseGallery, bseOrder),
    galleryAlt: 'BSE SME listing ceremony photograph',
  },
];

const PD = 'https://www.retinapaints.com/policy-documents/';

// "General announcements" PDFs listed on the live News & Events page (labels as published).
export const announcements = [
  { label: 'Products Relaunch', href: 'https://retinapaints.com/policy-documents/General%20Announcement%20-%20Products%20Relaunch.pdf' },
  { label: 'Appointment of C & F Agents and Opening of Depots', href: 'https://retinapaints.com/policy-documents/Genreal%20Announcements-%20C&F%20Agent%20appointment.pdf' },
  { label: 'Genreal Announcements- C&F Agent appointment', href: 'https://retinapaints.com/policy-documents/Genreal_Announcements-C&F_Agent_appointment.pdf' },
  { label: 'Opening of New Outlet at Khammam', href: `${PD}Genreal%20Announcements-%20Opening%20of%20New%20Outlet.pdf` },
  { label: 'Genreal Announcements- Opening of Franchisee', href: `${PD}Genreal%20Announcements-%20Opening%20of%20Franchisee.pdf` },
  { label: 'Inauguration of First Franchsiee', href: `${PD}Genreal-Announcements-Inauguration.pdf` },
  { label: 'General Announcements Opening of Second Franchisee', href: `${PD}GeneralAnnouncements-Opening-of-Second-Franchisee.pdf` },
  { label: 'Inauguration of our Second Franchisee Outlet at Warangal', href: `${PD}Genreal_Announcements-Shri_Vinaayaka_Enterprises_Warangal.pdf` },
  { label: 'Expanding the horizon of the area of operations', href: `${PD}Genreal_Announcements-Super_Stockist_cum_Master_Franchisee.pdf` },
];

export const blogTitle = 'Insights & Inspiration: The Retina Retail Blog';
