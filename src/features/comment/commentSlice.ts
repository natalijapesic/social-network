import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { CommentModel } from "./comment";


interface CommentState{
    comments: CommentModel[],
    status: string;
    error: string | undefined
}

const initialState: CommentState =
{
    comments: [],
    status: 'idle',
    error: undefined
}

export const fetchComments = createAsyncThunk('posts/fetchComments', async () => {
    const response = await axios.get<CommentModel[]>(`/posts`);
    return response.data
});

export const addComment = createAsyncThunk(
    'comments/addComment', 
    async(newComment: CommentModel) => {
        const response = await axios.post<CommentModel>('/comments', JSON.stringify(newComment));
        return response.data;
});

const commentSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers(builder){
        builder
        .addCase(fetchComments.pending, (state) =>{
            state.status = 'loading';
        })
        .addCase(fetchComments.fulfilled, (state, action) =>{
            state.status = 'succeeded';
            state.comments = action.payload;
        })
        .addCase(fetchComments.rejected, (state, action) =>{
            state.status = 'failed';
            state.error = action.error.message;
        })
        .addCase(addComment.fulfilled, (state, action: PayloadAction<CommentModel>) => {
            action.payload.date = new Date().toUTCString();
            state.comments.push(action.payload)
        })
        .addCase(addComment.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(addComment.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
    }
});