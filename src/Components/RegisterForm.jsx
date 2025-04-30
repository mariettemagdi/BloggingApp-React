import React,{ useState } from 'react'
import FormInput from './FormInput'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

export default function RegisterForm() {
 const [formData,setFormData]=useState({
    username:"",
    email:"",
    password:"",
    confirmPassword:"",
 })

 const navigate=useNavigate();

const handleChange=(e)=>{
    const {name,value}=e.target;
    setFormData((prev)=>({
        ...prev,
        [name]:value,
    }))
}
const handleSubmit=async(e)=>{
    e.preventDefault();

    if(formData.password !== formData.confirmPassword){
        return toast.error('Password do not match');
    }
    try{
        const response= await fetch('http://localhost:3000/users',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                username: formData.username,
                email: formData.email,
                password: formData.password,
            }),
        });
        const data=await response.json();
        if(response.ok){
            toast.success('Account Created Successfully');
            navigate('/');

        }
        else{
            toast.error('Registration failed');
        }
    }
    catch(error){
        console.log(error)
        toast.error('Something went wrong try again later')
    }

}
  return (
   <>
    <div className='bg-[#c3dce0] w-full md:w-2/3 overflow-y-auto p-8 flex flex-col justify-center items-center h-full mx-auto'>
    <div className="max-w-md w-full mx-auto space-y-6">
    <div className="flex justify-center">
    <img src="src\assets\img\pngwing.png" alt="" className="w-28 justify-center"/>
    </div>

    <h1 className="text-3xl font-bold text-center mb-8">Create Account</h1>
    <form onSubmit={handleSubmit} className='flex flex-col items-center gap-2'>
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
            onChange={handleChange}    
            />
        <FormInput
            name="email"
            type="email"
            value={formData.email}
            placeholder="mail@site.com"
            icon={<rect width="20" height="16" x="2" y="4" rx="2" />}
            hint="Enter valid email address"
            onChange={handleChange}

        />
        <FormInput
            name="password"
            type="password"
            value={formData.password}
            placeholder="Password"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            minLength="8"
            title="Must include number, lowercase, uppercase"
            icon={<circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />}
            hint={`Must be more than 8 characters\nIncluding number, lowercase, uppercase`}
            onChange={handleChange}

        />
        <FormInput
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            placeholder="Confirm Password"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            minLength="8"
            title="Must include number, lowercase, uppercase"
            icon={<circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />}
            hint={`Must be more than 8 characters\nIncluding number, lowercase, uppercase`}
            onChange={handleChange}

        />
        
        <button type="submit" className="btn btn-accent mt-3">Register</button>
        <span className='mt-3  text-xs text-center'>Already have an accout? <a href="#" className="underline underline-offset-2">Sign In</a></span>

    </form>
    </div>
    </div>
   </>
  )
}
