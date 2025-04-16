import React from 'react'

export default function Pagination({pages,noOfPages,currentPage,handleCurrentPage}) {
  console.log(pages)
  return (
    <>
   {noOfPages>1 && <div className="join">
    {pages.map(page=> <button key={page} className={`join-item btn btn-lg hover:bg-[#cca97f] ${currentPage===page && "bg-[#2DA2B7]  text-white"} `} onClick={()=>handleCurrentPage(page)}>{page}</button>)}
  </div> }
  </>
  )
}
