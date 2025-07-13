"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

function CreateNewPasswordPage() {
  const router = useRouter()
  const [disabledButton, setDisabledButton] = React.useState(true)
  const [newPassword, setNewPassword] = React.useState('')
  const [confirmNewPassword, setConfirmNewPassword] = React.useState('')
  const [token, setToken] = useState('')
  const [email, setEmail] = useState('VERIFY')
  const handleClick = async() => {
    try {
      const res = await axios.post('/api/users/createnewpassword', {token, newPassword})
      toast.success(res.data.message)
      router.push('/login')
    } catch (error: any) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const urlToken = searchParams.get("token");
    const emailType = searchParams.get("emailtype");
    setToken(urlToken || "");
    setEmail(emailType!);
  }, [])

  useEffect(() => {
    if(newPassword.length > 0 && confirmNewPassword.length > 0 && confirmNewPassword === newPassword)
      setDisabledButton(false)
    else
      setDisabledButton(true)
  }, [newPassword, confirmNewPassword])
  return (
    <div className="w-full h-screen flex justify-center items-center ">
      <div className="border-1 gap-3 flex justify-center items-center flex-col border-white px-7 py-4 rounded-lg">
        <h1 className="text-2xl mb-3 text-center font-bold">Create New Password</h1>
        <input
          className="p-3 text-sm hover:shadow-sm hover:scale-101 w-full focus:outline-none rounded-md bg-white text-black"
          type="password"
          placeholder="Create New Password"
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          className="p-3 text-sm mb-3 hover:shadow-sm hover:scale-101 w-full focus:outline-none rounded-md bg-white text-black"
          type="password"
          placeholder="Confirm New Password"
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />
        <button
          onClick={handleClick}
          disabled={disabledButton}
          className={`py-2 text-black px-5  ${
            disabledButton
              ? "cursor-not-allowed bg-white/75"
              : "cursor-pointer bg-white active:scale-97 hover:bg-white/90"
          } rounded-md my-2`}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default CreateNewPasswordPage