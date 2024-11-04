import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { getPostById, updatePost } from '../../slices/postSlice';
import { AllUsers } from '../../slices/userSlice';

const UpdatePost = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const postGet = useSelector((state) => getPostById(state, id));
    const users = useSelector(AllUsers);

    const [title, setTitle] = useState(postGet?.title || '');
    const [content, setContent] = useState(postGet?.body || '');
    const [userId, setUserId] = useState(postGet?.userId || '');

    useEffect(() => {
        if (postGet) {
            setTitle(postGet.title);
            setContent(postGet.body);
            setUserId(postGet.userId);
        }
    }, [postGet]);

    const canSave = [title, content, userId].every(Boolean);

    const update = (e) => {
        e.preventDefault();
        dispatch(updatePost({id, title,body:content, userId, date: new Date().toISOString()}))
        console.log('working');
        navigate('/')
    };

    return (
        <div className='w-96 fixed top-[20%] right-[40%] h-max capitalize text-white p-10 rounded bg-slate-900'>
            <h1 className='font-semibold text-xl'>Update Post</h1>
            <form className='flex flex-col gap-5'>
                <label htmlFor="title">Enter post title</label>
                <input
                    type="text"
                    id='title'
                    placeholder='Enter title'
                    className='p-2 text-black'
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <label htmlFor="content">Enter post content</label>
                <input
                    type="text"
                    id='content'
                    placeholder='Enter content'
                    className='p-2 text-black'
                    value={content}
                    onChange={e => setContent(e.target.value)}
                />
                <label htmlFor="users" className='capitalize'>Author Name</label>
                <select
                    id="users"
                    value={userId}
                    onChange={e => setUserId(e.target.value)}
                    className='text-black p-2'
                >
                    <option value="#" disabled>Select authors below</option>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>{user.name}</option>
                    ))}
                </select>
                <button
                    onClick={update}
                    type="submit"
                    disabled={!canSave}
                    className='p-2 bg-green-600 font-bold rounded-sm'
                >
                    Update Post
                </button>
            </form>
        </div>
    );
};

export default UpdatePost;
