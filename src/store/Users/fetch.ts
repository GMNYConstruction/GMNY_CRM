import { Accidents, CommentType, UsersType } from "@/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getApiResponse } from "@/utils/getApiResponse";

export const fetchUsers = createAsyncThunk("fetch users", async (store, thunk) =>{
 
    const users = await getApiResponse({apiRoute: "/api/getAllUsers"});

    return users;
});