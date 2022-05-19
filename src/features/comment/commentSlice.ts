import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../stores/store";
import { CommentModel } from "../../models/comment";
import commentService from "./api/commentService";
import { CommentState } from "./types";

const initialState: CommentState = {
  list: [],
  status: "idle",
  error: undefined,
};

export const fetchComments = createAsyncThunk(
  "posts/fetchComments",
  async () => {
    const response = await commentService.get();
    return response.data;
  }
);

export const addComment = createAsyncThunk(
  "comments/addComment",
  async (newComment: CommentModel) => {
    const response = await commentService.add(newComment);
    return response.data;
  }
);

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(
        addComment.fulfilled,
        (state, action: PayloadAction<CommentModel>) => {
          action.payload.date = new Date().toUTCString();
          state.list.push(action.payload);
          state.status = "succeeded";
        }
      )
      .addCase(addComment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addComment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectAllComments = (state: RootState) => state.comments.list;
export const getCommentsStatus = (state: RootState) => state.comments.status;
export const getCommentsError = (state: RootState) => state.comments.error;

export default commentSlice.reducer;
