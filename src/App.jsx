import React, { useEffect, useState } from 'react'
import './App.css'
import HomePage from './Pages/HomePage'
import {Routes, Route } from "react-router";
import NewPost from './Pages/NewPost';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

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

  //add new Post 
  const handleNewPost=(post)=>{

    const newPosts=[...posts,post];
    toast("New Post Added");
    setPosts(newPosts);
  }

  //delete post 
  const handleDeletePost=async(id)=>{
    //clone
    console.log(typeof(id));
    const newPosts=posts.filter((post)=>(post.id!=id))
    //edit
    //setState
    toast("Post Deleted Successfully");
    const newTotalPages=Math.ceil(newPosts.length/pageSize)
    if(currentPage>newTotalPages && newTotalPages > 0){
      setCurrentPage(newTotalPages);
    }
    try {
      const res = await axios.delete(`http://localhost:3000/posts/${id}`);
      console.log("Post deleted successfully:", res);
    } catch (error) {
      console.log("Error deleting post:", error);
    }    // const res=await axios.delete(`http://localhost:3000/posts/${id}`);
    // console.log(res);
    setPosts(newPosts)


  }
  return (
    <>
    <ToastContainer/>
     <Routes>
        <Route path="/" element={<HomePage posts={slicedposts} noOfPages={noOfPages} currentPage={currentPage} handleCurrentPage={handleCurrentPage} handleDeletePost={handleDeletePost} />}/>
        <Route path="/newPost" element={<NewPost handleNewPost={handleNewPost} posts={posts}/>}/>
     </Routes>
    </>
  )
}

export default App
