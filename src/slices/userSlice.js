import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URL = 'https://jsonplaceholder.typicode.com/users'

const initState = {
    users: [],
    status: 'idle',
    error: null
}

export const fetchUsers = createAsyncThunk('/users/fetchUsers', async ()=>{
    const response = await axios.get(URL)
    return response.data
})

const userSlice = createSlice({
    name: 'users',
    initialState: initState,
    reducers: {
        
    },
    extraReducers(builder){
        builder.addCase(fetchUsers.fulfilled, (state, action)=>{
            state.status = 'success'
            state.users = action.payload
        })
        .addCase(fetchUsers.pending, (state, action)=>{
            state.status = 'loading'
        })
        .addCase(fetchUsers.rejected, (state, action)=>{
            state.status = 'failed'
            state.error = action.payload.message
        })
    }
})

export const AllUsers = (state)=>(state.users.users)
export const getUserStatus = (state)=>(state.users.status)
export const getUserError = (state)=>(state.users.error)

export default userSlice.reducer