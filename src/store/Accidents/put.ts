import { Accidents, CommentType, UsersType } from "@/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getApiResponse } from "@/utils/getApiResponse";
import { RootState } from "@reduxjs/toolkit/query";
// this is how to call api:
// dispatch(editAccident({id: acciden.id}));

export const editAccidents = createAsyncThunk("edit accidents", async (payload: Accidents, thunk) =>{
    const { id, name } = payload;
    try {
        const { accidents } : {accidents : {accidents: Accidents[]}}  = thunk.getState() as any;
        const selectedAccident = accidents.accidents.find((accident:Accidents) => accident?.id === id);
        const editedAccident = {
            ...selectedAccident,
            name,
        }
        return editedAccident;
    } catch (e){
        console.log(e);
    }

});