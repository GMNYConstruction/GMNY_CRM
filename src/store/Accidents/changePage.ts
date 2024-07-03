import { createAsyncThunk } from "@reduxjs/toolkit";

export const editPage = createAsyncThunk("edit page", async (payload: {page: number}, thunk) =>{
    const { page } = payload;
    try {
        return page || 1
    } catch (e){
        console.log(e);
    }
});

