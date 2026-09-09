import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { documentsAPI } from '../../api/documents';

interface InitialState {
  limit: number | null;
  used: number | null;
  isLoadingLimit: boolean;
}

const initialState: InitialState = {
  limit: null,
  used: null,
  isLoadingLimit: false,
};

export const fetchAccountInfo = createAsyncThunk(
  'documents/fetchAccountInfo',
  async (_, { rejectWithValue }) => {
    try {
      const response = await documentsAPI.getAccountInfo(); // Вы должны реализовать этот метод в api
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка');
    }
  }
);

const documentsSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccountInfo.pending, (state) => {
        state.isLoadingLimit = true;
      })
      .addCase(fetchAccountInfo.fulfilled, (state, action) => {
        state.isLoadingLimit = false;
        state.limit = action.payload.eventFiltersInfo?.companyLimit;
        state.used = action.payload.eventFiltersInfo?.usedCompanyCount;
      })
      .addCase(fetchAccountInfo.rejected, (state) => {
        state.isLoadingLimit = false;
      });
  },
});

export default documentsSlice.reducer;