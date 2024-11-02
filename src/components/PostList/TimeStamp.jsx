import { formatDistanceToNow, parseISO } from 'date-fns'
import React from 'react'

const TimeStamp = ({timeStamp}) => {
    let timeAgo = ''
    if(timeStamp){
        const timeNow = formatDistanceToNow(parseISO(timeStamp))
        timeAgo = `${timeNow} ago`
    }
  return (
    <>
        <span className='text-white text-[10px]'>{timeAgo}</span>
    </>
  )
}

export default TimeStamp