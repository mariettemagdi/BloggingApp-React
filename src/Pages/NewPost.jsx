import React, { useState } from 'react'
import NavBar from '../Components/NavBar'
import { useNavigate } from "react-router";
import axios from 'axios';
export default function NewPost({handleNewPost,posts}) {
  const [title,setTitle]=useState('');
  const [content,setContent]=useState('');
  const [file,setFile]=useState(null);

  const navigate = useNavigate();

  const handleSubmit=async(e)=>{
    e.preventDefault();
    let imageUrl=null;
    // upload image if file is selected
    if(file){
      const formData= new FormData();
      console.log(formData);
      formData.append('image',file);
      try{
         const res=await axios.post('https://api.imgbb.com/1/upload?key=a51a3174748da0660e015c935563ae87',formData);
         console.log(res.data);
         imageUrl=res.data.data.url;
      }
      catch(error){
      console.log(error);
       return;

      }
    }
    const newPost={
        title,
        body:content,
        imgURL:imageUrl ? imageUrl:null,
    };
    handleNewPost(newPost);
    const {data}=await axios.post("http://localhost:3000/posts",newPost);
    navigate('/');    
  }
  return (
    <>
    <NavBar/>
    <div className='flex justify-center  min-h-screen p-8 w-full bg-gray-100'>
      <div className='bg-white rounded border border-amber-50 shadow p-8 w-full max-w-4xl h-fit flex gap-8'>
        <div className='flex flex-col gap-4 w-full'>
        <h2 className="text-2xl font-bold text-gray-700">New Post</h2>
          <input type="text" placeholder='Post Title' className="input input-bordered w-full" value={title} onChange={(e)=>setTitle(e.target.value)}/>
          <textarea    placeholder="Enter Post Content"
            className="textarea textarea-bordered w-full h-40" value={content} onChange={(e)=>setContent(e.target.value)}></textarea>
          <input type="file" className="file-input" onChange={(e)=>setFile(e.target.files[0])}/>         
           <button className="btn  bg-[#2da2b7] hover:bg-[#2AAFE8] text-white w-fit self-end" onClick={(e)=>handleSubmit(e)}>Post</button>
        </div>
      <div className='md:block w-50 h-50'>
        <img src="src/assets/img/pngwing.png" alt="hereee" />
      </div>
    </div>
    </div>
    </>
  )
}
