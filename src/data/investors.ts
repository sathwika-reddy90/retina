import type { ImageMetadata } from 'astro';
import documents from './investor-documents.json';
import rakeshPhoto from '@/assets/team/rakesh-dommati.jpg';
import rajithaPhoto from '@/assets/team/rajitha-koyyada.jpg';

export type DocLink = { label: string; href: string };
export type DocBlock =
  | { type: 'heading'; level: number; text: string }
  | { type: 'docs'; items: DocLink[] }
  | { type: 'embed'; src: string; file: string | null }
  | { type: 'linktable'; head: string[]; rows: DocLink[][][] };

export const investorDocuments = documents as unknown as Record<string, DocBlock[]>;

export const LODR_HEADING = 'Disclosures under Regulation 46 of LODR';

export interface Director {
  name: string;
  role: string;
  qualification: string;
  experience: string;
  photo?: ImageMetadata;
  directorships?: [entity: string, designation: string][];
}

// Directorship tables are the modal contents on the live Board of Directors page.
export const directors: Director[] = [
  {
    name: 'Rakesh Dommati',
    role: 'Managing Director',
    qualification: 'Qualification: MBA',
    experience: '16 years of experience in paint manufacturing industries.',
    photo: rakeshPhoto,
    directorships: [['Retina Retail limited', 'Director']],
  },
  {
    name: 'Rajitha Koyyada',
    role: 'Whole Time Director',
    qualification: 'Qualification: M.Sc (chemistry)',
    experience: '16 years of experience in paint manufacturing industries.',
    photo: rajithaPhoto,
  },
  {
    name: 'Arunachalam Manikandan',
    role: 'Independent Director',
    qualification: 'Company Secretary',
    experience: '29 years of experience in Secretarial Functions, particularly in meetings / Issue of Equity and Debt Securities. / Investor Grievances / Compliances.',
    directorships: [
      ['BTS Consultancy Services Private Limited', 'Director'],
      ['Shivam & Mani Associates LLP', 'Designated Partner'],
      ['M R Maniveni Foods Limited', 'Director'],
    ],
  },
  {
    name: 'Koyyala Raju',
    role: 'Independent Director',
    qualification: 'Chartered Accountant',
    experience: '15 years of experience in various fields such as Valuations, Internal Audits, Statutory Audits, Tax Audits, TP Audits, Payroll Audits, Stock Audits, etc.',
    directorships: [
      ['ASKPG Advisors LLP', 'Designated Partner'],
      ['Retina Retail Limited', 'Director'],
    ],
  },
  {
    name: 'Srikanth Somepalli',
    role: 'Independent Director',
    qualification: 'Company Secretary',
    experience: '14 years of experience in all aspects of company law, FEMA act, SEBI act and rules. His core strength is corporate-legal consultancy. Legal Due-Diligence of Mergers & Acquisitions, Business planning and setting up of joint ventures/Wholly owned subsidiaries abroad.',
    directorships: [
      ['ASKPG Advisors LLP', 'Designated Partner'],
      ['Retina Retail limited', 'Director'],
      ['RNIT AI Solutions Limited', 'Director'],
      ['Ensoftek Solutions (India) Private Limited', 'Director'],
      ['Tech ECS Limited', 'Director'],
    ],
  },
];

export const committees: { name: string; head: string[]; rows: string[][] }[] = [
  {
    name: 'Audit Committee',
    head: ['Name', 'Designation', 'Nature of Directorship'],
    rows: [
      ['Koyyala Raju', 'Chairman', 'Non-Executive / Independent Director'],
      ['Arunachalam Manikandan', 'Member', 'Non-Executive / Independent Director'],
      ['Rakesh Dommati', 'Member', 'Managing Director'],
    ],
  },
  {
    name: 'Nomination and Remuneration Committee',
    head: ['Name', 'Designation', 'Nature of Directorship'],
    rows: [
      ['Arunachalam Manikandan', 'Chairman', 'Non-Executive / Independent Director'],
      ['Srikanth Somepalli', 'Member', 'Non-Executive / Independent Director'],
      ['Koyyala Raju', 'Member', 'Non-Executive / Independent Director'],
    ],
  },
  {
    name: 'Stakeholders Relationship Committee',
    head: ['Name', 'Designation', 'Nature of Directorship'],
    rows: [
      ['Srikanth Somepalli', 'Chairman', 'Non-Executive / Independent Director'],
      ['Rajitha Koyyada', 'Member', 'Whole Time Director'],
      ['Rakesh Dommati', 'Member', 'Managing Director'],
    ],
  },
  {
    name: 'Internal Complaints Committee',
    head: ['Name', 'Designation in Committee', 'Designation'],
    rows: [
      ['Rajitha Koyyada', 'Chairman', 'Whole Time Director'],
      ['Devulapalli Bindu', 'Member', 'Senior Executive – Production'],
      ['Rakesh Dommati', 'Member', 'Managing Director'],
      ['P. Nagesh', 'Member', 'Outside Person – Social Worker'],
    ],
  },
];

export const changeOfName = {
  oldName: 'Retina Paints Private Limited',
  newName: 'Retina Paints Limited',
  effective: 'w.e.f 26th December, 2022',
};

export const investorContactPages = {
  grievance: {
    paragraphs: [
      'For investor grievances and assistance, shareholders may contact Retina Paints Limited through the official company communication channels.',
    ],
  },
  kmp: {
    paragraphs: [
      'For queries regarding material events and disclosures, please contact Retina Paints Limited through its official company communication channels.',
      'The contact details of the authorised Key Managerial Personnel (KMP) will be updated on this page following confirmation by the Company.',
    ],
  },
  iepf: {
    heading: 'Nodal Officer Information',
    paragraphs: [
      'For queries relating to the Investor Education and Protection Fund (IEPF), shareholders may contact Retina Paints Limited through its official communication channels.',
      "The details of the Company's designated Nodal Officer will be published here following official confirmation.",
    ],
  },
};
