import React,{useEffect} from 'react'
import appWriteService from '../appWrite/config.js'
import { Link } from 'react-router-dom'
import "./PostCard.css"

function PostCard({
    $id,title,featuredimage,fileId,description
})
{
  console.log(fileId)
  return (
    <Link to={`/post/${$id}`}>
      <div className="post-card" >
        <div className='h-[280px] w-[294px] image-div'>
          <img src={`https://cloud.appwrite.io/v1/storage/buckets/67b821b1000c19002551/files/${fileId}/view?project=67b81dba003710becd69`}
            alt={title}/>
        </div>
        <div className="date-div">post date</div>
        <div className="post-heading">{title}</div>
        <div className="post-description">{description}</div>
      </div>
    </Link>
  )
}

export default PostCard
