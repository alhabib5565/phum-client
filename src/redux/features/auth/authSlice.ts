import { createSlice } from "@reduxjs/toolkit";

type TInitalState = {
    user: null | object
    token: null | string
}

const initialState: TInitalState = {
    user: null,
    token: null
}

const authSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user
            state.user = action.payload.token
        },
        logOut: (state) => {
            state.user = null
            state.token = null
        }
    }
})

export default authSlice.reducer
