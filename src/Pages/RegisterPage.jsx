import React from 'react'
import RegisterForm from '../Components/RegisterForm'
import LogoSide from '../Components/LogoSide'

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen">
        <div className='w-1/2 bg-base-200 p-8'>
          <RegisterForm />
        </div>
        <LogoSide />
    </div>
  )
}
