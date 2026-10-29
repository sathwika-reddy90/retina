import type { ImageMetadata } from 'astro';

import weatherExpert from '@/assets/products/weather-expert.png';
import expoUltimax from '@/assets/products/expo-ultimax.png';
import expoAdvanced from '@/assets/products/expo-advanced.png';
import royalVogue from '@/assets/products/royal-vogue.png';
import glowPremium from '@/assets/products/glow-premium.png';
import glowAdvanced from '@/assets/products/glow-advanced.png';
import zing from '@/assets/products/zing.png';
import spark from '@/assets/products/spark.png';
import eye from '@/assets/products/eye.png';
import ecoDamp from '@/assets/products/eco-damp.png';
import ecoAdvanced from '@/assets/products/eco-advanced.png';
import jetAdvanced from '@/assets/products/jet-advanced.png';
import xGen from '@/assets/products/x-gen.png';
import redOxide from '@/assets/products/red-oxide.png';
import woodPrimer from '@/assets/products/wood-primer.png';
import coarsePutty from '@/assets/products/coarse-putty.png';
import wallFix from '@/assets/products/wall-fix.png';
import texture from '@/assets/products/texture.png';
import elitePu from '@/assets/products/elite-pu-quick-dry.png';
import eliteSheen from '@/assets/products/elite-high-sheen.png';

import catExterior from '@/assets/categories/exterior-emulsions.jpg';
import catInterior from '@/assets/categories/interior-emulsions.jpg';
import catWaterproof from '@/assets/categories/waterproof-primers.jpg';
import catWaterbased from '@/assets/categories/waterbased-primers.jpg';
import catOilbased from '@/assets/categories/oil-based-primers.jpg';
import catPutty from '@/assets/categories/putty.jpg';

export type CategoryId =
  | 'exterior-emulsions'
  | 'interior-emulsions'
  | 'distempers'
  | 'waterproof-primers'
  | 'waterbased-primers'
  | 'oilbased-primers'
  | 'enamels'
  | 'putty';

export interface Category {
  id: CategoryId;
  name: string;
  /** Singular label used on product cards. */
  label: string;
  /** Second half of the category heading used on the live product pages. */
  tagline?: string;
  image?: ImageMetadata;
  family: 'Emulsions' | 'Primers' | 'Distempers' | 'Enamels' | 'Putty / Texture';
}

export const categories: Category[] = [
  { id: 'exterior-emulsions', name: 'Exterior Emulsions', label: 'Exterior Emulsion', tagline: 'Beauty That Lasts, Protection That Endures', image: catExterior, family: 'Emulsions' },
  { id: 'interior-emulsions', name: 'Interior Emulsions', label: 'Interior Emulsion', tagline: 'Elegance & Durability for Your Walls', image: catInterior, family: 'Emulsions' },
  { id: 'distempers', name: 'Distempers', label: 'Distemper', family: 'Distempers' },
  { id: 'waterproof-primers', name: 'Water Proof Primers', label: 'Waterproof Primer', tagline: 'Stronger Foundation, Lasting Protection', image: catWaterproof, family: 'Primers' },
  { id: 'waterbased-primers', name: 'Water Based Primers', label: 'Water-Based Primer', tagline: 'Smooth Base, Superior Finish', image: catWaterbased, family: 'Primers' },
  { id: 'oilbased-primers', name: 'Oil Based Primers', label: 'Oil-Based Primer', tagline: 'Strong Adhesion, Ultimate Protection', image: catOilbased, family: 'Primers' },
  { id: 'enamels', name: 'Enamels', label: 'Enamel', family: 'Enamels' },
  { id: 'putty', name: 'Putty / Texture', label: 'Putty / Texture', tagline: 'The Perfect Base for a Flawless Finish', image: catPutty, family: 'Putty / Texture' },
];

export interface Product {
  slug: string;
  /** Detail page route, mirroring the live URL. null where the live site has no working page. */
  href: string | null;
  name: string;
  category: CategoryId;
  /** Heading used on the live product page, e.g. "Exterior Emulsions – Beauty That Lasts, …". */
  pageHeading?: string;
  subtitle?: string;
  /** One-line card summary, condensed from the product's own description. */
  summary?: string;
  description: string[];
  warranty?: number;
  features: string[];
  specs: [label: string, value: string][];
  sheet?: string;
  related: string[];
  image: ImageMetadata;
  /** Source discrepancies found during the content audit (not rendered). */
  notes?: string[];
}

