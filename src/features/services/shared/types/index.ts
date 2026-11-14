export type ServiceCategorySlug =
  | 'business' | 'taxes' | 'certificates' | 'health' | 'social' | 'agriculture'
  | 'infrastructure' | 'environment' | 'safety' | 'employment' | 'youth' | 'governance';

export interface Service {
  slug: string;
  title: string;
  office: string;
  officeCode: string;
  category: ServiceCategorySlug;
  classification: string;
  transactionType: string;
  whoMayAvail: string;
  description: string;
  summary: string;
  fees: string;
  pdfs: string[];
  sourceUrl: string;
  lastVerified: string;
  dataNote?: string;
}

export interface ServiceCategory {
  slug: ServiceCategorySlug;
  name: string;
  shortName: string;
  icon: string;
  description: string;
  examples: string[];
  serviceCount: number;
}

export interface OnlineService {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  url: string;
  category: string;
  note?: string;
}
