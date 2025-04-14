import React from 'react'

export default function PostButton() {
  return (
    <div className='fixed bottom-0 right-20 z-50 items-center'>
        <button className='btn p-5 bg-[#2da2b7] hover:bg-[#2AAFE8] text-white'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <span className="ml-2">New Post</span>
        </button>
 

    </div>
  )
}
