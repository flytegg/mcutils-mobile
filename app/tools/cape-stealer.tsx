import { Input } from '@/components/Input'
import React from 'react'

export default function capestealer() {
  return (
    <>
      <h1 className='text-center font-semibold text-3xl uppercase flex justify-center align-center flex-col p-14'>Cape Stealer</h1>
      <div className='flex justify-center'>
        <div className='w-96'>
          <Input className='w-1/3' placeholder='Enter a username' />
        </div>
      </div>
    </>
  )
}