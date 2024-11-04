import React from 'react'
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { addReaction } from '../../slices/postSlice';

const Reactions = ({post}) => {
    const dispatch = useDispatch()
    const handleClick = ()=>{
        dispatch(addReaction({postId : post.id}))
    }
  return (
    <div>
        <button className='absolute right-4 bottom-4 flex items-center justify-center gap-2 text-white' onClick={handleClick}>
        <span>{post.likes}</span>
        {
            !post.liked  ? 
                <FaRegHeart className='text-white'/> :
                <FaHeart className='text-red-600'/>
        }
        </button>
    </div>
  )
}

export default Reactions