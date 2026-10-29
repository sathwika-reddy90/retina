import type { ImageMetadata } from 'astro';
import shadesJson from './shades.json';
import livingRoom from '@/assets/rooms/living-room.png';
import bedroom from '@/assets/rooms/bedroom.png';
import kidsRoom from '@/assets/rooms/kids-room.png';
import kitchen from '@/assets/rooms/kitchen.png';
import dining from '@/assets/rooms/dining.png';
import apartment from '@/assets/rooms/apartment.png';
import house from '@/assets/rooms/house.png';

export interface Shade {
  code: string;
  hex: string;
  rgb: string;
  name?: string;
}
export interface Strip {
  id: string;
  family: FamilyId;
  shades: Shade[];
}
export type FamilyId =
  | 'reds'
  | 'oranges'
  | 'yellows'
  | 'greens'
  | 'blue-greens'
  | 'blues'
  | 'pinks-purples'
  | 'earths'
  | 'neutrals';

/**
 * All 1,002 shades from the live catalogue (/color-documents/colors-all.xml),
 * grouped into their 7-shade strips. Families are a browsing aid derived from
 * each strip's colour values; they are not official Retina collections.
 */
export const strips = shadesJson as Strip[];
export const shadeCount = strips.reduce((n, s) => n + s.shades.length, 0);

export const families: { id: FamilyId; label: string }[] = [
  { id: 'reds', label: 'Reds' },
  { id: 'oranges', label: 'Oranges' },
  { id: 'yellows', label: 'Yellows' },
  { id: 'greens', label: 'Greens' },
  { id: 'blue-greens', label: 'Blue Greens' },
  { id: 'blues', label: 'Blues' },
  { id: 'pinks-purples', label: 'Pinks & Purples' },
  { id: 'earths', label: 'Earth Tones' },
  { id: 'neutrals', label: 'Neutrals & Greys' },
];

export const familySwatch = (id: FamilyId) => {
  const s = strips.find((x) => x.family === id)!;
  return s.shades[Math.min(2, s.shades.length - 1)].hex;
};

export const findShade = (code: string) => {
  for (const s of strips) for (const sh of s.shades) if (sh.code === code) return { ...sh, family: s.family };
  return undefined;
};

export interface Room {
  id: string;
  label: string;
  image: ImageMetadata;
  kind: 'interior' | 'exterior';
}

// Room overlays from the live visualisers (homepage and /colors/).
export const rooms: Room[] = [
  { id: 'living-room', label: 'Living Room', image: livingRoom, kind: 'interior' },
  { id: 'bed-room', label: 'Bed Room', image: bedroom, kind: 'interior' },
  { id: 'kids-room', label: 'Kids Room', image: kidsRoom, kind: 'interior' },
  { id: 'kitchen', label: 'Kitchen', image: kitchen, kind: 'interior' },
  { id: 'dining', label: 'Dining', image: dining, kind: 'interior' },
  { id: 'apartment', label: 'Apartment', image: apartment, kind: 'exterior' },
  { id: 'house', label: 'House', image: house, kind: 'exterior' },
];

/** Default preview colour on the live Colours page. */
export const DEFAULT_SHADE = 'QC0131';
