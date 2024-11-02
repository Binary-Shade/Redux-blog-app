import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";

const URL = 'https://jsonplaceholder.typicode.com/posts'

export const fetchPosts = createAsyncThunk('/posts/fetchPosts', async()=>{
    const response = await axios.get(URL)
    return response.data
})

const initState = {
    posts: [],
    status: 'idle',
    error: null
}
const postSlice = createSlice({
    name: 'posts',
    initialState: initState,
    reducers: {
        postAdd :{
            reducer: (state, action)=>{
                state.posts.push(action.payload)
            },
            prepare(title, content, userId){
                return{
                    payload: {
                        id: nanoid(),
                        title,
                        body: content,
                        date: new Date().toISOString(),
                        userId,
                        likes:0,
                        liked:false
                    }
                }
            }
        },AddReaction(state,action){
            const {postId} = action.payload
            const exist = state.posts.find(post => post.id == postId)
            if(exist){
                exist.liked = !exist.liked
                exist.likes += exist.liked ? 1 : -1
            }
        }
    },
    extraReducers(builder){
        builder.addCase(fetchPosts.fulfilled, (state, action)=>{
            state.status = 'succeded'
            let min =1
            const loadedPosts = action.payload.map(post => {
                post.id = nanoid(),
                post.date = sub(new Date(), {minutes: min++}).toISOString(),
                post.likes = 0,
                post.liked = false
                return post
            }
        )
        state.posts = state.posts.concat(loadedPosts)
        }).addCase(fetchPosts.pending, (state, action)=>{
            state.status = 'loading'
        }).addCase(fetchPosts.rejected, (state, action)=>{
            state.status = 'failed'
            state.error = action.payload.message
        })
    }
})
export const AllSelect = (state) => (state.posts.posts)
export const getPostStatus = (state) => (state.posts.status)
export const getPostError = (state) => (state.posts.error)
export const {postAdd, AddReaction} = postSlice.actions
export default postSlice.reducer