import { apiClient } from './client';
import type { SearchParams, HistogramResponse, SearchResultResponse } from '../types/search';

export const searchAPI = {
  getHistograms: async (params: SearchParams): Promise<HistogramResponse> => {
    const requestBody = buildSearchRequest(params);
    const response = await apiClient.post<HistogramResponse>('/objectsearch/histograms', requestBody);
    return response.data;
  },
  searchObjects: async (params: SearchParams): Promise<SearchResultResponse> => {
    const requestBody = buildSearchRequest(params);
    const response = await apiClient.post<SearchResultResponse>('/objectsearch', requestBody);
    return response.data;
  },
};

function buildSearchRequest(params: SearchParams) {
  return {
    issueDateInterval: {
      startDate: `${params.startDate}T00:00:00+03:00`,
      endDate: `${params.endDate}T23:59:59+03:00`,
    },
    searchContext: {
      targetSearchEntitiesContext: {
        targetSearchEntities: [
          {
            type: 'company',
            sparkId: null,
            entityId: null,
            inn: parseInt(params.inn),
            maxFullness: params.maxFullness,
            inBusinessNews: params.inBusinessNews,
          },
        ],
        onlyMainRole: params.onlyMainRole,
        tonality: params.tonality,
        onlyWithRiskFactors: params.onlyWithRiskFactors,
        riskFactors: { and: [], or: [], not: [] },
        themes: { and: [], or: [], not: [] },
      },
      themesFilter: { and: [], or: [], not: [] },
    },
    searchArea: {
      includedSources: [],
      excludedSources: [],
      includedSourceGroups: [],
      excludedSourceGroups: [],
    },
    attributeFilters: {
      excludeTechNews: params.excludeTechNews,
      excludeAnnouncements: params.excludeAnnouncements,
      excludeDigests: params.excludeDigests,
    },
    similarMode: 'duplicates',
    limit: params.limit,
    sortType: 'sourceInfluence',
    sortDirectionType: 'desc',
    intervalType: 'month',
    histogramTypes: ['totalDocuments', 'riskFactors'],
  };
}