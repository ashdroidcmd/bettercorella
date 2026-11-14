import type { TimelineItem } from '../types';

// Source: History page of the official municipal website, https://corella-bohol.gov.ph/history/
// (checked 2026-11-14). Wording is summarized; see the source for the full account.
export const timelineSourceUrl = 'https://corella-bohol.gov.ph/history/';

export const timeline: TimelineItem[] = [
  {
    year: 'Before 1884',
    title: 'Nug-as, a sitio of Baclayon',
    text: 'The area now called Corella was once known as Nug-as and was a sitio of the town of Baclayon.',
  },
  {
    year: '1884',
    title: 'Corella becomes a town',
    text: 'The town was established and named Corella, after a town in Navarre, Spain. Its church is dedicated to Nuestra Señora del Villar, whose feast is celebrated every April 27.',
  },
  {
    year: '1924',
    title: 'A new church',
    text: 'A new church was built for the parish of Nuestra Señora del Villar.',
  },
  {
    year: '1935',
    title: 'New Corella in Davao',
    text: 'A group of residents settled in Davao del Norte, where they founded the town of New Corella.',
  },
  {
    year: '1942–1945',
    title: 'Guerrilla headquarters',
    text: 'During the Second World War, Corella served as a guerrilla headquarters. Bohol was declared liberated on May 25, 1945.',
  },
  {
    year: '1996',
    title: 'Tarsier town of Bohol',
    text: 'In April 1996, Corella was recognized as the tarsier town of Bohol, home of the Philippine Tarsier Foundation sanctuary.',
  },
];
