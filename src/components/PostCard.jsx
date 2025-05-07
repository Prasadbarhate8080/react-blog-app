import React,{useEffect} from 'react'
import appWriteService from '../appWrite/config.js'
import { Link } from 'react-router-dom'

function PostCard({
    $id,title,featuredimage,fileId
})
{
  console.log(fileId)
  return (
    <Link to={`/post/${$id}`}>
    <div className='w-full bg-gray-100 rounded-xl p-4 flex flex-col items-center'>
    <div className='w-100 h-40 flex justify-center items-center'>
        <img 
            src={`https://cloud.appwrite.io/v1/storage/buckets/67b821b1000c19002551/files/${fileId}/view?project=67b81dba003710becd69`} 
            alt={title} 
            className='object-contain h-full w-full max-h-full max-w-full' 
        />
    </div>
    <h2 className='text-xl font-bold mt-2 text-center'>{title}</h2>
</div>
    </Link>
  )
}

export default PostCard
