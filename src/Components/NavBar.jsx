import React from 'react'

export default function NavBar() {
  return (
    <>
   <div className="navbar bg-base-100 shadow-sm">
    <div className="flex-1">
      <a className="btn btn-ghost text-xl font-bold"><span className='text-[#806A50]'>Writers</span><span className="text-[#2DA2B7]">Hub</span></a>
    </div>
    <div className="flex-none mr-6">
      <ul className="menu menu-horizontal px-1">
        <li><a className='text-[#2DA2B7] font-semibold'>Login</a></li>
      </ul>
    </div>
  </div>
    </>
  )
}
