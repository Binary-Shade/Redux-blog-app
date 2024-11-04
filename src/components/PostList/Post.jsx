import React from 'react';
import Author from './Author';
import TimeStamp from './TimeStamp';
import Reactions from './Reactions';
import { FaPencil, FaTrash } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, getPostById } from '../../slices/postSlice';

let Post = ({ postId }) => {
    const post = useSelector(state => getPostById(state, postId));
    const dispatch = useDispatch();

    const handleDelete = () => {
        console.log('trigger');
        if (post) {
            dispatch(deletePost(postId));
        }
    };

    // Check if the post exists to avoid errors
    if (!post) return <p>Loading...</p>;

    return (
        <div className="w-[400px] rounded relative shadow-lg h-max bg-gray-700 px-10 py-5">
            <h2 className="capitalize text-white font-semibold">{post.title}</h2>
            <Link to={`/update/${post.id}`}>
                <FaPencil className='text-blue-500 absolute right-5 top-6' />
            </Link>
            <button onClick={handleDelete}>
                <FaTrash className='text-red-500 absolute right-5 top-16' />
            </button>
            <p className="capitalize text-white mt-5">{post.body}</p>
            <Author userId={post.userId} />
            <TimeStamp timeStamp={post.date} />
            <Reactions post={post} />
        </div>
    );
};

Post = React.memo(Post);

export default Post;
