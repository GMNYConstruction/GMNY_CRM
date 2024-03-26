import { Accidents, UsersType} from "@/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const setNewUser = createAsyncThunk("create new user", async (payload: {newUser : UsersType} , thunk) =>{
    
    const {
        newUser,
    } = payload
 
    try { 
        return newUser;
    } catch (e){
        console.log(e);
    }

});

