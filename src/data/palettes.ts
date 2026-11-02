// Curated groupings of real Retina shades (codes from shades.json). Each mood was
// picked as the closest catalogue matches to a target palette; the catalogue gives
// these shades no official names, so only codes and colour values are shown.
import { findShade } from './colours';

export interface Mood {
  id: string;
  label: string;
  codes: string[];
}

export const moods: Mood[] = [
  { id: 'warm', label: 'Warm Neutrals', codes: ['QC1277', 'QC1136', 'QC1116', 'QC1095', 'QC1135', 'QC1154', 'QC1144', 'QC1153'] },
  { id: 'earthy', label: 'Earthy Tones', codes: ['QC1103', 'QC1102', 'QC1212', 'QC1252', 'QC1101', 'QC1231', 'QC1181', 'QC1161'] },
  { id: 'greens', label: 'Fresh Greens', codes: ['QC1015', 'QC1014', 'QC0994', 'QC0984', 'QC0953', 'QC0992', 'QC0941', 'QC0951'] },
  { id: 'blues', label: 'Elegant Blues', codes: ['QC0586', 'QC0696', 'QC0575', 'QC0654', 'QC0703', 'QC0652', 'QC0692', 'QC0761'] },
  { id: 'bold', label: 'Bold Accents', codes: ['QC0371', 'QC0271', 'QC0161', 'QC0141', 'QC0812', 'QC0391', 'QC0461', 'QC0471'] },
];

export const moodShades = (id: string) => moods.find((m) => m.id === id)!.codes.map((c) => findShade(c)!);

/** 'dark' text on light colours, 'light' text on dark ones. */
export const inkOn = (hex: string) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  return 0.299 * r + 0.587 * g + 0.114 * b > 150 ? 'dark' : 'light';
};
