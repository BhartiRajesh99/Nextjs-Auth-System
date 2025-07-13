"use client"

import axios from "axios"
import React, { useEffect } from "react"
import Link from "next/link"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

export default function VerifyEmailPage(){
    const [token, setToken] = React.useState("")
    const [email, setEmail] = React.useState("VERIFY")
    const [verified, setVerified] = React.useState(false)
    const [error, setError] = React.useState(false)

    const router = useRouter()

    const verifyUserEmail = async() => {
        try {
            await axios.post('/api/users/verifyemail', {token, email})
            setVerified(true)
            toast.success("Token Generated")
            await new Promise(r => setTimeout(r, 2000))
            toast.success("Email Verified Successfully")
        } catch (error: any) {
            setError(true)
            toast.error("Error in Email Verification")
            console.log(error.response.data)
        }
    }

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search)
        const urlToken = searchParams.get('token')
        const emailType = searchParams.get('emailtype')
        setToken(urlToken || "")
        setEmail(emailType!)
    }, [])

    useEffect(() => {
        if(token.length > 0)
            verifyUserEmail()
    }, [token])

    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl">Verify Email</h1>

        {verified && (
          <div className="flex flex-col justify-center gap-2 items-center">
            <h2 className="rounded-md font-semibold text-center bg-teal-500 text-black px-10 py-2 my-2">
              Email Verified Successfully
            </h2>
            <Link
              className="px-5 py-2 rounded-md bg-violet-500"
              href={email === "VERIFY" ? "/login" :  `/createnewpassword?token=${token}&emailtype=${email}`}
            >
              {email === "VERIFY" ? "Login" : "Reset Password"}
            </Link>
          </div>
        )}
        {error && (
          <div>
            <h2 className="text-2xl rounded-md text-white bg-red-500 my-2 p-2">
              Error
            </h2>
          </div>
        )}
      </div>
    );
}
