import { SignIn } from '@clerk/nextjs'
import React from 'react'

const Sign_In = () => {
  return (
    <main className='flex h-screen w-screen items-center justify-center'>
        <SignIn />
    </main>
  )
}

export default Sign_In