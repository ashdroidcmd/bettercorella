export interface Office {
  slug: string;
  name: string;
  code: string | null;
  sector: string;
  head: string;
  position: string;
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
}
