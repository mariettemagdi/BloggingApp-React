import React, { useEffect, useState } from 'react'
import './App.css'
import HomePage from './Pages/HomePage'
import {Routes, Route, useNavigate } from "react-router";
import NewPost from './Pages/NewPost';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import RegisterPage from './Pages/RegisterPage';
import LoginPage from './Pages/LoginPage';

function App() {
  const [posts,setPosts]=useState([])
  const pageSize=5;
  const [currentPage,setCurrentPage]=useState(1)
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  const[username,setUsername]=useState('');
  const [userId,setUserId]=useState(null);

 const navigate=useNavigate();
 // prevent logging out while refreshing 
 useEffect(()=>{
  fetchPosts();
  initializeAuth();
 },[])

 const initializeAuth=()=>{
  const token=localStorage.getItem('authToken');
  const storedAuth = localStorage.getItem('authData');
  if(storedAuth){
    const { username, userId } = JSON.parse(storedAuth);
    setUsername(username);
    setUserId(userId);
    setIsLoggedIn(true);
    return; 
  }
  else if(token){
    axios.get(`http://localhost:3000/users?token=${token}`)
    .then(res=>{
      if(res.data.length>0){
        setUsername(res.data[0].name);
        setUserId(res.data[0].id);
        setIsLoggedIn(true);
         // Cache the data
         localStorage.setItem('authData', JSON.stringify({
          username: user.name,
          userId: user.id
        }));
      }
    })
  }
 }
  //handle log In to didplay username
  const handleLogin=(name,token,userId)=>{
    localStorage.setItem('authToken',token);
    localStorage.setItem('authData', JSON.stringify({
      username: name,
      userId: userId
    }));
    setIsLoggedIn(true);
    setUserId(userId);
    console.log("app.jsx",userId)
    setUsername(name);
    toast.success(`Welcome Back, ${name}`);
  }

  //logout
  const handleLogout=()=>{
    localStorage.removeItem('authToken');
    localStorage.removeItem('authData');
    toast.success('Logged out Successfully');
    setIsLoggedIn(false)
    setUserId(null)
    setUsername('')
    navigate('/login');

  };

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
    // toast("New Post Added");
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
    }  
    setPosts(newPosts)
  }

  // edit post
  const handleEditPost=(updatedPost)=>{
   setPosts(posts.map(post=>post.id === updatedPost.id ? updatedPost:post)); 
  }

  return (
    <>
    <ToastContainer/>
     <Routes>
        <Route path="/" element={<HomePage
           posts={slicedposts} 
           noOfPages={noOfPages} 
           currentPage={currentPage} 
           handleCurrentPage={handleCurrentPage} 
           handleDeletePost={handleDeletePost}
           isLoggedIn={isLoggedIn}
           username={username}
           onLogout={handleLogout}
           userId={userId} />}/>
        <Route path="/newPost" element={<NewPost handleNewPost={handleNewPost} currentUserId={userId} handleEditPost={handleEditPost} isLoggedIn={isLoggedIn} username={username}
         onLogout={handleLogout}/>}/>
        <Route path="/register" element={<RegisterPage />}/>
        <Route path="/login" element={<LoginPage onLogin={handleLogin}/>}/>
     </Routes>
    </>
  )
}

export default App
