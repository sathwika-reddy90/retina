// Company, contact and navigation data. All values are taken verbatim from
// www.retinapaints.com (crawled 29 Oct 2026). Where the live site states the
// same fact differently on different pages, each version is kept with a note.

export const company = {
  name: 'Retina Paints Limited',
  shortName: 'Retina Paints',
  tagline: 'Bringing Colors to Life with Innovation & Quality',
  intro:
    'Retina Paints Ltd. is a trusted name in the paint industry, offering high-quality, eco-friendly, and long-lasting paints for homes and businesses. With a commitment to excellence, we blend technology and artistry to transform spaces.',
  footerAbout:
    'Retina Paints Limited, an ISO 9001:2015 certified company, delivers high-quality paints with innovation and sustainability. With a strong manufacturing base and a commitment to excellence, we bring vibrant colors to every space.',
  cin: 'L24232TG2010PLC071018',
  incorporated: '01/11/2010',
};

export const phones = ['040-27205580', '040-27205590'];
export const franchisePhone = '7755891188';

export const emails = {
  info: 'info@retinapaints.com',
  careers: 'careers@retinapaints.com',
  franchise: 'franchisee@retinapaints.com',
  investors: 'cs@retinapaints.com',
};

// Footer wording on the live site.
export const corporateAddress = {
  label: 'Registered and Corporate Office Address',
  lines: [
    '2nd & 3rd Floor, Phase-5, Survey No-184 & 185, IDA Cherlapally,',
    'Cherlapally main road, Medchal Malkajgiri,',
    'Hyderabad-500051, Telangana, INDIA.',
  ],
};

// Contact page wording on the live site.
export const contactPageAddress = {
  label: 'Registered and Corporate Office Address',
  lines: [
    'Block No #2, Floors 2&3,',
    'Survey No-184 & 185,',
    'Opp: Ganesh kaman, Phase-5,',
    'IDA Cherlapally, Medchel Malkajgiri,',
    'Hyderabad-500051, Telangana state INDIA.',
  ],
};

export const mapsQuery =
  'Retina Paints Limited, IDA Cherlapally, Phase-5, Hyderabad 500051, Telangana';

