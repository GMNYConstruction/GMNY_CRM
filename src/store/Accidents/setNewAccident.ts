import { Accidents} from "@/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const setNewAccident = createAsyncThunk("create new accident", async (payload: {newAccident : Accidents} , thunk) =>{
    
    const {
        newAccident,
    } = payload
 
    try { 
        return {...newAccident, comments: []};
    } catch (e){
        console.log(e);
    }

});

