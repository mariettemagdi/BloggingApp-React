import React, { useEffect, useState } from 'react'
import './App.css'
import HomePage from './Pages/HomePage'
import {Routes, Route } from "react-router";
import NewPost from './Pages/NewPost';


function App() {
  const [posts,setPosts]=useState([])
  const pageSize=5;
  const [currentPage,setCurrentPage]=useState(1)


  //fetch data 
  const fetchPosts=async()=>{
    try{
      const response= await fetch("http://localhost:3000/posts")
      const data= await response.json()
      setPosts(data)

    }catch{
      console.log("Error in fetching data")
    }
  }
  useEffect(()=>{
      fetchPosts();
  },[])

  //pagination
  const noOfPages=Math.ceil(posts.length/pageSize)
  const start=(currentPage - 1)*pageSize
  const end = start+pageSize
  const slicedposts=posts.slice(start,end)

  const handleCurrentPage=(page)=>{
    setCurrentPage(page)
  }

  //delete post 
  const handleDeletePost=(id)=>{
    //clone
    const newPosts=posts.filter((post)=>(post.id!=id))
    //edit
    //setState
    setPosts(newPosts)

  }
  return (
    <>
     <Routes>
        <Route path="/" element={<HomePage posts={slicedposts} noOfPages={noOfPages} currentPage={currentPage} handleCurrentPage={handleCurrentPage} handleDeletePost={handleDeletePost}/>}/>
        <Route path="/newPost" element={<NewPost/>}/>
     </Routes>
    </>
  )
}

export default App
