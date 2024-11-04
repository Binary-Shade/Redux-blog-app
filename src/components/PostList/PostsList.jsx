import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  getPostError, getPostStatus, selectPostIds } from '../../slices/postSlice';
import { getUserStatus } from '../../slices/userSlice';
import Post from './Post';

const PostsList = () => {
    const postsIds = useSelector(selectPostIds);
    const postStatus = useSelector(getPostStatus);
    const postError = useSelector(getPostError);
    const userStatus = useSelector(getUserStatus)

    if (postStatus && userStatus === 'loading') {
        return <p>Loading...</p>;
    }

    if (postStatus === 'failed') {
        return <p>Error fetching data: {postError}</p>;
    }

    

    return (
        <div className="flex gap-5 flex-col">
            <h1 className="font-bold text-2xl capitalize">Posts:</h1>
            {postsIds.map((postId) => (
                <Post postId={postId}  key={postId}/>
            ))}
        </div>
    );
};

export default PostsList;
