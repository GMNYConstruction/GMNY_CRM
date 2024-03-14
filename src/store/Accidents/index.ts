import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  accidents: [{
    name: 'he'
  }],
};

export const allAccidents = createSlice({
    name: "allAccidents",
    initialState,
    reducers: {

    }
})
 

export default allAccidents.reducer;