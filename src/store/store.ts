import { createSlice, configureStore } from '@reduxjs/toolkit'
import counterReducer from "./slice"
import allAccidents from './Accidents'

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        accidents: allAccidents,
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const getAccidents = (state:RootState) => state.accidents;
