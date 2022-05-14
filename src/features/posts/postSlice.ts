import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { PostModel } from "./postModel";
import axios from '../axiosSetUp'

interface PostState{
    posts: PostModel[],
    status: string;
    error: string | undefined
}

interface LikeModel{
    likedPost: PostModel,
    userId: number
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

export const addPost = createAsyncThunk(
    'posts/addPost', 
    async (newPost: PostModel) => {
    const response = await axios.post<PostModel>(`/posts`, JSON.stringify(newPost));
    return response.data;
});

export const likePost = createAsyncThunk(
    'posts/likePost', 
    async (request: LikeModel) => {
    const response = await axios.put(`/posts/${request.likedPost.id}`, JSON.stringify(request.likedPost));
    return response.data;
});


const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postCreated: {
            reducer(state, action: PayloadAction<PostModel>){
                state.posts.push(action.payload);
            },
            prepare(description, title, imageUrl, authorName, userId){
                return {
                    payload: new PostModel(title, authorName, imageUrl, description, userId)
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
        .addCase(addPost.fulfilled, (state, action: PayloadAction<PostModel>) => {
            action.payload.date = new Date().toUTCString();
            action.payload.likes = 0;
            state.posts.push(action.payload)
        })
        .addCase(addPost.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
        .addCase(addPost.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(likePost.fulfilled, (state, action: PayloadAction<PostModel>) => {
            
            const likedPost = action.payload;
            console.log(likedPost);
            let postFromState = state.posts.find(el => el.id === likedPost.id);

            if(postFromState)
            {
                postFromState.likes = likedPost.likes
                postFromState.usersLikes = [...likedPost.usersLikes];
            }
        })
    }
})

export const selectAllPosts = (state: RootState) => state.posts.posts;
export const getPostsStatus = (state: RootState) => state.posts.status;
export const getPostsError = (state: RootState) => state.posts.error;

export const { postCreated } = postSlice.actions;
export default postSlice.reducer;