import React, { useState } from 'react'
import PostsList from '../components/PostList/PostsList'
import AddPost from '../components/AddPost/AddPost'

const Home = () => {
    const [modalOpen, setModalOpen] = useState(false)
  return (
    <>
        <div className={`container w-full h-vh flex flex-col items-center justify-center mt-10 ${modalOpen ? 'blur-sm' : ''}`}>
            <button className='p-2 bg-green-600 capitalize text-white font-bold rounded-sm' onClick={()=>setModalOpen(!modalOpen)}>add new post</button>
            <PostsList />
        </div>
        {
            modalOpen && <AddPost setModalOpen={setModalOpen}/>
        }
    </>
  )
}

export default Home