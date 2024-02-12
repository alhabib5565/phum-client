import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

type TInitalState = {
    user: null | object
    token: null | string
}

export type TUser = {
    userId: string
    role: string
    iat: number
    exp: number
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
            const { user, token } = action.payload
            state.user = user
            state.token = token
        },
        logOut: (state) => {
            state.user = null
            state.token = null
        }
    }
})

export const { setUser, logOut } = authSlice.actions

export default authSlice.reducer

export const useCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.user;