export const social = [
  { name: 'Facebook', href: 'https://www.facebook.com/Retina.Paints.India/', icon: 'facebook' },
  { name: 'Instagram', href: 'https://instagram.com/retinapaints', icon: 'instagram' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/retina-paints-private-limited', icon: 'linkedin' },
  { name: 'YouTube', href: 'https://www.youtube.com/@RetinaPaintsofficial', icon: 'youtube' },
] as const;

export const whatsappUrl =
  'https://api.whatsapp.com/send?phone=+917755891188&text=Kindly%20share%20more%20details';

// Homepage figures as published on the live site.
// NOTE: the franchise pop-up on the live site says "15+ cities with 100+ stores",
// the MD's message page says "100000+ Happy Clients", and the store locator lists
// 60 stores. These figures are reproduced as published; see AUDIT.md.
export const homeStats = [
  { value: '75+', label: 'Stores' },
  { value: '50+', label: 'Cities Covered' },
  { value: '10,00,000+', label: 'Happy Customers' },
];
export const experience = { value: '15+', label: 'Year Experience' };

export const homeVision = 'To color every home in India with quality and trust.';
export const homeMission = 'To provide seamless franchise opportunities with end-to-end support.';

export type NavLink = { label: string; href: string };
export type NavGroup = { title: string; href?: string; links: NavLink[] };

export const aboutNav: NavLink[] = [
  { label: 'Company Profile', href: '/about-us/company-profile/' },
  { label: 'Managing Director’s Message', href: '/about-us/managing-directors-message/' },
  { label: 'Vision & Mission', href: '/about-us/vision-mission/' },
  { label: 'History & Milestones', href: '/about-us/history-milestones/' },
  { label: 'Management Team', href: '/about-us/management-team/' },
];

// Product menu exactly as labelled in the live site's navigation.
export const productNav: NavGroup[] = [
  {
    title: 'Exterior Emulsions',
    href: '/products/#exterior-emulsions',
    links: [
      { label: 'Weather Expert', href: '/products/emulsion/whether-expert/' },
      { label: 'Expo Ultimax', href: '/products/emulsion/expo-ultimax/' },
      { label: 'Expo Advanced', href: '/products/emulsion/expo/' },
    ],
  },
  {
    title: 'Interior Emulsions',
    href: '/products/#interior-emulsions',
    links: [
      { label: 'Royal Vogue', href: '/products/emulsion/royal-vogue/' },
      { label: 'Glow Premium', href: '/products/emulsion/glow-premium/' },
      { label: 'Glow Advanced', href: '/products/emulsion/glow/' },
      { label: 'Zing +', href: '/products/emulsion/zing/' },
    ],
  },
  {
    title: 'Water Proof Primers',
    href: '/products/#waterproof-primers',
    links: [
      { label: 'Eco damp', href: '/products/primers/eco-damp/' },
      { label: 'Eco Advanced', href: '/products/primers/eco/' },
    ],
  },
  {
    title: 'Water Based Primers',
    href: '/products/#waterbased-primers',
    links: [
      { label: 'Jet Advanced', href: '/products/primers/jet/' },
      { label: 'X-gen +', href: '/products/primers/x-gen/' },
    ],
  },
  {
    title: 'Oil Based Primers',
    href: '/products/#oilbased-primers',
    links: [
      { label: 'Red Oxide', href: '/products/metal-wood-primers/red-oxide/' },
      { label: 'Wood Primers', href: '/products/metal-wood-primers/wood-primers/' },
    ],
  },
  {
    title: 'Distempers',
    href: '/products/#distempers',
    links: [{ label: 'Spark', href: '/products/distempers/spark/' }],
  },
  {
    title: 'Putty / Texture',
    href: '/products/#putty',
    links: [
      { label: 'Coarse Putty', href: '/coarse-putty/' },
      { label: 'Retina Wall fix', href: '/products/retina-wall-finishes/retina-wall-care/' },
      { label: 'Retina Textures', href: '/products/spray-plasters/hitek-textures/' },
    ],
  },
];

export const investorNav: NavGroup[] = [
  {
    title: 'Details of Business',
    links: [
      { label: 'Company Profile', href: '/about-us/company-profile/' },
      { label: 'Vision & Mission', href: '/about-us/vision-mission/' },
      { label: 'History & Milestones', href: '/about-us/history-milestones/' },
    ],
  },
  {
    title: 'Governance',
    links: [
      { label: 'Board of Directors', href: '/investor-relations/board-of-directors/' },
      { label: 'Composition Of Committees', href: '/investor-relations/composition-of-committees/' },
      { label: 'Change of Name', href: '/investor-relations/change-of-name/' },
      { label: 'Policies', href: '/investor-relations/policies/' },
    ],
  },
  {
    title: 'Financials & Filings',
    links: [
      { label: 'IPO', href: '/investor-relations/ipo/' },
      { label: 'Shareholding pattern', href: '/investor-relations/shareholding-pattern/' },
      { label: 'Financial Results', href: '/elementor-3030/' },
      { label: 'Notices', href: '/investor-relations/notices/' },
    ],
  },
  {
    title: 'Announcements',
    href: '/investor-relations/announcements/',
    links: [
      { label: 'Board', href: '/investor-relations/announcements/board/' },
      { label: 'AGM', href: '/investor-relations/announcements/agm/' },
      { label: 'EGM', href: '/egm/' },
      { label: 'Postal Ballot', href: '/postal-ballot/' },
      { label: 'Others', href: '/investor-relations/announcements/others/' },
    ],
  },
  {
    title: 'Investor Services',
    links: [
      { label: 'Contact Details for Grievance Redressal', href: '/investor-relations/contact-details-for-grievance-redressal/' },
      {
        label: 'KMP authorized information',
        href: '/investor-relations/contact-details-of-kmp-authorized-for-the-purpose-of-determining-materiality-of-an-event-or-information/',
      },
      { label: 'IEPF Related Matters', href: '/iepf-related-matters/' },
    ],
  },
];

export const footerProducts: NavLink[] = [
  { label: 'Exterior Emulsions', href: '/products/#exterior-emulsions' },
  { label: 'Interior Emulsions', href: '/products/#interior-emulsions' },
  { label: 'Water Proof Primers', href: '/products/#waterproof-primers' },
  { label: 'Water Based Primers', href: '/products/#waterbased-primers' },
  { label: 'Oil Based Primers', href: '/products/#oilbased-primers' },
  { label: 'Putty / Texture', href: '/products/#putty' },
];

export const footerCompany: NavLink[] = [
  { label: 'Company Profile', href: '/about-us/company-profile/' },
  { label: 'Vision & Mission', href: '/about-us/vision-mission/' },
  { label: 'History & Milestones', href: '/about-us/history-milestones/' },
  { label: 'Careers', href: '/current-jobs/' },
  { label: 'Board of Directors', href: '/investor-relations/board-of-directors/' },
  { label: 'Composition of Committees', href: '/investor-relations/composition-of-committees/' },
  { label: 'Management Team', href: '/about-us/management-team/' },
];

export const footerExplore: NavLink[] = [
  { label: 'Colours', href: '/colors/' },
  { label: 'Find a Store', href: '/find-a-store-near-you/' },
  { label: 'Franchise', href: '/franchise/' },
  { label: 'News & Events', href: '/news-and-events/' },
  { label: 'Investor Relations', href: '/investor-relations/' },
  { label: 'Contact', href: '/contact-us/' },
];

const LIVE_ORIGIN = 'https://www.retinapaints.com';

/**
 * Resolves a document link. PDFs in /policy-documents/ and /technical-docs/ are
 * plain files on the live server, so their origin is configurable
 * (PUBLIC_DOCS_ORIGIN; set it to an empty string when the folders are deployed
 * alongside this site). WordPress upload URLs always stay on the live origin.
 */
export function docUrl(href: string): string {
  const configured = import.meta.env.PUBLIC_DOCS_ORIGIN;
  const origin = (configured === undefined ? LIVE_ORIGIN : configured).replace(/\/$/, '');
  const url = href.trim().replace(/^http:\/\//, 'https://').replace(/ /g, '%20');
  const match = url.match(/^https:\/\/(?:www\.)?retinapaints\.com(\/(?:policy-documents|technical-docs)\/.*)$/);
  return match ? `${origin}${match[1]}` : url;
}