const EXTERIOR_HEADING = 'Exterior Emulsions – Beauty That Lasts, Protection That Endures';
const INTERIOR_HEADING = 'Interior Emulsions – Elegance & Durability for Your Walls';
const WATERPROOF_HEADING = 'Waterproof Primers – Stronger Foundation, Lasting Protection';
const WATERBASED_HEADING = 'Water-Based Primers – Smooth Base, Superior Finish';
const OILBASED_HEADING = 'Oil-Based Primers – Strong Adhesion, Ultimate Protection';
const PUTTY_HEADING = 'Putty & Textures – The Perfect Base for a Flawless Finish';

const TECH = 'https://retinapaints.com/technical-docs/';

export const products: Product[] = [
  {
    slug: 'weather-expert',
    href: '/products/emulsion/whether-expert/',
    name: 'Weather Expert',
    category: 'exterior-emulsions',
    pageHeading: EXTERIOR_HEADING,
    summary: 'Weather proof exterior emulsion with waterproof and anti-dust technology.',
    description: [
      'Weather Expert: So far Retina Paints introduced lot of quality and successful products in the market. Now the technical team of Retina Paints proudly introducing waterproof and anti dust technology Weather Proof Exterior emulsion, which will protect your walls from water and dust particles under it’s name “Weather Expert”.',
      'Weather Expert is technically proven for water resistance and dirt pick up performance.',
      'Now our Retina Management is happy in introducing “Retina Weather Expert” to its dealers.',
    ],
    warranty: 8,
    features: ['Anti-fungal', 'Anti-algal', 'Dust resistance', 'Kills germs', 'Low odour', 'Luxury finish'],
    specs: [
      ['Type', 'Emulsion'],
      ['Category', 'Exterior'],
      ['Form', 'Ready to use viscous liquid'],
      ['*Coverage capacity', '120-140 sft. /Litre/single coat and 60-70 sft. /Litre/2 coats'],
      ['Thinning', '20-30% of water'],
      ['Gloss levels', 'Sheen'],
      ['Dry time', '3-4 Hrs'],
      ['Pot life of thinned material', 'Within 24 Hrs'],
      ['Washable', 'High'],
      ['Fire hazard class', 'Non-flammable'],
    ],
    sheet: `${TECH}Product%20S%20-%20Weather%20Expert.pdf`,
    related: ['eco-damp', 'expo-ultimax', 'expo-advanced'],
    image: weatherExpert,
  },
  {
    slug: 'expo-ultimax',
    href: '/products/emulsion/expo-ultimax/',
    name: 'Expo Ultimax',
    category: 'exterior-emulsions',
    pageHeading: EXTERIOR_HEADING,
    subtitle: 'Premium Exterior Emulsion',
    summary: 'A modified acrylic smooth emulsion with silicon additives for an anti-algal, high performance exterior finish.',
    description: [
      'Retina paints introducing EXPO ULTIMAX',
      'EXPO ULTIMAX is a water-based, modified acrylic smooth emulsion with silicon additives that offers an anti-algal and high performance exterior wall finish.',
      'EXPO ULTIMAX uses specially formulated high performance colour pigments and binder technology, which offer excellent resistance to ultraviolet radiation. This ensures brighter, cleaner shades that will not fade, ensure your home continues to look beautiful over time. EXPO ULTIMAX contains an advanced Anti-algal Formula which fights the formation of algae and keeps away ugly black spots from your walls. EXPO ULTIMAX offers excellent sheen, giving your newly painted home a classy finish.',
    ],
    warranty: 5,
    features: ['Anti-algal', 'Anti-fungal', 'Dust resistance', 'Kills germs', 'Low odour', 'Luxury finish'],
    specs: [
      ['Type', 'Emulsion'],
      ['Category', 'Exterior'],
      ['Form', 'Ready to use viscous liquid'],
      ['*Coverage capacity', '120-140 sft. /Litre/single coat and 60-70 sft. /Litre/2 coats'],
      ['Thinning', '20-30% of water'],
      ['Gloss levels', 'Sheen'],
      ['Dry time', '3-4 Hrs'],
      ['Pot life of thinned material', 'Within 24 Hrs'],
      ['Washable', 'High'],
      ['Fire hazard class', 'Non-flammable'],
    ],
    sheet: `${TECH}Product%20S%20-%20Expo%20Ultimax.pdf`,
    related: ['weather-expert', 'expo-advanced', 'royal-vogue'],
    image: expoUltimax,
    notes: ['Warranty badge image reads 5 years; its alt text on the live site reads "3 Year Warranty".'],
  },
  {
    slug: 'expo-advanced',
    href: '/products/emulsion/expo/',
    name: 'Expo Advanced',
    category: 'exterior-emulsions',
    pageHeading: EXTERIOR_HEADING,
    subtitle: 'Exterior Emulsion',
    summary: 'A highly durable exterior paint specially formulated to withstand extreme Indian tropical conditions.',
    description: [
      'It is a high performance, highly durable exterior paint specially formulated to withstand extreme Indian tropical conditions. Retina Expo acts as a nutrient for your walls and is highly protective and prevents the growth of Algae and Fingi. It offers excellent protection from UV degradation.',
    ],
    warranty: 3,
    features: ['Anti-bacterial', 'Dust resistance', 'Kills germs', 'Low odour', 'Luxury finish'],
    specs: [
      ['Type', 'Emulsion'],
      ['Category', 'Exterior'],
      ['Form', 'Ready to use viscous liquid'],
      ['*Coverage capacity', '100 to 120 Sq. ft /Litre/single coat and 50 to 60 Sq. ft /Litre/2 coats'],
      ['Thinning', '20-30% of water'],
      ['Gloss levels', 'Matt'],
      ['Dry time', '3-4 Hrs'],
      ['Pot life of thinned material', 'Within 24 Hrs'],
      ['Washable', 'Yes'],
      ['Fire hazard class', 'Non-flammable'],
    ],
    sheet: `${TECH}Product%20S%20-%20Expo%20Advanced.pdf`,
    related: ['royal-vogue', 'expo-ultimax', 'weather-expert'],
    image: expoAdvanced,
  },
  {
    slug: 'royal-vogue',
    href: '/products/emulsion/royal-vogue/',
    name: 'Royal Vogue',
    category: 'interior-emulsions',
    pageHeading: INTERIOR_HEADING,
    subtitle: 'The luxury interior emulsion with high-sheen.',
    summary: 'The luxury interior emulsion with high-sheen.',
    description: [
      'Royal Vogue: Retina Paints prestigiously introducing into it’s basket “Royal Vogue”.',
      '“Royal Vogue” is a unique and technically proven product, which can give more sheen with washable properties and great mileage.',
      'After a lot of research, our technical team innovated the new sheen with unique washable technology emulsion and after thorough research our team approved its green condition.',
    ],
    warranty: 8,
    features: ['Anti-bacterial', 'Dust resistance', 'Kills germs', 'Low odour', 'Luxury finish'],
    specs: [
      ['Type', 'Emulsion'],
      ['Category', 'Interior'],
      ['Form', 'Ready to use viscous liquid'],
      ['*Coverage capacity', '280 to 320 sft. /Litre/single coat and 140 to 160 sft. /Litre/2 coats.'],
      ['Thinning', '20-30% of water'],
      ['Gloss levels', 'Rich sheen'],
      ['Dry time', '3-4 Hrs'],
      ['Pot life of thinned material', 'Within 24 Hrs'],
      ['Washable', 'Excellent'],
      ['Fire hazard class', 'Non-flammable'],
    ],
    sheet: `${TECH}Product%20S%20-%20Royal%20Vogu.pdf`,
    related: ['glow-premium', 'glow-advanced', 'zing'],
    image: royalVogue,
  },
  {
    slug: 'glow-premium',
    href: '/products/emulsion/glow-premium/',
    name: 'Glow Premium',
    category: 'interior-emulsions',
    pageHeading: INTERIOR_HEADING,
    subtitle: 'Premium Interior Emulsion',
    summary: 'A smooth matt finish that oozes sophistication, fortified with Stain Guard technology.',
    description: [
      'Retina paints GLOW Premium WATER BASE Emulsion has a smooth matt finish that oozes sophistication. GLOW Premium Emulsion has been fortified with Stain Guard technology that guards your walls against most household stains and ensures easy clean ability . GLOW Premium Emulsion has a long lasting film that keeps your house as good as new for a long time.',
      'GLOW Premium Emulsion is designed to protect your walls against unwanted fungus that can cause considerable damage. GLOW Premium Emulsion offers a unique range of extra deep colors that helps you highlight your home’s features better.',
    ],
    warranty: 5,
    features: ['Anti-bacterial', 'Dust resistance', 'Kills germs', 'Low odour', 'Luxury finish'],
    specs: [
      ['Type', 'Emulsion'],
      ['Category', 'Interior'],
      ['Form', 'Ready to use viscous liquid'],
      ['*Coverage capacity', '220 to 250 Sq. ft /Litre/single coat and 120 to 129 Sq. ft /Litre/2 coats.'],
      ['Thinning', '20-30% of water'],
      ['Gloss levels', 'Smooth'],
      ['Dry time', '3-4 Hrs'],
      ['Pot life of thinned material', 'Within 24 Hrs'],
      ['Washable', 'Moderate'],
      ['Fire hazard class', 'Non-flammable'],
    ],
    sheet: `${TECH}Product%20S%20-%20Glow%20Advanced.pdf`,
    related: ['royal-vogue', 'expo-ultimax', 'expo-advanced'],
    image: glowPremium,
    notes: [
      'Warranty badge image reads 5 years; its alt text on the live site reads "3 Year Warranty".',
      'The live "View More in product Sheet" link points to the Glow Advanced PDF.',
    ],
  },
  {
    slug: 'glow-advanced',
    href: '/products/emulsion/glow/',
    name: 'Glow Advanced',
    category: 'interior-emulsions',
    pageHeading: INTERIOR_HEADING,
    subtitle: 'Interior Emulsion',
    summary: 'Pure acrylic latex and high quality pigments for a luxurious smooth finish and glowing appearance.',
    description: [
      'A water-based interior emulsion produced with pure acrylic latex and high quality pigments to add luxurious smooth finish and glowing appearance to your walls. Good for all types of plasters, false ceilings, asbestos sheets, concrete etc.',
    ],
    warranty: 3,
    features: ['Anti-bacterial', 'Dust resistance', 'Kills germs', 'Low odour', 'Luxury finish'],
    specs: [
      ['Type', 'Emulsion'],
      ['Category', 'Interior'],
      ['Form', 'Ready to use viscous liquid'],
      ['*Coverage capacity', '180 to 220 Sq. ft /Litre/single coat and 120 to 140 Sq. ft /Litre/2 coats'],
      ['Thinning', '20-30% of water'],
      ['Gloss levels', 'Smooth and matt'],
      ['Dry time', '3-4 Hrs'],
      ['Pot life of thinned material', 'Within 24 Hrs'],
      ['Washable', 'Moderate'],
      ['Fire hazard class', 'Non-flammable'],
    ],
    sheet: `${TECH}Product%20S%20-%20Glow%20Advanced.pdf`,
    related: ['royal-vogue', 'expo-ultimax', 'expo-advanced'],
    image: glowAdvanced,
  },
  {
    slug: 'zing',
    href: '/products/emulsion/zing/',
    name: 'Zing+',
    category: 'interior-emulsions',
    pageHeading: INTERIOR_HEADING,
    summary: 'Interior & exterior emulsion with an excellent smooth & matt finish.',
    description: ['Retina RETINA ZING+ INTERIOR & EXTERIOR EMULSION has excellent smooth & matt finish.'],
    warranty: 2,
    features: ['Anti-bacterial', 'Dust resistance', 'Kills germs', 'Low odour', 'Luxury finish'],
    specs: [
      ['Type', 'Emulsion'],
      ['Category', 'Exterior and Interior'],
      ['Form', 'Ready to use viscous liquid'],
      ['*Coverage capacity', '200 to 220 Sq. ft /Litre/single coat and 100 to 120 Sq. ft /Litre/2 coats'],
      ['Thinning', '20-30% of water'],
      ['Gloss levels', 'Matt'],
      ['Dry time', '3-4 Hrs'],
      ['Pot life of thinned material', 'Within 24 Hrs'],
      ['Washable', 'Yes'],
      ['Fire hazard class', 'Non-flammable'],
    ],
    sheet: `${TECH}Product%20S%20-%20ZinG.pdf`,
    related: ['royal-vogue', 'expo-ultimax', 'expo-advanced'],
    image: zing,
  },
  {
    slug: 'spark',
    href: '/products/distempers/spark/',
    name: 'Spark',
    category: 'distempers',
    pageHeading: INTERIOR_HEADING,
    summary: 'Specially produced for your interior living and working spaces.',
    description: [
      'Spark specially produced for your interior living and working spaces. It makes your interiors bright and exuberant. Retina-Spark is supplied in paste form and is used for the protection and decoration of fully matured plaster work, concrete or brickwork.',
    ],
    features: ['Anti-bacterial', 'Dust resistance', 'Kills germs', 'Low odour', 'Luxury finish'],
    specs: [
      ['Type', 'Emulsion'],
      ['Category', 'Interior'],
      ['Form', 'Ready to use viscous liquid'],
      ['*Coverage capacity', '60-80 sft. /KG'],
      ['Thinning', '20 - 30% of Water'],
      ['Gloss levels', 'Sheen'],
      ['Dry time', '3-4 Hrs'],
      ['Pot life of thinned material', 'Within 24 Hrs'],
      ['Washable', 'High'],
      ['Fire hazard class', 'Non-flammable'],
    ],
    related: ['royal-vogue', 'expo-ultimax', 'expo-advanced'],
    image: spark,
    notes: ['Listed under both Interior Emulsions and Distempers on the live products page; shown once, under Distempers (as in the live navigation).'],
  },
  {
    slug: 'eye',
    href: null,
    name: 'Eye',
    category: 'distempers',
    description: [],
    features: [],
    specs: [],
    related: [],
    image: eye,
    notes: ['The live "View Product" link (/products/distempers/eye/) redirects to an image file; no product page exists.'],
  },
  {
    slug: 'eco-damp',
    href: '/products/primers/eco-damp/',
    name: 'Eco Damp',
    category: 'waterproof-primers',
    pageHeading: WATERPROOF_HEADING,
    summary: 'An exterior damp-proof primer: a fibre-reinforced elastomeric waterproof coating.',
    description: [
      'Retina Eco-damp is an exterior damp-proof primer which is a fibre-reinforced elastomeric water proof coating. Brilliant white in colour and hi-sheen properties, easy to apply.',
      'Applications are suitable for all kinds of surfaces and have good UV protection and waterproof protection.',
    ],
    warranty: 8,
    features: ['Crack bridging', 'Heat reduction', 'Water proofing', 'Mechanical strength'],
    specs: [
      ['Type', 'Primer'],
      ['Category', 'Exterior'],
      ['Form', 'Ready to use viscous liquid'],
      ['*Coverage capacity', '90-100 Sft. /Litre/single coat'],
      ['Thinning', '20% of water'],
      ['Gloss levels', 'Sheen'],
      ['Dry time', 'SD is 30 minutes and HD is 4 to 6 hours'],
      ['Pot life of thinned material', 'Within 24 Hrs'],
      ['Application temperature', '5 to 35 degrees centigrade'],
      ['Fire hazard class', 'Non-flammable'],
    ],
    sheet: `${TECH}Product%20S%20-%20Eco%20Damp.pdf`,
    related: ['eco-advanced', 'jet-advanced', 'x-gen'],
    image: ecoDamp,
  },
  {
    slug: 'eco-advanced',
    href: '/products/primers/eco/',
    name: 'Eco Advanced',
    category: 'waterproof-primers',
    pageHeading: WATERPROOF_HEADING,
    summary: 'Specially formulated for exterior walls, with better protection against UV rays.',
    description: [
      'Eco Advanced is specially formulated for exterior walls. Special high quality pigments and extenders used to add better protection against UV rays. It has got very good mechanical and binding properties to the cement .Has scrub resistance value more than 500 strokes. It gives good grip to the subsequent paint coat and enhances sticking properties of the paint.',
    ],
    features: [
      'Opacity & whiteness', 'Water resistant', 'Excellent adhesion', 'Enhances top coat finish', 'Anti-chalking',
      'Anti-bacterial', 'Dust resistance', 'Kills germs', 'Low odour', 'Luxury finish',
    ],
    specs: [
      ['Type', 'Primer'],
      ['Category', 'Exterior'],
      ['Form', 'Viscous liquid'],
      ['*Coverage capacity', '150–172 SFT/L (1 coat)'],
      ['Thinning', '30-40% of water'],
      ['Thinner recommended', 'Potable water'],
      ['Dry time', '3-4 Hrs'],
      ['Pot life of thinned material', 'Within 24 Hrs'],
      ['Flash point', 'N A'],
      ['Fire hazard class', 'Non-flammable'],
    ],
    sheet: `${TECH}Product%20S%20-%20Eco%20Advanced.pdf`,
    related: ['royal-vogue', 'expo-ultimax', 'expo-advanced'],
    image: ecoAdvanced,
    notes: ['The live page heading reads "Interior Emulsions – Elegance & Durability for Your Walls" although the product is listed under Water Proof Primers; the primer heading is used here.'],
  },
  {
    slug: 'jet-advanced',
    href: '/products/primers/jet/',
    name: 'Jet Advanced',
    category: 'waterbased-primers',
    pageHeading: WATERBASED_HEADING,
    summary: 'The primer of choice amongst the paint professionals, for interior and exterior use.',
    description: [
      'Jet is the primer of choice amongst the paint professionals. Jet is water coherent and is suitable for both interior and exterior use. It can be used for priming plastered walls, asbestos, brickwork etc. It makes the surface less absorbent and increases the spreading capacity. It sets fast and has good sealing properties.',
    ],
    features: [
      'Suitable for exterior', 'Opacity & whiteness', 'Excellent adhesion', 'Enhances top coat finish', 'Anti-chalking',
      'Anti-bacterial', 'Dust resistance', 'Kills germs', 'Low odour', 'Luxury finish',
    ],
    specs: [
      ['Type', 'Primer'],
      ['Category', 'Exterior'],
      ['Form', 'Ready to use viscous liquid'],
      ['*Coverage capacity', '150.69 – 172.22 SFT/L (1 coat)'],
      ['Thinning', '30-40% of water'],
      ['Thinner recommended', 'Potable water'],
      ['Pot life of thinned material', 'Within 24 Hrs'],
      ['Dry time', 'SD is 30 minutes and HD is 4 to 6 hours'],
      ['Flash point', 'N A'],
      ['Fire hazard class', 'Non-flammable'],
    ],
    sheet: `${TECH}Product%20S%20-%20Jet%20Advanced.pdf`,
    related: ['royal-vogue', 'expo-ultimax', 'expo-advanced'],
    image: jetAdvanced,
  },
  {
    slug: 'x-gen',
    href: '/products/primers/x-gen/',
    name: 'X-Gen+',
    category: 'waterbased-primers',
    pageHeading: WATERBASED_HEADING,
    summary: 'A water coherent primer suitable for both interior and exterior use.',
    description: [
      'X-gen is the primer of choice amongst the paint professionals. X-gen is water coherent and is suitable for both interior and exterior use. It can be used for priming plastered walls, asbestos, brickwork etc. It makes the surface less absorbent and increases the spreading capacity. It sets fast and has good sealing properties.',
    ],
    features: ['Anti-bacterial', 'Dust resistance', 'Kills germs', 'Low odour', 'Luxury finish'],
    specs: [
      ['Type', 'Primer'],
      ['Category', 'Exterior and interior'],
      ['Form', 'Ready to use viscous liquid'],
      ['*Coverage capacity', '120 - 150 Sft. /Litre/coat'],
      ['Thinning', '20-30% of water'],
      ['Thinner recommended', 'Potable water'],
      ['Dry time', 'SD is 1 hour and HD is 4 to 6 hours'],
      ['Pot life of thinned material', 'Within 24 Hrs'],
      ['Flash point', 'N A'],
      ['Fire hazard class', 'Non-flammable'],
    ],
    sheet: `${TECH}Product%20S%20-%20X-Gen.pdf`,
    related: ['royal-vogue', 'expo-ultimax', 'expo-advanced'],
    image: xGen,
  },
  {
    slug: 'red-oxide',
    href: '/products/metal-wood-primers/red-oxide/',
    name: 'Redoxide Metal Primer',
    category: 'oilbased-primers',
    pageHeading: OILBASED_HEADING,
    summary: 'Oil based metal primer that offers best-in-class rust protection to metal surfaces.',
    description: [
      'Retina High Performance Red Oxide Metal Primer is oil based metal primer that offers best-in-class rust protection to metal surfaces. Designed with a unique Dirt Pick Up Resistance (DPUR) property that fights dust from settling on the walls, helping them retaining the initial beauty. Gives excellent hiding and protection. It gives good coverage, so you need less material produces a smooth finish. Resists efflorescence and lime blooming with good adhesion on all cement plasters and promotes adhesion of subsequent coats.',
    ],
    features: ['Anti corrosion', 'Excellent adhesion', 'Stronger Rust Protection', 'Ready to use', 'Anti-bacterial', 'Low odour'],
    specs: [
      ['Type', 'Primer'],
      ['Form', 'Viscous liquid'],
      ['*Coverage capacity', '140–170 SFT/L/coat'],
      ['Dry time', '3-4 Hrs'],
      ['Pot life of thinned material', 'Within 24 Hrs'],
      ['Thinning', 'Mineral Turpentine Oil (MTO)'],
    ],
    related: ['royal-vogue', 'expo-ultimax', 'expo-advanced'],
    image: redOxide,
  },
  {
    slug: 'wood-primer',
    href: '/products/metal-wood-primers/wood-primers/',
    name: 'Wood Primer',
    category: 'oilbased-primers',
    pageHeading: OILBASED_HEADING,
    summary: 'A specially formulated undercoat for wooden substrates.',
    description: [
      'retina Wood Primer is a specially formulated undercoat for wooden substrates, which assures strong adhesion and enhances performance of the paint film. On smooth wooden surface by brushing. retina Wood Primer is specially formulated to protect wood. It has excellent sealing and filling properties which protects wood from swelling due to absorption of moisture. It also protects finish coat from exudation of resinous matter oozing out from wood.',
    ],
    features: ['Swelling resistant', 'Moisture resistant', 'Anti-bacterial', 'Low odour'],
    specs: [
      ['Type', 'Primer'],
      ['Form', 'Viscous liquid'],
      ['*Coverage capacity', '120–140 SFT/L/coat'],
      ['Dry time', '3-4 Hrs'],
      ['Pot life of thinned material', 'Within 24 Hrs'],
    ],
    related: ['royal-vogue', 'expo-ultimax', 'expo-advanced'],
    image: woodPrimer,
  },
  {
    slug: 'elite-pu-quick-dry',
    href: null,
    name: 'Elite PU Quick Dry Enamel',
    category: 'enamels',
    description: [],
    features: [],
    specs: [],
    related: [],
    image: elitePu,
    notes: ['The live "View Product" link (/elite-pu-quick-drying-enamel/) returns 404.'],
  },
  {
    slug: 'elite-high-sheen',
    href: null,
    name: 'Elite High Sheen Synthetic Enamel',
    category: 'enamels',
    description: [],
    features: [],
    specs: [],
    related: [],
    image: eliteSheen,
    notes: ['The live "View Product" link (/elite-high-sheen-synthetic-enamel/) returns 404.'],
  },
  {
    slug: 'coarse-putty',
    href: '/coarse-putty/',
    name: 'Coarse Putty',
    category: 'putty',
    pageHeading: 'Putty / Textures – The Perfect Base for a Flawless Finish',
    summary: 'The perfect base for a flawless finish.',
    description: [
      'Retina Eco-damp is an exterior damp-proof primer which is a fibre-reinforced elastomeric waterproof coating. Brilliant white in colour and hi-sheen properties, easy to apply.',
      'Applications are suitable for all kinds of surfaces and have good UV protection and waterproof protection.',
      'Anti-carbonation properties can reduce CO2 and chloride ion diffusion does protect rebars against corrosion.',
    ],
    features: ['Anti-bacterial', 'Dust resistance', 'Kills germs', 'Low odour', 'Luxury finish'],
    specs: [
      ['Type', 'Putty'],
      ['Category', 'Exterior'],
      ['Form', 'Viscous liquid'],
      ['*Coverage capacity', '120-140 sft. /Litre/single coat and 60-70 sft. /Litre/2 coats'],
      ['Thinner Recommended', 'Portable Water.'],
      ['Thinning', '40 - 50% of Water.'],
      ['Dry time', '30 Minutes to 1 hour.'],
      ['Pot life of thinned material', 'Within 12 Hrs'],
      ['Washable', 'High'],
      ['Fire hazard class', 'Non-flammable'],
    ],
    related: ['texture', 'wall-fix', 'coarse-putty'],
    image: coarsePutty,
    notes: ['The live description is the Eco Damp primer copy, reproduced as published. Needs product copy from Retina Paints.'],
  },
  {
    slug: 'wall-fix',
    href: '/products/retina-wall-finishes/retina-wall-care/',
    name: 'Retina Wall Fix',
    category: 'putty',
    pageHeading: PUTTY_HEADING,
    summary: 'White cement based putty that provides a strong base on concrete, mortar and ceilings.',
    description: [
      'Retina wall fix is white cement based putty which provides a strong base on concrete/mortar (internal and external) and ceilings. It is applied before painting of the wall. it fills the fine pores of the walls and ceilings ,there by provide a white, smooth and dry surface for painting. Bearing water resistant it provides a protective base which prevent expensive paint flaking “retina white wall care putty” has special added polymers and more special adhesive strength which provides a strong base ensuring a longer life for the painted surface. It does not require water curing and it can even be applied on freshly plastered wall thus resulting in savings of time and cost. During repainting, the surface done up with “wall care putty” requires minimum scrubbing thus eliminating the mess of dust, which is a health hazard especially for asthmatic patients. Its superior quality makes it the first putty in India to meet the global standards.',
    ],
    features: ['Enhance durability of wall', 'Easy application', 'Excellent strength', 'Smooth finish', 'Excellent adhesion'],
    specs: [
      ['Type', 'Emulsion'],
      ['Category', 'Exterior'],
      ['Form', 'Ready to use viscous liquid'],
      ['*Coverage capacity', '120-140 sft. /Litre/single coat and 60-70 sft. /Litre/2 coats'],
      ['Thinning', '120-140 sft. /Litre/single coat and 60-70 20-30% of water'],
      ['Gloss levels', 'Sheen'],
      ['Dry time', '3-4 Hrs'],
      ['Pot life of thinned material', 'Within 24 Hrs'],
      ['Washable', 'High'],
      ['Fire hazard class', 'Non-flammable'],
    ],
    related: ['texture', 'wall-fix', 'coarse-putty'],
    image: wallFix,
    notes: ['Technical details list Type "Emulsion" and a garbled Thinning value; reproduced as published.'],
  },
  {
    slug: 'texture',
    href: '/products/spray-plasters/hitek-textures/',
    name: 'Retina Texture',
    category: 'putty',
    pageHeading: PUTTY_HEADING,
    summary: 'Perfect textures that bring out the best in aesthetics and detailing.',
    description: [
      'Your beautiful Home demands perfect textures that bring out the best in aesthetics and detailing.',
      'Whether its the interior or exterior trust Retina Paints to deliver the finest products that will last the life of your home and match your every requirements.',
    ],
    features: ['Anti-bacterial', 'Dust resistance', 'Kills germs', 'Low odour', 'Luxury finish'],
    specs: [
      ['Type', 'Putty'],
      ['Category', 'Exterior'],
      ['Form', 'Viscous liquid'],
      ['Thinning', '20-30% of water'],
      ['Gloss levels', 'Sheen'],
      ['Dry time', '3-4 Hrs'],
      ['Pot life of thinned material', 'Within 24 Hrs'],
      ['Washable', 'High'],
      ['Fire hazard class', 'Non-flammable'],
    ],
    related: ['texture', 'wall-fix', 'coarse-putty'],
    image: texture,
    notes: ['The live Coverage capacity value is empty; the row is omitted.'],
  },
];

export const surfacePreparation: [title: string, text: string][] = [
  ['Plastering', 'Newly constructed building wall surfaces must be allowed to cure completely.'],
  ['Cleaning', 'Wall surface should be free from any dust, loose paint or any oil type residues.'],
  ['Repairing', 'All cracks at corner joints, channels and parapets should be properly treated.'],
  ['Filling for cracks', 'For filling cracks use crack seal.'],
];

export const productBySlug = (slug: string) => products.find((p) => p.slug === slug);
export const categoryById = (id: CategoryId) => categories.find((c) => c.id === id)!;
export const productsIn = (id: CategoryId) => products.filter((p) => p.category === id);

/** Products shown on the live homepage carousel, in order (duplicate Eco Damp removed). */
export const homeFeatured = ['weather-expert', 'eco-damp', 'expo-advanced', 'expo-ultimax', 'x-gen'];
