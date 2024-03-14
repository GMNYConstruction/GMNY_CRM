import { createSlice, configureStore } from '@reduxjs/toolkit'
import counterReducer from "./slice"
import allAccidents from './Accidents'

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        accidets: allAccidents,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch