import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AllSelect, getPostError, getPostStatus, fetchPosts } from '../../slices/postSlice';
import Author from './Author';
import TimeStamp from './TimeStamp';
import Reactions from './Reactions';
import { getUserStatus } from '../../slices/userSlice';

const PostsList = () => {
    const posts = useSelector(AllSelect);
    const postStatus = useSelector(getPostStatus);
    const postError = useSelector(getPostError);
    const dispatch = useDispatch();
    const userStatus = useSelector(getUserStatus)

    useEffect(() => {
        if (postStatus === 'idle') {
            dispatch(fetchPosts());
        }
    }, [postStatus, dispatch]);

    const orderedPosts = posts.slice().reverse();

    if (postStatus && userStatus === 'loading') {
        return <p>Loading...</p>;
    }

    if (postStatus === 'failed') {
        return <p>Error fetching data: {postError}</p>;
    }

    if (postStatus === 'succeeded' && posts.length === 0) {
        return <p>No posts available.</p>;
    }

    return (
        <div className="flex gap-5 flex-col">
            <h1 className="font-bold text-2xl capitalize">Posts:</h1>
            {orderedPosts.map((post) => (
                <div className="w-96 rounded relative shadow-lg h-max bg-gray-700 px-10 py-5" key={post.id}>
                    <h2 className="capitalize text-white font-semibold">{post.title}</h2>
                    <p className="capitalize text-white mt-5">{post.body}</p>
                    <Author userId={post.userId} />
                    <TimeStamp timeStamp={post.date} />
                    <Reactions post={post} />
                </div>
            ))}
        </div>
    );
};

export default PostsList;
