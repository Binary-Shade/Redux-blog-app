import { createAsyncThunk, createEntityAdapter, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";

const URL = 'https://jsonplaceholder.typicode.com/posts/';

// Async thunks
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    try {
        console.log('triggers');
        const response = await axios.get(URL);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;  // Throw error for `rejected` to catch
    }
});

export const addPost = createAsyncThunk('posts/addPost', async (initPost) => {
    try {
        const response = await axios.post(URL, initPost);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
});

export const updatePost = createAsyncThunk('posts/updatePost', async (initPost) => {
    const { id } = initPost;

    try {
        const response = await axios.put(`${URL}/${id}`, initPost);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
});

export const deletePost = createAsyncThunk('posts/deletePost', async (postId) => {
    const post_url = `${URL}${postId}`
    try {
        const response = await axios.delete(post_url);
        console.log(response);
        return postId
    } catch (error) {
        console.error(error);
        throw error;
    }
});

// Entity adapter
const postAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.date)  // Fix typo
});

// Initial state
const initState = postAdapter.getInitialState({
    status: 'idle',
    error: null
});

// Slice
const postSlice = createSlice({
    name: 'posts',
    initialState: initState,
    reducers: {
        addReaction(state, action) {
            const { postId } = action.payload;
            const existingPost = state.entities[postId];
            if (existingPost) {
                existingPost.liked = !existingPost.liked;
                existingPost.likes += existingPost.liked ? 1 : -1;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                let min = 1;
                const loadedPosts = action.payload.map(post => ({
                    ...post,
                    id : post.id,
                    date: sub(new Date(), { minutes: min++ }).toISOString(),
                    likes: 0,
                    liked: false
                }));
                console.log(loadedPosts);
                postAdapter.upsertMany(state, loadedPosts);
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addPost.fulfilled, (state, action) => {
                const allPosts = postAdapter.getSelectors().selectAll(state)
                const newId = allPosts.length > 0 ? Math.max(...allPosts.map(post => post.id))+1 : 1
                action.payload.id = newId
                action.payload.userId = Number(action.payload.userId);
                action.payload.date = new Date().toISOString();
                action.payload.likes = 0;
                action.payload.liked = false;
                console.log(action.payload);
                postAdapter.addOne(state, action.payload);
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                action.payload.date = new Date().toISOString();
                postAdapter.upsertOne(state, action.payload);
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                const postId = action.payload;
                postAdapter.removeOne(state, postId);
            });
    }
});

// Export selectors and reducer
export const {
    selectAll: selectAllPosts,
    selectById: getPostById,
    selectIds: selectPostIds
} = postAdapter.getSelectors(state => state.posts);

export const getPostStatus = (state) => state.posts.status;
export const getPostError = (state) => state.posts.error;

export const { addReaction } = postSlice.actions;
export default postSlice.reducer;
