import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../stores/store";
import { UserModel } from "../../models";
import authService from "./api/authService";
import { AuthState, SignInRequest, SignUpRequest, UserResponse } from "./types";
import storeService from "../../storeService";

const initialState: AuthState = {
  user: null,
  status: "idle",
  error: undefined,
};

export const signIn = createAsyncThunk(
  "user/signInUser",
  async (request: SignInRequest) => {
    const response = await authService.signIn(request);
    return response.data;
  }
);

export const signUp = createAsyncThunk(
  "user/signUpUser",
  async (request: SignUpRequest) => {
    const response = await authService.signUp(request);
    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signOut: (state) => {
      storeService.signOut();
      state.status = "idle";
      state.user = null;
      state.error = undefined;
    },
    refreshUserStore: (state, action: PayloadAction<UserModel>) => {
      state.user = action.payload;
      console.log(action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(
        signIn.fulfilled,
        (state, action: PayloadAction<UserResponse>) => {
          state.status = "succeeded";
          state.user = action.payload.user;
        }
      )
      .addCase(
        signUp.fulfilled,
        (state, action: PayloadAction<UserResponse>) => {
          state.status = "succeeded";
          action.payload.user.isAdmin = false;
          state.user = action.payload.user;
        }
      )
      .addCase(signUp.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(signUp.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signIn.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { signOut, refreshUserStore } = userSlice.actions;

export const getAuthUser = (state: RootState) => state.auth.user;
export const getAuthStatus = (state: RootState) => state.auth.status;

export default userSlice.reducer;
