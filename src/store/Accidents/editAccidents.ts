import { Accidents, CommentType, UsersType } from "@/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
// this is how to call api:
// dispatch(editAccident({id: acciden.id}));

export const editAccidents = createAsyncThunk("edit accidents", async (payload: Accidents, thunk) =>{
    const {  
        id,
        name,
        report,
        efroi,
        witness,
        correspondence,
        notice,
        accidentDescription,
        accidentLocation,
        backToWork,
        dateOfAccident,
        documentFolder,
        firstCheck,
        lastCheck,
        lastDayOfWork,
        companyWeWorkedFor,
        assignedToCompany,
        comments
     } = payload;
    try {
        const { accidents } : {accidents : {accidents: Accidents[]}}  = thunk.getState() as any;
        const selectedAccident = accidents.accidents.find((accident:Accidents) => accident?.id === id);
        const editedAccident = {
            ...selectedAccident,
            name,
            report,
            efroi,
            witness,
            correspondence,
            notice,
            accidentDescription,
            accidentLocation,
            backToWork,
            dateOfAccident,
            documentFolder,
            firstCheck,
            lastCheck,
            lastDayOfWork,
            companyWeWorkedFor,
            assignedToCompany,
            comments           
        }
        return editedAccident;
    } catch (e){
        console.log(e);
    }

});

