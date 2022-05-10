import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { PostModel } from "./post";
import postService from "./post.service";

// https://stackoverflow.com/questions/66425645/what-is-difference-between-reducers-and-extrareducers-in-redux-toolkit
interface PostState{
    posts: PostModel[],
    status: string,
    error: string | undefined
}


const initialState: PostState =
{
    posts: [],
    status: 'idle',
    error: undefined
}
                                       
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await postService.getPosts();
    console.log(response.data)
    return response.data
});

export const addNewPost = createAsyncThunk(
    'posts/addNewPost', 
    async (initialPost: PostModel) => {
    const response = await postService.addPost(initialPost)
    return response.data
});

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: (state, action: PayloadAction<PostModel>) =>{
            state.posts.push(action.payload);
        }
    },
    extraReducers(builder){
        builder
        .addCase(fetchPosts.pending, (state) =>{
            state.status = 'loadig';
        })
        .addCase(fetchPosts.fulfilled, (state, action) =>{
            state.status = 'succeeded';
            state.posts = state.posts.concat(action.payload);
        })
        .addCase(fetchPosts.rejected, (state, action) =>{
            state.status = 'failed';
            state.error = action.error.message;
        })
    }
})

export const selecteAllPosts = (state: RootState) => state.posts.posts;
export const { postAdded } = postSlice.actions;
export default postSlice.reducer;