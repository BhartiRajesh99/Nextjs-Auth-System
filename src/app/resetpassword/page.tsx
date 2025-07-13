"use client"
import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function ResetPasswordPage() {
  const router = useRouter()
  const [disabledButton, setDisabledButton] = React.useState(true);
  const [email, setEmail] = React.useState('');

  const handleClick = async() => {
    try {
      const res = await axios.post('/api/users/resetpassword', {email})
      console.log(res);
      if(res.data.success){
        toast.success("Email Sent")
        router.push('/verifyemail')
      }
    } catch (error: any) {
      console.log(error);
      toast.error("Email not Registered")
    }
  }

  React.useEffect(() => {
      if (email.length > 0)
        setDisabledButton(false);
      else setDisabledButton(true);
    }, [email]);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col items-center gap-2 px-4 py-8 w-[22rem] border-white border-1 bg-transparent rounded-xl">
        <h1 className="text-white mb-2 text-center text-2xl font-bold">
          Reset Password
        </h1>
        <p className="text-start w-72">Enter registered email:</p>
        <label className="w-72">
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            className="p-3 hover:shadow-sm hover:scale-101 w-full focus:outline-none rounded-md bg-white text-black"
          />
        </label>
        <p className="text-center mb-2 text-xs text-red-500">
          ⚠The forgot password link will send on entered email
        </p>
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

export default ResetPasswordPage;
