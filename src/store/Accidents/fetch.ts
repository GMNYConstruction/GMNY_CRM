import { Accidents, CommentType, UsersType } from "@/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getApiResponse } from "@/utils/getApiResponse";

export const fetchAccidents = createAsyncThunk("fetch accidents", async (store, thunk) =>{
    const {accidents: accidentStore} = thunk.getState() as any;
    const accidents = await getApiResponse({apiRoute: "/api/getAllAccidents", body: {page: accidentStore.page}});
    // const comments = await getApiResponse({apiRoute: "/api/getAllComments"});
    // const users = await getApiResponse({apiRoute: "/api/getAllUsers"});

    // const adaptedResponse = accidents.map((accident:Accidents) => {
    //     const correspondingComments = comments.filter((comment:CommentType) => comment.caseid === accident.id);
    //     return {
    //         ...accident,
    //         comments: correspondingComments?.map((comment: CommentType) => {
    //             const commentUser = users.find((user: UsersType)=> comment.userid === user.id)
    //             return {
    //                 ...comment,
    //                 user: commentUser,
    //             }
    //         })
    //     }
    // })

    return accidents;
});