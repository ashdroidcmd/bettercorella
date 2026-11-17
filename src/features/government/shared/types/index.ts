export interface Office {
  slug: string;
  name: string;
  code: string | null;
  sector: string;
  head: string;
  position: string;
  /** Other office staff as shown on the office's page, head excluded. */
  staff: { name: string; position: string }[];
  contact: string;
  email: string;
  address: string;
  locals: string;
  serviceCount: number;
  ccUrl: string;
  sourceUrl: string;
}

export interface Barangay {
  slug: string;
  name: string;
  district: string;
  districtNumber: number;
  population2024: number;
  population2020: number;
  population2015: number;
  share: string;
  change: string;
  apgr: string;
  rank: number;
  poblacion: boolean;
  punongBarangay: string;
  kagawads: string[];
  skChairperson: string | null;
  secretary: string | null;
  treasurer: string | null;
  /** Date the officials were read from the barangay's page on the municipal website. */
  officialsVerified: string | null;
  /** How the barangay got its name, in short paragraphs (our summary of the LGU page). */
  nameOrigin: string[];
  sourceUrl: string;
  dilgSourceUrl: string;
}

export interface Official {
  slug: string;
  name: string;
  role: string;
  photo: string | null;
  bioUrl: string;
  note: string;
}

export interface Hotline {
  label: string;
  numbers: string[];
  email?: string;
  note: string;
  primary?: boolean;
  /** Short label shown in the header hotline bar (e.g. "PNP"); omit to keep it off the bar. */
  short?: string;
}

export interface Agency {
  slug: string;
  /** Agency office in Corella, e.g. "PNP Corella". */
  agency: string;
  officer: string;
  position: string;
  numbers: string[];
  email: string | null;
  /** Facebook page name and link as given on the LGU page. */
  facebook: { label: string; href: string } | null;
  sourceUrl: string;
}
