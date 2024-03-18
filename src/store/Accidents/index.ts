import { createSlice } from '@reduxjs/toolkit';
import { fetchAccidents } from './fetch';
import { editAccidents } from './put';
import { Accidents } from '@/types';

const initialState = {
  accidents: [] as any,
  fetched:false,
  loading:false,
  error:false,
};

export const allAccidents = createSlice({
    name: "allAccidents",
    initialState,
    reducers: {},
    extraReducers(builder) {
      builder.addCase(fetchAccidents.fulfilled, (state, action) => {
        state.accidents = action.payload;
        state.fetched = true;
        state.loading = false;
        state.error = false;
      });
      builder.addCase(fetchAccidents.rejected, (state, action) => {
        state.fetched = true;
        state.loading = false;
        state.error = true;
      });
      builder.addCase(fetchAccidents.pending, (state, action) => {
        state.fetched = false;
        state.error = false;
        state.loading = true;
      });
      builder.addCase(editAccidents.fulfilled, (state, action) => {
        const selectedAccidentIndex = state.accidents.findIndex((accident:Accidents) => accident.id === action?.payload?.id);
        state.accidents[selectedAccidentIndex] = action.payload;

        state.fetched = true;
        state.loading = false;
        state.error = false;
      });
      builder.addCase(editAccidents.rejected, (state, action) => {
        state.fetched = true;
        state.loading = false;
        state.error = true;
      });
      builder.addCase(editAccidents.pending, (state, action) => {
        state.fetched = false;
        state.error = false;
        state.loading = true;
      });
    }
})
 

export default allAccidents.reducer;