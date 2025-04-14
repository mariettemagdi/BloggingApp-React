import React from 'react'
import NavBar from '../Components/NavBar'
import Post from '../Components/Post'
import Pagination from '../Components/Pagination'
import PostButton from '../Components/PostButton'

export default function HomePage() {
  return (
    <>
      <NavBar/>
    <div className='max-w-5xl mx-auto mt-7 px-4'>
      <PostButton/>
    <h1 className='text-[#806A50] text-3xl font-bold mb-4'>Posts</h1>
    <div className="bg-gray-50 min-h-screen p-6">
         <Post/>
         <Post/>
         <Post/>
         <Post/>
      </div>
      <div className='flex align-center justify-center m-5'>
        <Pagination/>
      </div>
    </div>
    </>
  
  )
}
