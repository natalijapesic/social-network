import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { PostModel } from "./post";
import axios from '../axiosSetUp'



interface PostState{
    posts: PostModel[],
    status: string;
    error: string | undefined
}

const initialState: PostState =
{
    posts: [],
    status: 'idle',
    error: undefined
}
                                       
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get<PostModel[]>(`/posts`);
    return response.data
});

export const addNewPost = createAsyncThunk(
    'posts/addNewPost', 
    async (newPost: PostModel) => {
    const response = await axios.post<PostModel>(`/posts`, JSON.stringify(newPost));
    return response.data;
});

export const likePost = createAsyncThunk(
    'posts/likePost', 
    async (likedPost: PostModel) => {
    const response = await axios.put(`/posts`, JSON.stringify(likedPost));
    return response.data;
});


const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action: PayloadAction<PostModel>){
                state.posts.push(action.payload);
            },
            prepare(description, title, imageUrl, authorName){
                return {
                    payload: new PostModel(title, authorName, imageUrl, description)
                }
            }
        }
    },
    extraReducers(builder){
        builder
        .addCase(fetchPosts.pending, (state) =>{
            state.status = 'loading';
        })
        .addCase(fetchPosts.fulfilled, (state, action) =>{
            state.status = 'succeeded';
            state.posts = action.payload;
        })
        .addCase(fetchPosts.rejected, (state, action) =>{
            state.status = 'failed';
            state.error = action.error.message;
        })
        .addCase(addNewPost.fulfilled, (state, action: PayloadAction<PostModel>) => {
            action.payload.date = new Date().toUTCString();
            action.payload.likes = 0;
            state.posts.push(action.payload)
        })
        .addCase(likePost.fulfilled, (state, action: PayloadAction<PostModel>) => {
            state.posts.push(action.payload)
        })
    }
})

export const selectAllPosts = (state: RootState) => state.posts.posts;
export const getPostsStatus = (state: RootState) => state.posts.status;
export const getPostsError = (state: RootState) => state.posts.error;

export const { postAdded } = postSlice.actions;
export default postSlice.reducer;