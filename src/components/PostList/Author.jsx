import React, { useEffect } from 'react'
import { AllUsers, getUserError } from '../../slices/userSlice'
import { useSelector } from 'react-redux'

const Author = ({userId}) => {
    const users = useSelector(AllUsers)
    const userError = useSelector(getUserError)
        
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

// 4:22:41