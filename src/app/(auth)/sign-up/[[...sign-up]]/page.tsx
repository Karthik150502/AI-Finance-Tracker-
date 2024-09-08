import React from 'react'
import { SignUp } from '@clerk/nextjs'
export default function page() {
  return (
    <div className='h-screen w-screen flex flex-row items-center justify-center overflow-y-scroll '>
      <SignUp />
    </div>
  )
}
