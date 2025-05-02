import React, { useEffect, useState } from 'react'
import NavBar from '../Components/NavBar'
import { useNavigate , useLocation } from "react-router";
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function NewPost({handleNewPost,currentUserId,handleEditPost,isLoggedIn,username,onLogout}) {
  const [file,setFile]=useState(null);
  const [buttonText,setButtonText]=useState("Post")
  const [form,setForm]=useState({
    title:'',
    body:'',
    imgURL: null,
    id:null,
    userId:currentUserId
  })

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(()=>{
    if(location.state && location.state.postToEdit){
         setForm({...location.state.postToEdit,userId:currentUserId})
         setButtonText("Edit")
    }
  },[location.state])

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      let imageUrl=form.imgURL;
      // upload image if file is selected
      if(file){
        const formData= new FormData();
        // console.log(formData);
        formData.append('image',file);
        const res=await axios.post('https://api.imgbb.com/1/upload?key=a51a3174748da0660e015c935563ae87',formData);
        //console.log(res.data);
        imageUrl=res.data.data.url; 
    }
      const postData={
        ...form,
        imgURL:imageUrl,
        userId:currentUserId
      };
      //edit
    if(form.id){
      const { data } = await axios.put(`http://localhost:3000/posts/${form.id}`,postData);
      handleEditPost(data);
      toast.success("Post Updated Successfully !"); 
    }
  else{
    //create
    const {data}=await axios.post("http://localhost:3000/posts",postData);
    handleNewPost(data);
    toast.success("Post Published Successfully");
  }
  navigate('/');   
  }catch (error) {
    console.error("Operation failed:", error);
    toast.error("Failed to save post");
  }
}
   
  return (
    <>
    <NavBar  
        isLoggedIn={isLoggedIn} 
        username={username} 
        onLogout={onLogout}/>
    <div className='flex justify-center  min-h-screen p-8 w-full bg-gray-100'>
      <div className='bg-white rounded border border-amber-50 shadow p-8 w-full max-w-4xl h-fit flex gap-8'>
        <div className='flex flex-col gap-4 w-full'>
        <h2 className="text-2xl font-bold text-gray-700">New Post</h2>
          <input type="text" name="title" placeholder='Post Title' className="input input-bordered w-full" value={form.title} onChange={handleChange}/>
          <textarea name="body" placeholder="Enter Post Content"
            className="textarea textarea-bordered w-full h-40" value={form.body} onChange={handleChange}></textarea>
          {form.imgURL && !file && (
            <div className='current-image'>
              <p>Current Image</p>
              <img src={form.imgURL} className='max-h-40'/>
            </div>
          )}      
          <input type="file" className="file-input" onChange={(e)=>setFile(e.target.files[0])}/>   
           <button className="btn  bg-[#2da2b7] hover:bg-[#2AAFE8] text-white w-fit self-end" onClick={(e)=>handleSubmit(e)}>{buttonText}</button>
        </div>
      <div className='md:block w-50 h-50'>
        <img src="src/assets/img/pngwing.png" alt="hereee" />
      </div>
    </div>
    </div>
    </>
  )
}

