import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers } from './fetch'; 
import { editUser } from './editUser';
import { UsersType } from '@/types';
import { setNewUser } from './setNewUser';

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

      builder.addCase(editUser.fulfilled, (state, action) => {
        const selectedUserIndex = state.users.findIndex((user:UsersType) => user.id === action?.payload?.id);
        state.users[selectedUserIndex] = action.payload;
        state.fetchedUser = true;
        state.loadingUser = false;
        state.errorUser = false;
      });
      builder.addCase(editUser.rejected, (state, action) => {
        state.fetchedUser = true;
        state.loadingUser = false;
        state.errorUser = true;
      });
      builder.addCase(editUser.pending, (state, action) => {
        state.fetchedUser = false;
        state.errorUser = false;
        state.loadingUser = true;
      });
  
      builder.addCase(setNewUser.fulfilled, (state, action) => { 
        state.users.unshift(action.payload);
        state.fetchedUser = true;
        state.loadingUser = false;
        state.errorUser = false;
      });
      builder.addCase(setNewUser.rejected, (state, action) => {
        state.fetchedUser = true;
        state.loadingUser = false;
        state.errorUser = true;
      });
      builder.addCase(setNewUser.pending, (state, action) => {
        state.fetchedUser = false;
        state.errorUser = false;
        state.loadingUser = true;
      });
    }
})
 

export default allUsers.reducer;