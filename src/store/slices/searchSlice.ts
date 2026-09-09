// src/store/slices/searchSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface SearchState {
  histograms: any[];
  documents: any[];
  isLoading: boolean;
  isLoadingMore: boolean;
  error: string | null;
  totalDocuments: number;
  loadedCount: number;
}

const initialState: SearchState = {
  histograms: [],
  documents: [],
  isLoading: false,
  isLoadingMore: false,
  error: null,
  totalDocuments: 0,
  loadedCount: 0,
};

export const fetchSearchResults = createAsyncThunk(
  'search/fetchAll',
  // ВАЖНО: Используем "_" вместо "params", чтобы убрать ошибку "не прочитано"
  async (_: any) => {
    // Имитация задержки
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Данные, которые будут отображаться
    return {
      histograms: [
        {
          histogramType: 'totalDocuments',
          data: [
            { date: '2022-01-01', value: 5 },
            { date: '2022-02-01', value: 10 },
            { date: '2022-03-01', value: 15 }
          ]
        },
        {
          histogramType: 'riskFactors',
          data: [
            { date: '2022-01-01', value: 1 },
            { date: '2022-02-01', value: 2 },
            { date: '2022-03-01', value: 3 }
          ]
        }
      ],
      documents: [],
      totalDocuments: 15,
      loadedCount: 10,
    };
  }
);

export const fetchMoreDocuments = createAsyncThunk(
  'search/fetchMore',
  async () => {
    return {
      documents: [],
      loadedCount: 0,
    };
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.isLoading = false;
        state.histograms = action.payload.histograms;
        state.documents = action.payload.documents;
        state.totalDocuments = action.payload.totalDocuments;
        state.loadedCount = action.payload.loadedCount;
      })
      .addCase(fetchSearchResults.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Ошибка загрузки данных';
      })
      .addCase(fetchMoreDocuments.fulfilled, (state, action) => {
        state.documents = [...state.documents, ...action.payload.documents];
        state.loadedCount = action.payload.loadedCount;
      });
  },
});

export default searchSlice.reducer;