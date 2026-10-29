import type { ImageMetadata } from 'astro';
import logo from '@/assets/brand/logo.png';
import building from '@/assets/imagery/office-building.jpg';
import colourVision from '@/assets/imagery/colour-vision.jpg';
import bse11 from '@/assets/news/bse/Retinas-Shares-got-listed-in-BSE-SME-Platform-11.jpg';
import bse2 from '@/assets/news/bse/Retinas-Shares-got-listed-in-BSE-SME-Platform-2.jpg';
import rakesh from '@/assets/team/rakesh-dommati.jpg';
import rajitha from '@/assets/team/rajitha-koyyada.jpg';
import bharath from '@/assets/team/bharath-kumar-manthri.jpg';
import prashanth from '@/assets/team/prashanth-kolipaka.jpg';
import ravi from '@/assets/team/ravi-balne.jpg';

export const companyProfile = {
  paragraphs: [
    'Retina Paints Limited, was incorporated under the Companies Act, 1956 during the year 2010. Originally the Company was incorporated as a Private Limited Company. In the year 2022, Retina Paints converted itself into a Public Limited Company in order to expand its business to new horizon.',
    'The logo of the Company is registered with the Trademarks Act, 1999.',
    'Retina Paints Limited is an ISO 9001:2015 certified company.',
    'Retina Paints Limited had established its first production facility at the rental premises at Uppal and then at Nacharam to manufacture Emulsions, Distempers, Primers etc. In 2022 the company acquired its own Land and Building at Rayaraopet near Ghatkesar, Hyderabad.',
    'Committed to being a responsible corporate citizen, Retina Paints proactively pursues strategies both within the organization and outside that bring multiple societal and environmental benefits to all stakeholders.',
    'Our innovative products and sustainable technologies are designed to meet the growing demands of our fast-changing planet, while making life easier. We are dedicated to energizing cities and communities while creating a protected, colorful world where life is improved by what we do.',
  ],
  facts: [
    { label: 'CIN', value: 'L24232TG2010PLC071018' },
    { label: 'Date of Incorporation', value: '01/11/2010' },
    {
      label: 'Registered Office',
      value: 'Block No #2, Floors 2 & 3, Survey No.184 & 185 Opp Ganesh Kaman, Phase V, IDA, Cherlapally, Hyderabad Telangana – 500051.',
    },
    {
      label: 'Registrar & Transfer Agents',
      value: 'BTS CONSULTANCY SERVICES PRIVATE LIMITED, M.S. Complex, Plot No. 8 (Near RTO, Kolathur) Sastri Nagar, Rettary, Kolathur Chennai – 600099.',
    },
  ],
  moa: { label: 'MOA AND AOA', href: 'https://retinapaints.com/policy-documents/290325_MOA_AND_AOA.pdf' },
};

export const mdMessage = {
  name: 'Rakesh Dommati',
  role: 'Managing Director',
  stat: { value: '100000+', label: 'Happy Clients' },
  title: 'Leading with Vision, Painting with Purpose',
  subtitle: 'A Message from Our Managing Director – Driving Excellence, One Stroke at a Time',
  lede: 'At Retina Paints, leadership is about creating opportunity, delivering value, and transforming the way people experience color. Join us on this vibrant journey.',
  opening:
    'At Retina Paints, our vision transcends the mere act of selling colors; we strive to create transformative experiences, enrich lives, and empower dreams with every stroke of our paint. With a strategic roadmap in place, we are diligently building a brand recognized for its consistency, convenience, and quality, all implemented through our innovative Franchisee Model.',
  approachTitle: 'Our Customer-Focused Approach',
  approachIntro: 'Our Franchisee Model ensures a seamless experience for our customers, featuring:',
  approach: [
    ['Hassle-Free Purchasing', 'Enjoy uniform pricing across all outlets, eliminating confusion and ensuring transparency.'],
    ['Standardized Warranties', 'We offer uniform warranties, giving you peace of mind no matter where you shop.'],
    ['Professional Color Consultation', 'Our experts are here to guide you in selecting the perfect shades to bring your vision to life.'],
    ['Wide Range of High-Quality Products', 'From residential to industrial applications, our extensive product line meets diverse needs.'],
    ['Computerized Billing', 'Our advanced billing processes protect your rights as a customer, ensuring accuracy and accountability.'],
  ] as [string, string][],
  sections: [
    {
      title: 'Empowering Accessibility',
      body: ['We are committed to empowering distributors and retailers across states, ensuring that Retina Paints products are accessible to every home. This initiative reflects our dedication to making quality paints available to everyone.'],
    },
    {
      title: 'Expanding Our Horizons',
      body: [
        'As we look to the future, we are excited to announce our upcoming expansion into home painting services. This new offering will provide customers with exquisite finishes at reasonable prices, complete with committed delivery timelines to transform their dream homes into a reality with ease and elegance.',
        'Additionally, we’re poised to enter the commercial and industrial segments, addressing the evolving needs of modern infrastructure with high-performance coatings and innovative solutions.',
      ],
    },
    {
      title: 'A Steady and Confident Expansion',
      body: ['Gradually yet confidently, we are expanding our footprint across India, ensuring that every city, every street, and every home experiences the distinctive quality of Retina Paints.'],
    },
    {
      title: 'A Bold Future',
      body: ['With Retina Paints leading the way, the future is bold, the journey is colorful, and our destination is excellence. Join us as we paint a brighter tomorrow together!'],
    },
  ],
  closingQuote: 'With Retina Paints leading the way, the future is bold, the journey is colorful, and our destination is excellence.',
};

