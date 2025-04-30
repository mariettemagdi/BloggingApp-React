import React from 'react'
import RegisterForm from '../Components/RegisterForm'

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen">
        <div className='w-1/2 bg-base-200 p-8'>
          <RegisterForm />
        </div>
        <div className="w-1/2 bg-base-300 p-8">
        <h2 className="text-2xl font-bold mb-4">Write,Think, Innovate   </h2>
        <p>Your content goes here...</p>
      </div>
    </div>
  )
}
