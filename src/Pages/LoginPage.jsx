import React from 'react'
import LoginForm from '../Components/LoginForm'
import LogoSide from '../Components/LogoSide'

export default function LoginPage({onLogin}) {
  return (
    <div className="flex min-h-screen">
        <div className='w-1/2 bg-base-200 p-8'>
          <LoginForm onLogin={onLogin} />
        </div>
       <LogoSide />
    </div>
  )
}