export const visionMission = {
  vision:
    'The “Vision” of the Company is to ensure that everyone who uses its products derive value for money thereby making available high-quality products at a right price attractive to the consumer',
  mission: 'The “Mission” of the Company is to enlarge its presence across all regions of the country and possibly across countries.',
};

export interface Milestone {
  year: string;
  title: string;
  body: string[];
  image?: { src: ImageMetadata; alt: string; contain?: boolean };
}

// NOTE: This page dates the land and building acquisition to 2020; the
// Company Profile page says 2022. Both are reproduced as published.
export const milestones: Milestone[] = [
  {
    year: '2010',
    title: 'Incorporation',
    body: ['Retina is born'],
    image: { src: logo, alt: 'Retina Paints Limited logo', contain: true },
  },
  {
    year: '2020',
    title: 'Acquisition of own land & building.',
    body: [],
    image: { src: building, alt: 'Retina Paints Limited office building with company signage' },
  },
  {
    year: '2020',
    title: 'Added Colour Vision shades',
    body: ['The company offered a wide range of colours to its customers with Colour Vision shades and also offered its own colour dispenser to the dealers as well.'],
    image: { src: colourVision, alt: 'Retina Colour Vision shade card and colour dispenser' },
  },
  {
    year: '2022',
    title: 'Became a Public Limited Company.',
    body: ['Becoming a public limited company from a private limited company.'],
    image: { src: bse11, alt: 'Retina Paints leadership team at the BSE' },
  },
  {
    year: '2023',
    title: 'Listed in BSE SME Platform',
    body: ['Moving its entire operation to its own Land and Building.', 'Listed its Equity Shares in BSE SME Platform.'],
    image: { src: bse2, alt: 'Retina Paints management at the BSE listing ceremony' },
  },
];

export const team = [
  { name: 'Mr. Rakesh Dommati', role: 'Managing Director', photo: rakesh },
  { name: 'Mrs. Rajitha Koyyada', role: 'Whole Time Director', photo: rajitha },
  { name: 'Mr. CA Bharath Kumar Manthri', role: 'Chief Financial Officer', photo: bharath },
  { name: 'Mr. Prashanth Kolipaka', role: 'Vice President (Sales & Marketing)', photo: prashanth },
  { name: 'Mr. Ravi Balne', role: 'National Sales Manager', photo: ravi },
];

export const whyChooseUs = {
  eyebrow: 'Why Choose Us?',
  title: 'Innovation Meets Durability – Your Walls Deserve the Best',
  intro:
    'At Retina Paints, we blend advanced technology with rich colors to bring you high-quality, long-lasting paints. Here’s why we are the preferred choice for thousands of customers.',
  items: [
    {
      icon: 'cloud-rain',
      title: 'Advanced Weather Protection',
      body: 'Our exterior emulsions are designed to withstand extreme weather conditions, protecting your walls from rain, UV rays, and dust.',
    },
    {
      icon: 'palette',
      title: 'Rich & Vibrant Colors',
      body: 'Our paints are formulated with high-quality pigments, ensuring deep, rich, and long-lasting colors that enhance your space.',
    },
    {
      icon: 'leaf',
      title: 'Low VOC & Eco-Friendly',
      body: 'We care about the environment! Our paints are low in volatile organic compounds (VOC), ensuring safer air quality indoors.',
    },
    {
      icon: 'layers',
      title: 'Wide Range of Products',
      body: 'From emulsions to primers, enamels, and textures, we offer a complete range of products for homes, offices, and commercial spaces.',
    },
  ],
};
