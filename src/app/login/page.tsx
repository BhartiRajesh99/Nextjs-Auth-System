"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [disabledButton, setDisabledButton] = React.useState(true);
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const onLogin = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login Successfull", response.data);
      toast.success("Login success");
      router.push("/profile");
    } catch (error: any) {
      console.log("Error Login", error);
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0)
      setDisabledButton(false);
    else setDisabledButton(true);
  }, [user]);

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center">
        <div className="flex flex-col items-center justify-center gap-3 px-4 py-8 w-[22rem] border-white border-1 bg-transparent rounded-xl">
          <div className="flex justify-center items-center gap-2 mb-2">
            <img src="/log-in.png" className="w-8 h-8 invert" />
            <h1 className="text-3xl text-white font-bold text-center">
              {isLoading ? "Loading..." : "Login Page"}
            </h1>
          </div>

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
              className="p-3 hover:shadow-sm hover:scale-101 border-1 w-full border-white focus:outline-none rounded-md bg-white text-black"
              type="password"
              placeholder="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </label>
          <button
            onClick={onLogin}
            disabled={disabledButton}
            className={`py-2 text-black px-5  ${
              disabledButton
                ? "cursor-not-allowed bg-white/75"
                : "cursor-pointer bg-white active:scale-97 hover:bg-white/90"
            } rounded-md my-2`}
          >
            Login
          </button>
          <div className="flex justify-around py-2 w-full text-sm">
            <Link className=" text-gray-500 rounded-md" href="/signup">
              New User?
              <span className="text-amber-500 hover:underline">Signup</span>
            </Link>
            <Link
              href="/resetpassword"
              className="text-gray-500 hover:underline hover:text-white/80"
            >
              Forgot Paassword?
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
