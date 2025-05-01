import React, { useEffect ,useState} from 'react'
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Post({data,handleDeletePost,currentUsername,currentUserId}) {
  const [authorName,setAuthorName]=useState('');
  const navigate=useNavigate();
  const isAuthor = currentUserId && currentUserId === data.userId;
  useEffect(()=>{
    const fetchAuthorName=async()=>{
      try{
        const response=await fetch(`http://localhost:3000/users?id=${data.userId}`);
        const users= await response.json();
        console.log(users[0]); //undefined why ???
        if(users.length>0){
          setAuthorName(users[0].name)
        }else{
          setAuthorName('Unkonown Author')
        }
      }catch(error){
        console.error('Error fetching author:', error);

      }
    }
    fetchAuthorName();
  },[data.userId]);
  return (
    <>
      <div className="container mx-auto px-4 py-3 max-w-7xl">
        <div className="card bg-base-100 shadow-xl mb-4">
          <div className="card-body p-6">
                <h1 className="card-title text-3xl font-bold mb-4 text-[#2DA2B7]">{data.title}</h1>
           <div className='flex items-start gap-6'>
            <div className='flex-1'>
            <p className="mb-4 text-gray-700 leading-relaxed">
              {data.body}
            </p>
            </div>
           { data.imgURL && <div className="w-1/3 flex-shrink-0"> 
              <img src={data.imgURL} alt="img"/>
            </div>}
           </div> 
            <div className="flex justify-between flex-wrap gap-4 text-sm text-gray-500 leading-tight mt-4">
            <div className="flex items-center gap-4"> 
              <div className="avatar">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              </div>
              <div className="flex flex-col items-left gap-1">
                <span className="font-semibold text-[#b9b9b9]">Author:</span>
                <span className='font-bold text-[#686868 ]'>{authorName}</span>
              </div>
            </div>
            {isAuthor && (
              <div className="flex items-center gap-2">
              <button className="btn p-5 bg-[#2da2b7] hover:bg-[#2AAFE8] text-white" onClick={()=>navigate('/newPost',{state:{postToEdit:data}})}><span className="font-semibold">Edit</span></button>
              <button className="btn btn-error text-white"> <span className="font-semibold" onClick={()=>handleDeletePost(data.id)}>Delete</span></button>               
              </div>
             )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
