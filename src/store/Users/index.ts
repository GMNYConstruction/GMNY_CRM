import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers } from './fetch'; 

const initialState = {
  users: [] as any,
  fetchedUser:false,
  loadingUser:false,
  errorUser:false,
};

export const allUsers = createSlice({
    name: "allUsers",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.fetchedUser = true;
        state.loadingUser = false;
        state.errorUser = false;
      });
      builder.addCase(fetchUsers.rejected, (state, action) => {
        state.fetchedUser = true;
        state.loadingUser = false;
        state.errorUser = true;
      });
      builder.addCase(fetchUsers.pending, (state, action) => {
        state.fetchedUser = false;
        state.errorUser = false;
        state.loadingUser = true;
      });
    }
})
 

export default allUsers.reducer;