import React from 'react'

export default function LogoSide() {
  return (
    <>
     <div className="w-1/2 p-10 m-10 text-black text-left">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
        <span className="text-[#2DA2B7]">Think,</span><br/>
        <span className="text-[#806A50]">Write</span> <span className="text-[#2DA2B7]"> and</span><br/>
        <span className="text-[#2DA2B7]">Innovate</span>
        </h1>
        
        <div className="w-20 h-1 bg-white/70 my-8 "></div>
         <img src="src/assets/img/landing.png" alt="" className='w-3/4 h-auto max-h-[80vh]'/>
    </div>
    </> 
 )
}
