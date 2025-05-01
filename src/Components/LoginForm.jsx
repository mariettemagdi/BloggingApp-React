import React from 'react'
import FormInput from './FormInput'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { Link } from 'react-router';

export default function LoginForm({onLogin}) {
    const [formData,setFormData]=useState({
        username:'',
        password:'',
    });

    const navigate=useNavigate();

    const handleInputChange=(e)=>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit= async(e)=>{
        e.preventDefault();
        try{
        //find user by username
          const findUser=await fetch(`http://localhost:3000/users?name=${formData.username}`);
          const users=await findUser.json();
        //   console.log(users);
          if(users.length===0){
            toast.error('Username not found');
          }
          const user=users[0];
          //auth with email of user 
          const response=await fetch('http://localhost:3000/login',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email:user.email,
                password:formData.password
            })
          });
          if(!response.ok){
            throw new error('Invalid password');
          }
          const {accessToken}=await response.json();
          onLogin(formData.username,accessToken)
          navigate('/');
        }catch(error){
           toast.error("Can't Login");
           console.log(error)
        }

    }

  return (
    <>
    <div className='bg-[#c3dce0] w-full md:w-2/3 overflow-y-auto p-8 flex flex-col justify-center items-center h-full mx-auto'>
    <div className="max-w-md w-full mx-auto space-y-6">
    <div className="flex justify-center">
    <img src="src\assets\img\pngwing.png" alt="" className="w-28 justify-center"/>
    </div>

    <h1 className="text-3xl font-bold text-center mb-8">Login </h1>
    <form onSubmit={handleSubmit}  className='flex flex-col items-center gap-2'>
            <FormInput
            name="username"
            type="text"
            value={formData.username}
            placeholder="Username"
            pattern="[A-Za-z][A-Za-z0-9\-]*"
            minLength="3"
            maxLength="30" 
            title="Only letters, numbers or dash"
            icon={<circle cx="12" cy="7" r="4" />}
            hint="Must be 3 to 30 characters containing only letters, numbers or dash"   
            onChange={handleInputChange}    
            />
        <FormInput
            name="password"
            type="password"
            value={formData.password}
            placeholder="Password"
            icon={<circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />}
            onChange={handleInputChange}

        />

        <button type="submit" className="btn btn-accent mt-3">Login</button>
        <span className='mt-3  text-xs text-center'>Don't have an account? <Link to="/register" href="#" className="underline underline-offset-2">Sign Up</Link></span>

    </form>
    </div>
    </div>
   </>
  )
}
