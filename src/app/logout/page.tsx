"use client"

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react'
import toast from 'react-hot-toast';

export default function Logout() {
  const router = useRouter()
  const handleClick = async () => {
    try {
      const res = await axios.get('/api/users/logout')
      toast.success("logout successful")
      router.push("/login")
    } catch (error: any) {
      toast.error(error.message)

    }
  }

  return (
    <>
      <nav className="z-[999] absolute right-10 top-0 bg-transparent w-full flex justify-end">
        <button onClick={handleClick} className='bg-transparent border-1 border-white mr-4 hover:bg-white hover:text-black active:scale-95 px-5 py-2 rounded-lg cursor-pointer mt-6  ' >Logout</button>
      </nav>
    </>
  );
}