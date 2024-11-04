import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addPost } from '../../slices/postSlice'
import { AllUsers } from '../../slices/userSlice'
import { unwrapResult } from '@reduxjs/toolkit'


const AddPost = ({setModalOpen, heading}) => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [userId, setUserId] = useState('')
    const [saveState, setSaveState] = useState('idle')
    const users = useSelector(AllUsers)
    const dispatch = useDispatch()
    const canSave = [title, content, userId].every(Boolean) && saveState === 'idle'
    const SavePost = (e) =>{
        e.preventDefault()
        if(canSave){
            try {
                setSaveState('pending')
                dispatch(addPost({title, body: content, userId}))
                unwrapResult()
            } catch (error) {
                console.log('post failed to save',error);
            } finally {
                setSaveState('idle')
                setModalOpen(false)
            }
        }
    }
  return (
    <div className='w-96 fixed top-[20%] right-[40%] h-max capitalize text-white p-10 rounded bg-slate-900'>
        <h1 className='font-semibold text-xl'>{heading}</h1>
        <form className='flex flex-col gap-5'>
            <label htmlFor="title">Enter post title</label>
            <input type="text" 
                id='title'
                placeholder='enter title'
                className='p-2 text-black'
                value={title}
                onChange={e=>setTitle(e.target.value)}
            />
            <label htmlFor="content">Enter post content</label>
            <input type="text" 
                id='content'
                placeholder='enter content'
                className='p-2 text-black'
                value={content}
                onChange={e=>setContent(e.target.value)}
            />
            <label htmlFor="users" className='capitalize'>author name</label>
            <select id="users" value={userId} onChange={e=>setUserId(e.target.value)} className='text-black p-2'>
                <option value="#" defaultValue>select authors below</option>
                {
                    users.map((user)=>(
                        <option key={user.id} value={user.id}>{user.name}</option>
                    ))
                }
            </select>
            <button type="button" onClick={SavePost} disabled={!canSave} className='p-2 bg-green-600 font-bold rounded-sm'>Add new post</button>
        </form>
    </div>
  )
}

export default AddPost