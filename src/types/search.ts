export interface SearchParams {
  inn: string;
  maxFullness: boolean;
  inBusinessNews: boolean | null;
  onlyMainRole: boolean;
  tonality: 'any' | 'negative' | 'positive';
  onlyWithRiskFactors: boolean;
  excludeTechNews: boolean;
  excludeAnnouncements: boolean;
  excludeDigests: boolean;
  startDate: string;
  endDate: string;
  limit: number;
}

export interface HistogramData {
  data: {
    date: string;
    value: number;
  }[];
  histogramType: 'totalDocuments' | 'riskFactors';
}

export interface HistogramResponse {
  data: HistogramData[];
}

export interface SearchResultItem {
  encodedId: string;
  influence: number;
  similarCount: number;
}

export interface SearchResultResponse {
  items: SearchResultItem[];
  mappings: any[];
}
