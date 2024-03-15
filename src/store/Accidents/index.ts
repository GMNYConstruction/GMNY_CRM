import { createSlice } from '@reduxjs/toolkit';
import { fetchAccidents } from './fetch';

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
    }
})
 

export default allAccidents.reducer;