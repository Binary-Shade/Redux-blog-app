import React, { useEffect } from 'react'
import { AllUsers, fetchUsers, getUserError, getUserStatus } from '../../slices/userSlice'
import { useDispatch, useSelector } from 'react-redux'

const Author = ({userId}) => {
    const users = useSelector(AllUsers)
    const userStatus = useSelector(getUserStatus)
    const userError = useSelector(getUserError)
    
    const dispatch = useDispatch()
    useEffect(()=>{
      if(userStatus === 'idle'){
        dispatch(fetchUsers())
      }
    },[userStatus, dispatch])
    const author = users.find(user=>{
        return user.id == userId
    })
    
    
  return (
    <div>
        <h2 className="capitalize text-white mt-5 text-sm">quoted by <span className='text-green-500'>{author ? author.name : userError}</span></h2>
    </div>
  )
}

export default Author