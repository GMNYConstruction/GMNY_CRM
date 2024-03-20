import { createSlice, configureStore } from '@reduxjs/toolkit'
import allAccidents from './Accidents'
import allUsers from './Users'

export const store = configureStore({
    reducer: {
        users: allUsers,
        accidents: allAccidents,
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const getAccidents = (state:RootState) => state.accidents;
export const getUsers = (state:RootState) => state.users;
