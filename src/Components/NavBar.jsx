import React from 'react'
import { Link } from "react-router";


export default function NavBar({isLoggedIn,username,onLogout}) {
  return (
    <>
   <div className="navbar bg-base-100 shadow-sm">
    <div className="flex-1">
      <Link to="/" className="btn btn-ghost text-xl font-bold"><span className='text-[#806A50]'>Writers</span><span className="text-[#2DA2B7]">Hub</span></Link>
    </div>
    <div className="flex-none mr-6">
      <ul className="menu menu-horizontal px-1">
        {isLoggedIn?(
        <> 
        <li>
        <span className="text-[#806A50] font-semibold">Welcome, {username}</span>
        </li>
        <li>
        <button 
          onClick={onLogout}
          className="text-[#2DA2B7] font-semibold"
        >
          Logout
        </button>
        </li>
        </>):(
        <li><Link to='/login' className='text-[#2DA2B7] font-semibold'>Login</Link></li>
        )}
      </ul>
    </div>
  </div>
    </>
  );
}
