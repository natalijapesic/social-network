import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserModel } from "./user";
import axios from '../axiosSetUp';
import { RootState } from "../../app/store";

interface AuthState{
    
    user: UserModel | null,
    status: string,
    error: string | undefined    
}

interface SignInRequest{
    email: string,
    password: string
}

interface SignUpRequest{
    username: string,
    password: string,
    email: string,
}

interface UserResponse{
    user: UserModel,
    accessToken: string,
}
const initialState: AuthState =
{
    user: null,
    status: 'idle',
    error: undefined
}

export const signIn = createAsyncThunk(
    'user/signInUser', 
    async (request: SignInRequest) => {
    const response = await axios.post<UserResponse>('/login', JSON.stringify(request));
    return response.data
});

export const signUp = createAsyncThunk(
    'user/signUpUser', 
    async (request: SignUpRequest) => {
    const response = await axios.post<UserResponse>('/register', JSON.stringify(request));
    return response.data
});


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signOut:(state) =>{
            state.user = null;
            localStorage.removeItem("accessToken");
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

export const { signOut } = userSlice.actions;

export const getAuthUser = (state: RootState) => state.auth.user;
// export const getAuthStatus = (state: RootState) => state.auth.status;
// export const getAuthError = (state: RootState) => state.auth.error;

export default userSlice.reducer;
