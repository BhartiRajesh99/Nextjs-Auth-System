"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

function SignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [disabledButton, setDisabledButton] = React.useState(true);
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const onSignup = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup Successfull", response.data);
      toast.success("Signup Successfull");
      await new Promise(r => setTimeout(r, 2000))
      toast.success('verify email sent')
      await new Promise(r => setTimeout(r, 3000))
      router.push("/verifyemail");
    } catch (error: any) {
      console.log("Signup failed", error);
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    )
      setDisabledButton(false);
    else setDisabledButton(true);
  }, [user]);

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center">
        <div className="flex flex-col items-center justify-center gap-3 px-4 py-8 w-[22rem] border-white border-1 bg-transparent rounded-lg">
          <div className="flex justify-center items-center gap-2 mb-2">
            <img src="/document.png" className="w-8 h-8 invert" />
            <h1 className="text-3xl mb-2 text-white font-bold text-center">
              {isLoading ? "Loading..." : "Signup Page"}
            </h1>
          </div>
          <label className="w-72">
            <input
              className="p-3 hover:shadow-sm hover:scale-101 w-full focus:outline-none rounded-md bg-white text-black"
              type="text"
              placeholder="username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
          </label>
          <label className="w-72">
            <input
              className="p-3 hover:shadow-sm hover:scale-101 w-full focus:outline-none rounded-md bg-white text-black"
              type="email"
              placeholder="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </label>
          <label className="w-72">
            <input
              className="p-3 hover:shadow-sm hover:scale-101 w-full focus:outline-none rounded-md bg-white text-black"
              type="password"
              placeholder="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </label>
          <button
            disabled={disabledButton}
            onClick={onSignup}
            className={`py-2 text-black px-5  ${
              disabledButton
                ? "cursor-not-allowed bg-white/75"
                : "cursor-pointer bg-white active:scale-97 hover:bg-white/90"
            } rounded-md my-2`}
          >
            Signup
          </button>
          <Link className="text-sm text-gray-500 rounded-md" href="/login">
            Already a user?
            <span className=" text-amber-500 hover:underline">Signin</span>
          </Link>
        </div>
      </div>
    </>
  );
}

export default SignupPage;
