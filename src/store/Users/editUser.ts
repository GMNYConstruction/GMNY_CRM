import { UsersType } from "@/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
 

export const editUser = createAsyncThunk("edit accidents", async (payload: UsersType, thunk) =>{
    const {  
        id,
        name,
        email,
        status,
        accessLvl
     } = payload;
    try {
        const { users } : {users : {users: UsersType[]}}  = thunk.getState() as any;
        const selectedUser = users.users.find((users:UsersType) => users?.id === id);
        const editedUser = {
            ...selectedUser,
            name,
            email,
            status,
            accessLvl
        }
        return editedUser;
    } catch (e){
        console.log(e);
    }

});

