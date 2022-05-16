import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../stores/store";
import { UserModel } from "../../models";
import authService from "./api/authService";
import { AuthState, SignInRequest, SignUpRequest, UserResponse } from "./types";


const initialState: AuthState =
{
    user: null,
    status: 'idle',
    error: undefined
}

export const signIn = createAsyncThunk(
    'user/signInUser', 
    async (request: SignInRequest) => {
    const response = await authService.signIn(request);
    return response.data;
});

export const signUp = createAsyncThunk(
    'user/signUpUser', 
    async (request: SignUpRequest) => {
    const response = await authService.signUp(request)
    return response.data
});


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signOut:(state) => {
            state.user = null;
        },
        refreshUserStore: (state, action: PayloadAction<UserModel>) => {
            state.user = action.payload;
        }
    },
    extraReducers(builder){
        builder
        .addCase(signIn.fulfilled, (state, action: PayloadAction<UserResponse>) =>{
            state.status = "succeeded";
            action.payload.user.isAdmin = false;
            state.user = action.payload.user;
        })
        .addCase(signUp.fulfilled, (state, action: PayloadAction<UserResponse>) =>{
            state.status = "succeeded";
            action.payload.user.isAdmin = false;
            state.user = action.payload.user;
        })
    }
})

export const { signOut, refreshUserStore } = userSlice.actions;

export const getAuthUser = (state: RootState) => state.auth.user;
export const getAuthStatus = (state: RootState) => state.auth.status;
export const getAuthError = (state: RootState) => state.auth.error;

export default userSlice.reducer;
