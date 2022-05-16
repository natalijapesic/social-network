import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../stores/store";
import { PostModel } from "../../models";
import postService from "./api/postService";
import { LikeModel, PageRequest, PostState } from "./types";


const initialState: PostState =
{
    posts: [],
    status: 'idle',
    error: undefined,
}
                                       
export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async (request: PageRequest) => {
        const response = await postService.get(request);
        return response.data;
    });

export const addPost = createAsyncThunk(
    'posts/addPost',
    async (newPost: PostModel) => {
        const response = await postService.add(newPost);
        return response.data;
    });

export const likePost = createAsyncThunk(
    'posts/likePost',
    async (request: LikeModel) => {
        const response = await postService.like(request);
        return response.data;
    });


const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postCreated: {
            reducer(state, action: PayloadAction<PostModel>) {
                state.posts.push(action.payload);
            },
            prepare(description, title, imageUrl, authorName, userId) {
                return {
                    payload: new PostModel(title, authorName, imageUrl, description, userId)
                }
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.posts = action.payload;
                state.status = 'succeeded';
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                console.log(action);
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addPost.fulfilled, (state, action: PayloadAction<PostModel>) => {
                action.payload.date = new Date().toUTCString();
                action.payload.likes = 0;
                state.posts.push(action.payload)
                state.status = 'succeeded';
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

                if (postFromState) {
                    postFromState.likes = likedPost.likes
                    postFromState.usersLikes = [...likedPost.usersLikes];
                }
                state.status = 'succeeded';
            })
    }
});

export const selectAllPosts = (state: RootState) => state.posts.posts;
export const getPostsStatus = (state: RootState) => state.posts.status;
export const getPostsError = (state: RootState) => state.posts.error;

export const { postCreated } = postSlice.actions;
export default postSlice.reducer;