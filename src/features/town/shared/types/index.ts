export interface CityStats {
  label: string;
  value: string;
  note: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  text: string;
}

export interface CityFact {
  label: string;
  value: string;
  note?: string;
}

export interface FactGroup {
  title: string;
  facts: CityFact[];
}
